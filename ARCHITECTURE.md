# Arquitectura del Sistema FormaSalud

Este documento describe la arquitectura global, los componentes y el flujo de datos del ecosistema **FormaSalud** (Frontend Next.js, Backend NestJS y Base de Datos PostgreSQL).

---

## 1. Visión General de la Arquitectura

El sistema está estructurado bajo una arquitectura desacoplada en tres capas principales:

```
┌────────────────────────────────────────────────────────────────────────┐
│                        FRONTEND (Next.js 16)                          │
│                        Puerto: 3000                                    │
│                                                                        │
│   Web Pública (Landing)    │   Aula Virtual Alumno   │   Panel Admin  │
│   (/, /contacto, /cursos)  │   (/aula, /catalogo)    │   (/admin/*)   │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / JSON (lib/api.ts)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                        BACKEND (NestJS 11)                             │
│                        Puerto: 4000                                    │
│                                                                        │
│   Controladores REST:                                                  │
│   ├── /user          ──> UserService                                   │
│   ├── /course        ──> CourseService                                 │
│   ├── /certificate   ──> CertificateService                            │
│   └── /execute       ──> ExecuteService                                │
│                                │                                       │
│                         ExecuteService                                 │
│                                │                                       │
│                         DatabaseService (pg.Pool)                      │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ SELECT public.fnc_execute(...)
                                    ▼
┌────────────────────────────────────────────────────────────────────────┐
│                     BASE DE DATOS (PostgreSQL 18)                      │
│                     Puerto: 5432 (DB: FormaSalud)                      │
│                                                                        │
│                      public.fnc_execute (Router)                       │
│                        │          │          │                         │
│             ┌──────────┘          │          └──────────┐              │
│             ▼                     ▼                     ▼              │
│         fnc_users            fnc_courses        fnc_certificates       │
│             │                     │                     │              │
│     users, user_roles          courses         enrollments, payments,  │
│                                                    certificates        │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. El Patrón "Database Gateway" (PL/pgSQL)

A diferencia de proyectos tradicionales que usan ORMs (TypeORM/Prisma), este sistema centraliza las reglas de negocio y transacciones directamente en el motor **PostgreSQL** mediante funciones PL/pgSQL que reciben y retornan `jsonb`:

### A. Función Despachadora: `fnc_execute`
* Actúa como el router central de la base de datos:
  ```sql
  SELECT public.fnc_execute(p_function, p_action, p_data, p_context);
  ```
* Valida el nombre de la función (`fnc_users`, `fnc_courses`, `fnc_certificates`).
* Si se solicita una función no autorizada, rechaza la transacción con excepción segura.

### B. Funciones de Negocio:
1. **`fnc_users`:**
   * `'i'` (Insertar): Crea usuarios, encripta contraseñas con bcrypt (`crypt()`) y asigna rol en `user_roles` (por defecto `student`).
   * `'u'` (Actualizar): Actualiza datos personales y de contacto.
   * `'d'` (Baja lógica): Pasa el estado a `inactive`.
   * `'s'` / `'s1'`: Listar y buscar usuarios incluyendo sus roles asociados.
   * `'sc'`: Combo para desplegables (`value: user_id, label: Nombre (DNI)`).

2. **`fnc_courses`:**
   * `'i'` (Insertar): Registra el curso, slug y regla de certificado (incluido o precio adicional).
   * `'s'` / `'s1'` / `'sc'`: Listado, ficha y combo para selects.

3. **`fnc_certificates`:**
   * `'generate'` / `'i'`: Genera la matrícula en `enrollments`, evalúa la regla de pago del curso/certificado, auto-registra el pago en `payments` (en modo rápido) y emite el diploma en `certificates` con código único **`FS-2026-XXXX`**.
   * `'check_eligibility'`: Verifica si el alumno tiene derecho a descargar el certificado o qué pago le falta.
   * `'verify'`: Endpoint público que valida si un código QR o diploma es legítimo.

---

## 3. Backend NestJS (`fms-backend`)

Ubicación: `C:\Users\User\Desktop\nuevo-formasalud\fms-backend`  
Puerto: **`4000`**

### Capas del Backend:
* **`DatabaseService` (`src/database/`):**
  Maneja el pool de conexiones nativo a PostgreSQL con la librería `pg`.
* **`ExecuteService` (`src/execute/`):**
  Servicio intermediario tipado. Mapea claves (`users`, `courses`, `certificates`) a sus funciones SQL correspondientes y ejecuta `fnc_execute`.
* **Módulos de Entidad:**
  * `UserModule` (`src/user/`): Expone `POST /user`, `GET /user`, `GET /user/combo`, etc.
  * `CourseModule` (`src/course/`): Expone `POST /course`, `GET /course`, `GET /course/:idOrSlug`.
  * `CertificateModule` (`src/certificate/`): Expone `POST /certificate/generate`, `GET /certificate/verify/:code`, `GET /certificate/eligibility/:studentId/:courseId`.
  * `ExecuteModule` (`src/execute/`): Expone `POST /execute` como pasarela genérica.

---

## 4. Frontend Next.js (`formasalud-web`)

Ubicación: `C:\Users\User\Desktop\nuevo-formasalud\formasalud-web`  
Puerto: **`3000`**

### Tecnologías:
* **Next.js 16 (App Router + Turbopack):** Estructura modular basada en carpetas y layout anidados.
* **Zustand (`src/features/auth/store/useAuthStore.ts`):** Estado global persistente con `localStorage` para almacenar la sesión, datos del usuario y rol (`admin` o `student`).
* **TanStack Table v8 (`src/components/ui/table/DataTable.tsx`):** Componente genérico y escalable con búsqueda en tiempo real, ordenamiento por columnas y paginación.
* **React Hook Form + Zod:** Validación estricta y reactiva en todos los formularios modales y páginas de acceso.

### Estructura de Rutas:
1. **Web Pública:**
   * `/` : Landing page oficial con presentación de diplomados y cuerpo docente.
   * `/contacto` : Formulario de contacto y canales de atención.
   * `/quienes-somos` : Ficha institucional de Grupo Paucar Perú S.A.C.
2. **Autenticación:**
   * `/login` : Vista unificada para Iniciar Sesión o Crear Cuenta Alumno, con botones rápidos de demo.
3. **Panel Administrativo (`/admin`):**
   * `/admin` : Dashboard con métricas clave (KPIs de alumnos, cursos y certificados).
   * `/admin/usuarios` : Tabla interactiva de alumnos con modal de registro.
   * `/admin/cursos` : Catálogo de programas académicos y creador de cursos.
   * `/admin/certificados` : Tabla de diplomas emitidos con enlace de verificación QR.
4. **Aula Virtual del Alumno (`/aula`):**
   * `/aula` : Dashboard personal con cursos matriculados y acceso a diplomas.
   * `/aula/catalogo` : Catálogo disponible con botón de inscripción inmediata.
   * `/aula/mis-certificados` : Visualizador de certificados emitidos y comprobación QR.

---

## 5. Regla de Negocio: Cursos y Certificados

El sistema contempla dos modalidades de negocio:

| Modalidad | Campo `certificate_included` | Comportamiento de Pago |
|---|:---:|---|
| **Certificado Incluido** | `true` | El diploma se emite una vez pagado el curso (o si el curso cuesta S/ 0). |
| **Certificado Separado** | `false` | El curso puede ser gratis o pagado, pero el alumno debe pagar el `certificate_price` (ej. S/ 49.00) para desbloquear su diploma. |

* **Modo Rápido Actual:** Para facilitar pruebas y emisión inmediata sin trabas, el endpoint de generación auto-registra el pago en la tabla `payments` y genera el diploma activo de inmediato.

---

## 6. Configuración de Entorno y Puertos

| Servicio | Puerto | Variable de Entorno |
|---|:---:|---|
| **PostgreSQL** | `5432` | `DB_PORT=5432`, `DB_NAME=FormaSalud` |
| **Backend NestJS** | `4000` | `PORT=4000` en `fms-backend/.env` |
| **Frontend Next.js** | `3000` | `NEXT_PUBLIC_API_URL=http://localhost:4000` en `formasalud-web/.env.local` |

---

## 7. Comandos de Arranque

```bash
# 1. Iniciar Backend
cd c:\Users\User\Desktop\nuevo-formasalud\fms-backend
npm run start:dev

# 2. Iniciar Frontend
cd c:\Users\User\Desktop\nuevo-formasalud\formasalud-web
npm run dev
```
