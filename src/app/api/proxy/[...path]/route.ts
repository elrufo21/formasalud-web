import { NextRequest, NextResponse } from "next/server";
import https from "node:https";
import http from "node:http";

const BACKEND_BASE =
  process.env.NEXT_PUBLIC_API_URL || "https://212.47.64.208/formasalud-api";

const insecureHttpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

async function forwardToBackend(
  req: NextRequest,
  pathSegments: string[],
): Promise<NextResponse> {
  const cleanBase = BACKEND_BASE.replace(/\/+$/, "");
  const subPath = pathSegments.join("/");
  const search = req.nextUrl.search || "";
  const targetUrl = new URL(`${cleanBase}/${subPath}${search}`);

  const headers: Record<string, string> = {};
  const contentType = req.headers.get("content-type");
  if (contentType) headers["content-type"] = contentType;
  const auth = req.headers.get("authorization");
  if (auth) headers["authorization"] = auth;
  const accept = req.headers.get("accept");
  if (accept) headers["accept"] = accept;

  const method = req.method.toUpperCase();
  const bodyBuffer =
    method !== "GET" && method !== "HEAD"
      ? Buffer.from(await req.arrayBuffer())
      : undefined;

  if (bodyBuffer) {
    headers["content-length"] = String(bodyBuffer.byteLength);
  }

  return new Promise<NextResponse>((resolve) => {
    const isHttps = targetUrl.protocol === "https:";
    const requestFn = isHttps ? https.request : http.request;

    const proxyReq = requestFn(
      targetUrl,
      {
        method,
        headers,
        agent: isHttps ? insecureHttpsAgent : undefined,
        timeout: 20000,
      },
      (proxyRes) => {
        const chunks: Buffer[] = [];
        proxyRes.on("data", (chunk) =>
          chunks.push(Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk)),
        );
        proxyRes.on("end", () => {
          const responseBody = Buffer.concat(chunks);
          const resHeaders = new Headers();
          const resContentType = proxyRes.headers["content-type"];
          if (typeof resContentType === "string") {
            resHeaders.set("content-type", resContentType);
          }
          resolve(
            new NextResponse(responseBody, {
              status: proxyRes.statusCode || 200,
              headers: resHeaders,
            }),
          );
        });
      },
    );

    proxyReq.on("error", (err) => {
      resolve(
        NextResponse.json(
          {
            status: 502,
            message: "No se pudo conectar con el servidor de FormaSalud",
            data: null,
            errors: [{ code: "PROXY_ERROR", message: err.message }],
          },
          { status: 502 },
        ),
      );
    });

    proxyReq.on("timeout", () => {
      proxyReq.destroy();
      resolve(
        NextResponse.json(
          {
            status: 504,
            message: "Tiempo de espera agotado al conectar con el servidor",
            data: null,
            errors: [{ code: "PROXY_TIMEOUT", message: "Timeout" }],
          },
          { status: 504 },
        ),
      );
    });

    if (bodyBuffer && bodyBuffer.byteLength > 0) {
      proxyReq.write(bodyBuffer);
    }
    proxyReq.end();
  });
}

type RouteContext = {
  params: Promise<{ path: string[] }>;
};

export async function GET(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return forwardToBackend(req, path);
}

export async function POST(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return forwardToBackend(req, path);
}

export async function PATCH(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return forwardToBackend(req, path);
}

export async function PUT(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return forwardToBackend(req, path);
}

export async function DELETE(req: NextRequest, ctx: RouteContext) {
  const { path } = await ctx.params;
  return forwardToBackend(req, path);
}
