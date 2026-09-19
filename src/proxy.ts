import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Rutas públicas que se mantienen 100% operativas
  if (
    pathname.startsWith("/verificar") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/images") ||
    pathname.startsWith("/video") ||
    pathname.startsWith("/certificates") ||
    pathname.startsWith("/fonts") ||
    pathname === "/favicon.ico" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    pathname === "/en-construccion"
  ) {
    return NextResponse.next();
  }

  // En cualquier otra ruta (inicio, cursos, admin, aula, contacto, login, etc.):
  // Mostrar la pantalla de "Estamos trabajando. Pronto tendrá novedades"
  return NextResponse.rewrite(new URL("/en-construccion", request.url));
}

// También exportamos middleware por retrocompatibilidad
export const middleware = proxy;

export const config = {
  matcher: [
    /*
     * Match all request paths except static files with extensions
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
