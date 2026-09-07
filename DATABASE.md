# FormaSalud — Base de Datos PostgreSQL

**Motor:** PostgreSQL 18  
**Base de datos:** `FormaSalud`  
**Schema:** `public`  
**Tablas:** 12  
**Actualizado:** 2026-09-02

---

## Índice

1. [Diagrama ERD](#diagrama-erd)
2. [ENUMs](#enums)
3. [Tablas](#tablas)
4. [Claves Foráneas](#claves-foráneas)
5. [Índices](#índices)
6. [Mejoras pendientes](#mejoras-pendientes)

---

## Diagrama ERD

```
users ──────────────────────────────────────────────────────────────
  │
  ├──< user_roles >── roles
  │
  ├──── teacher_profiles (1:1)
  │
  └──< course_teachers >── courses ──< course_resources
                              │
                              ├──< course_certificate_config ──── certificate_templates
                              │
                              └──< enrollments ──< payments
                                       │
                                       └──< certificates
                                              (via course_certificate_config)
```

---

## ENUMs

### `user_status`
| Valor | Descripción |
|---|---|
| `active` | Usuario activo (default) |
| `inactive` | Cuenta desactivada |
| `suspended` | Cuenta suspendida por administrador |

### `document_type`
| Valor | Descripción |
|---|---|
| `dni` | Documento Nacional de Identidad (Perú) |
| `ce` | Carnet de Extranjería |
| `passport` | Pasaporte |
| `other` | Otro documento |

### `course_status`
| Valor | Descripción |
|---|---|
| `draft` | Borrador, no visible (default) |
| `published` | Publicado y visible |
| `archived` | Archivado, sin acceso |

### `enrollment_status`
| Valor | Descripción |
|---|---|
| `pending` | Pago pendiente (default) |
| `active` | Matrícula activa con acceso |
| `completed` | Curso finalizado |
| `cancelled` | Matrícula cancelada |

### `certificate_status_enum`
| Valor | Descripción |
|---|---|
| `not_applicable` | El curso no emite certificado (default) |
| `not_purchased` | Certificado disponible pero no comprado |
| `included` | Certificado incluido en el precio |
| `purchased` | Certificado comprado por separado |
| `issued` | Certificado ya emitido |

### `certificate_type_enum`
| Valor | Descripción |
|---|---|
| `participation` | Certificado de participación |
| `approval` | Certificado de aprobación |

### `issued_certificate_status`
| Valor | Descripción |
|---|---|
| `active` | Certificado vigente (default) |
| `revoked` | Certificado revocado |

### `payment_status`
| Valor | Descripción |
|---|---|
| `pending` | Pago pendiente (default) |
| `completed` | Pago confirmado |
| `failed` | Pago fallido |
| `refunded` | Pago reembolsado |

### `payment_type_enum`
| Valor | Descripción |
|---|---|
| `course` | Pago por el curso |
| `certificate` | Pago por certificado adicional |
| `bundle` | Pago por paquete combinado |

### `resource_type`
| Valor | Descripción |
|---|---|
| `video` | Video de clase |
| `pdf` | Documento PDF |
| `link` | Enlace externo |
| `quiz` | Evaluación / cuestionario |
| `other` | Otro tipo de recurso |

### `template_status`
| Valor | Descripción |
|---|---|
| `active` | Plantilla activa y usable |
| `inactive` | Plantilla desactivada |

---

## Tablas

---

### `users`

Tabla central. Almacena todos los usuarios (estudiantes, docentes, administradores). El rol se asigna por `user_roles`.

| Columna | Tipo | Nullable | Default | Notas |
|---|---|---|---|---|
| `user_id` | `bigint` | NO | `nextval(...)` | **PK** · Auto-incremental |
| `name` | `varchar(100)` | NO | — | Nombre(s) |
| `last_name` | `varchar(100)` | NO | — | Apellido(s) |
| `email` | `varchar(150)` | NO | — | **UNIQUE** |
| `password_hash` | `varchar(255)` | NO | — | Contraseña hasheada (bcrypt) |
| `phone` | `varchar(20)` | YES | — | Teléfono de contacto |
| `document_type` | `document_type` | YES | — | Tipo de documento |
| `document_number` | `varchar(30)` | YES | — | Nro. documento · UNIQUE con `document_type` |
| `photo_url` | `text` | YES | — | URL foto de perfil |
| `status` | `user_status` | NO | `'active'` | Estado de la cuenta |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Índices únicos:** `email` · `(document_type, document_number)`

---

### `roles`

Catálogo de roles del sistema.

| Columna | Tipo | Nullable | Default | Notas |
|---|---|---|---|---|
| `role_id` | `smallint` | NO | `nextval(...)` | **PK** |
| `name` | `varchar(50)` | NO | — | **UNIQUE** · Ej: `admin`, `student`, `teacher` |

> ⚠️ Tabla vacía — requiere datos semilla antes de usar.

---

### `user_roles`

Tabla puente muchos-a-muchos entre `users` y `roles`.

| Columna | Tipo | Nullable | Notas |
|---|---|---|---|
| `user_id` | `bigint` | NO | **PK** · FK → `users.user_id` (CASCADE) |
| `role_id` | `smallint` | NO | **PK** · FK → `roles.role_id` (RESTRICT) |

---

### `teacher_profiles`

Extensión 1:1 de `users` para docentes. Información académica y archivos para certificados.

| Columna | Tipo | Nullable | Notas |
|---|---|---|---|
| `user_id` | `bigint` | NO | **PK** · FK → `users.user_id` (CASCADE) |
| `profession` | `varchar(150)` | YES | Profesión base |
| `specialty` | `varchar(150)` | YES | Especialidad clínica o área |
| `biography` | `text` | YES | Biografía completa |
| `profile_photo_url` | `text` | YES | Foto de perfil |
| `cover_photo_url` | `text` | YES | Foto de portada |
| `signature_url` | `text` | YES | Firma digital para estampar en certificados |
| `created_at` | `timestamptz` | NO | |

> ⚠️ Falta columna `updated_at`.

---

### `courses`

Cursos, diplomados y talleres.

| Columna | Tipo | Nullable | Default | Notas |
|---|---|---|---|---|
| `course_id` | `bigint` | NO | `nextval(...)` | **PK** |
| `title` | `varchar(200)` | NO | — | Nombre del programa |
| `slug` | `varchar(220)` | NO | — | **UNIQUE** · Para URLs |
| `description` | `text` | YES | — | Descripción larga |
| `short_description` | `varchar(500)` | YES | — | Descripción para tarjetas |
| `price` | `numeric` | NO | `0` | Precio en PEN · CHECK ≥ 0 |
| `certificate_included` | `boolean` | NO | `false` | ¿Certificado incluido en el precio? |
| `certificate_price` | `numeric` | YES | — | Precio separado del certificado · CHECK ≥ 0 |
| `thumbnail_url` | `text` | YES | — | Imagen de portada |
| `status` | `course_status` | NO | `'draft'` | Estado de publicación |
| `published_at` | `timestamptz` | YES | — | Fecha real de publicación |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Índices:** `slug` (UNIQUE) · `status`

**Check constraints:**
- `price >= 0`
- `certificate_price >= 0`
- Si `certificate_included = true` → `certificate_price` debe ser `NULL`

> ⚠️ Faltan columnas: `category`, `modality`, `start_date`, `duration_weeks`, `academic_hours`, `badge_text`, `installments`.

---

### `course_teachers`

Tabla puente muchos-a-muchos entre cursos y docentes.

| Columna | Tipo | Nullable | Notas |
|---|---|---|---|
| `course_id` | `bigint` | NO | **PK** · FK → `courses.course_id` (CASCADE) |
| `user_id` | `bigint` | NO | **PK** · FK → `users.user_id` (RESTRICT) |

---

### `course_resources`

Materiales del curso (videos, PDFs, links, quizzes).

| Columna | Tipo | Nullable | Default | Notas |
|---|---|---|---|---|
| `resource_id` | `bigint` | NO | `nextval(...)` | **PK** |
| `course_id` | `bigint` | NO | — | FK → `courses.course_id` (CASCADE) |
| `resource_type` | `resource_type` | NO | — | Tipo de recurso |
| `title` | `varchar(200)` | NO | — | Título del recurso |
| `file_url` | `text` | YES | — | URL del archivo o enlace |
| `sort_order` | `integer` | NO | `0` | Orden de visualización |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Índice:** `(course_id, sort_order)`

---

### `enrollments`

Matrículas: relación alumno ↔ curso. Controla acceso y estado del certificado.

| Columna | Tipo | Nullable | Default | Notas |
|---|---|---|---|---|
| `enrollment_id` | `bigint` | NO | `nextval(...)` | **PK** |
| `course_id` | `bigint` | NO | — | FK → `courses.course_id` (RESTRICT) |
| `student_id` | `bigint` | NO | — | FK → `users.user_id` (RESTRICT) |
| `status` | `enrollment_status` | NO | `'pending'` | Estado de la matrícula |
| `certificate_status` | `certificate_status_enum` | NO | `'not_applicable'` | Estado del certificado del alumno |
| `enrolled_at` | `timestamptz` | YES | — | Fecha de confirmación |
| `access_until` | `timestamptz` | YES | — | Fecha de expiración del acceso |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Índices únicos:** `(course_id, student_id)` — un alumno no puede matricularse dos veces al mismo curso.  
**Índices:** `student_id` · `course_id` · `certificate_status`

---

### `payments`

Pagos asociados a una matrícula.

| Columna | Tipo | Nullable | Default | Notas |
|---|---|---|---|---|
| `payment_id` | `bigint` | NO | `nextval(...)` | **PK** |
| `enrollment_id` | `bigint` | NO | — | FK → `enrollments.enrollment_id` (RESTRICT) |
| `payment_type` | `payment_type_enum` | NO | — | `course`, `certificate` o `bundle` |
| `amount` | `numeric` | NO | — | Monto · CHECK ≥ 0 |
| `currency` | `char(3)` | NO | `'PEN'` | Moneda (ISO 4217) |
| `payment_method` | `varchar(50)` | YES | — | Yape, BCP, Visa, Izipay... |
| `transaction_code` | `varchar(100)` | YES | — | Código de la pasarela |
| `status` | `payment_status` | NO | `'pending'` | Estado del pago |
| `paid_at` | `timestamptz` | YES | — | Fecha de confirmación del pago |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Índice único:** `(enrollment_id, payment_type)` — evita cobros duplicados del mismo tipo.  
**Índices:** `enrollment_id` · `status`

---

### `certificate_templates`

Plantillas HTML para generar certificados. Permite múltiples diseños.

| Columna | Tipo | Nullable | Notas |
|---|---|---|---|
| `template_id` | `bigint` | NO | **PK** |
| `name` | `varchar` | NO | Nombre de la plantilla |
| `html_content` | `text` | YES | HTML completo del certificado |
| `status` | `template_status` | NO | `active` / `inactive` |
| `created_at` | `timestamptz` | NO | |
| `updated_at` | `timestamptz` | NO | |

---

### `course_certificate_config`

Qué plantilla y precio de certificado aplica a cada curso, por tipo de certificado.

| Columna | Tipo | Nullable | Default | Notas |
|---|---|---|---|---|
| `course_certificate_config_id` | `bigint` | NO | `nextval(...)` | **PK** |
| `course_id` | `bigint` | YES | — | FK → `courses.course_id` (CASCADE) |
| `template_id` | `bigint` | YES | — | FK → `certificate_templates.template_id` (RESTRICT) |
| `certificate_type` | `certificate_type_enum` | NO | `'participation'` | Tipo de certificado |
| `price` | `numeric` | YES | — | Precio del certificado · CHECK ≥ 0 |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Índice único:** `(course_id, certificate_type)`

---

### `certificates`

Certificados emitidos a alumnos. Código único verificable por QR.

| Columna | Tipo | Nullable | Default | Notas |
|---|---|---|---|---|
| `certificate_id` | `bigint` | NO | `nextval(...)` | **PK** |
| `enrollment_id` | `bigint` | NO | — | FK → `enrollments.enrollment_id` (RESTRICT) |
| `course_certificate_config_id` | `bigint` | NO | — | FK → `course_certificate_config` (RESTRICT) |
| `certificate_code` | `varchar` | NO | — | **UNIQUE** · Código QR de verificación |
| `certificate_type` | `certificate_type_enum` | NO | — | `participation` o `approval` |
| `status` | `issued_certificate_status` | NO | `'active'` | `active` o `revoked` |
| `issued_at` | `timestamptz` | NO | — | Fecha de emisión |
| `created_at` | `timestamptz` | NO | `now()` | |
| `updated_at` | `timestamptz` | NO | `now()` | |

**Índices únicos:** `certificate_code` · `(enrollment_id, certificate_type)`

---

## Claves Foráneas

| Tabla hijo | Columna | Tabla padre | Columna padre | ON DELETE |
|---|---|---|---|---|
| `certificates` | `course_certificate_config_id` | `course_certificate_config` | `course_certificate_config_id` | RESTRICT |
| `certificates` | `enrollment_id` | `enrollments` | `enrollment_id` | RESTRICT |
| `course_certificate_config` | `course_id` | `courses` | `course_id` | CASCADE |
| `course_certificate_config` | `template_id` | `certificate_templates` | `template_id` | RESTRICT |
| `course_resources` | `course_id` | `courses` | `course_id` | CASCADE |
| `course_teachers` | `course_id` | `courses` | `course_id` | CASCADE |
| `course_teachers` | `user_id` | `users` | `user_id` | RESTRICT |
| `enrollments` | `course_id` | `courses` | `course_id` | RESTRICT |
| `enrollments` | `student_id` | `users` | `user_id` | RESTRICT |
| `payments` | `enrollment_id` | `enrollments` | `enrollment_id` | RESTRICT |
| `teacher_profiles` | `user_id` | `users` | `user_id` | CASCADE |
| `user_roles` | `role_id` | `roles` | `role_id` | RESTRICT |
| `user_roles` | `user_id` | `users` | `user_id` | CASCADE |

---

## Índices

| Tabla | Índice | Único | Columnas |
|---|---|---|---|
| `certificate_templates` | `certificate_templates_pkey` | ✅ | `template_id` |
| `certificates` | `certificates_pkey` | ✅ | `certificate_id` |
| `certificates` | `certificates_certificate_code_key` | ✅ | `certificate_code` |
| `certificates` | `uq_certificate_enrollment_type` | ✅ | `enrollment_id, certificate_type` |
| `certificates` | `idx_certificates_code` | — | `certificate_code` |
| `certificates` | `idx_certificates_enrollment` | — | `enrollment_id` |
| `course_certificate_config` | `course_certificate_config_pkey` | ✅ | `course_certificate_config_id` |
| `course_certificate_config` | `uq_course_certificate_type` | ✅ | `course_id, certificate_type` |
| `course_resources` | `course_resources_pkey` | ✅ | `resource_id` |
| `course_resources` | `idx_course_resources_course` | — | `course_id, sort_order` |
| `course_teachers` | `course_teachers_pkey` | ✅ | `course_id, user_id` |
| `courses` | `courses_pkey` | ✅ | `course_id` |
| `courses` | `courses_slug_key` | ✅ | `slug` |
| `courses` | `idx_courses_status` | — | `status` |
| `enrollments` | `enrollments_pkey` | ✅ | `enrollment_id` |
| `enrollments` | `uq_enrollment_course_student` | ✅ | `course_id, student_id` |
| `enrollments` | `idx_enrollments_cert_status` | — | `certificate_status` |
| `enrollments` | `idx_enrollments_course` | — | `course_id` |
| `enrollments` | `idx_enrollments_student` | — | `student_id` |
| `payments` | `payments_pkey` | ✅ | `payment_id` |
| `payments` | `uq_payment_completed_type_per_enrollment` | ✅ | `enrollment_id, payment_type` |
| `payments` | `idx_payments_enrollment` | — | `enrollment_id` |
| `payments` | `idx_payments_status` | — | `status` |
| `roles` | `roles_pkey` | ✅ | `role_id` |
| `roles` | `roles_name_key` | ✅ | `name` |
| `teacher_profiles` | `teacher_profiles_pkey` | ✅ | `user_id` |
| `user_roles` | `user_roles_pkey` | ✅ | `user_id, role_id` |
| `users` | `users_pkey` | ✅ | `user_id` |
| `users` | `uq_users_document` | ✅ | `document_type, document_number` |
| `users` | `users_email_key` | ✅ | `email` |

---

## Mejoras pendientes

### Columnas faltantes en `courses`

```sql
CREATE TYPE course_category AS ENUM ('diplomado', 'curso', 'gestion', 'ia', 'taller');
CREATE TYPE course_modality  AS ENUM ('virtual_live', 'hybrid', 'presential', 'async');

ALTER TABLE courses
  ADD COLUMN category          course_category,
  ADD COLUMN modality          course_modality,
  ADD COLUMN duration_weeks    SMALLINT CHECK (duration_weeks > 0),
  ADD COLUMN academic_hours    SMALLINT,
  ADD COLUMN start_date        DATE,
  ADD COLUMN installments      SMALLINT DEFAULT 1 CHECK (installments >= 1),
  ADD COLUMN installment_price NUMERIC  CHECK (installment_price >= 0),
  ADD COLUMN badge_text        VARCHAR(100),
  ADD COLUMN badge_type        VARCHAR(20);
```

### `updated_at` en `teacher_profiles`

```sql
ALTER TABLE teacher_profiles
  ADD COLUMN updated_at TIMESTAMPTZ NOT NULL DEFAULT now();
```

### Datos semilla para `roles`

```sql
INSERT INTO roles (name) VALUES ('admin'), ('student'), ('teacher');
```

### Tablas recomendadas a agregar

| Tabla | Motivo |
|---|---|
| `testimonials` | Sección activa en el frontend sin datos reales |
| `events` | Masterclasses y seminarios (hoy solo en datos estáticos) |
| `course_schedule` | Cohortes con fechas de inicio/fin por curso |
| `notifications` | Alertas al alumno |
