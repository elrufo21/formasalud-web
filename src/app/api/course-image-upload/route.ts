import { API_URL } from "@/lib/api";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

function errorResponse(status: number, message: string, code: string) {
  return Response.json(
    { status, message, data: null, errors: [{ code, message }] },
    { status },
  );
}

export async function POST(request: Request) {
  const authorization = request.headers.get("authorization");
  if (!authorization?.startsWith("Bearer ")) {
    return errorResponse(401, "Inicia sesión como administrador", "UNAUTHORIZED");
  }

  try {
    const adminCheck = await fetch(`${API_URL}/course/combo`, {
      headers: { Authorization: authorization },
      cache: "no-store",
    });
    if (!adminCheck.ok) {
      const status = adminCheck.status === 403 ? 403 : adminCheck.status === 401 ? 401 : 503;
      return errorResponse(status, status === 503 ? "No se pudo validar la sesión" : "Se requiere una sesión de administrador", "ADMIN_REQUIRED");
    }

    const formData = await request.formData();
    const file = formData.get("file");
    if (!(file instanceof File)) {
      return errorResponse(400, "Selecciona una imagen", "IMAGE_REQUIRED");
    }
    if (!ALLOWED_TYPES.has(file.type) || !/\.(jpe?g|png|webp)$/i.test(file.name)) {
      return errorResponse(400, "Solo se permiten imágenes JPG, PNG o WebP", "INVALID_IMAGE_TYPE");
    }
    if (file.size > MAX_IMAGE_SIZE) {
      return errorResponse(400, "La imagen no puede superar los 5 MB", "IMAGE_TOO_LARGE");
    }

    const uploadUrl = process.env.COURSE_IMAGE_UPLOAD_URL;
    const uploadToken = process.env.COURSE_IMAGE_UPLOAD_TOKEN;
    const useTrustedRemoteBridge = Boolean(uploadUrl && uploadToken);

    if (useTrustedRemoteBridge) {
      const remoteFormData = new FormData();
      remoteFormData.append("file", file, file.name);
      const remoteResponse = await fetch(uploadUrl!, {
        method: "POST",
        headers: { "x-course-image-upload-token": uploadToken! },
        body: remoteFormData,
        cache: "no-store",
      });
      return new Response(remoteResponse.body, {
        status: remoteResponse.status,
        headers: {
          "Content-Type": remoteResponse.headers.get("content-type") || "application/json",
        },
      });
    }

    // Desarrollo local: el backend valida el mismo token de administrador
    // usado para autorizar el formulario; no hace falta un secreto adicional.
    const remoteFormData = new FormData();
    remoteFormData.append("folder", "courses");
    remoteFormData.append("file", file, file.name);
    const remoteResponse = await fetch(`${API_URL}/upload`, {
      method: "POST",
      headers: { Authorization: authorization },
      body: remoteFormData,
      cache: "no-store",
    });
    return new Response(remoteResponse.body, {
      status: remoteResponse.status,
      headers: {
        "Content-Type": remoteResponse.headers.get("content-type") || "application/json",
      },
    });
  } catch {
    return errorResponse(502, "No se pudo conectar con el servidor de imágenes", "IMAGE_SERVER_UNAVAILABLE");
  }
}
