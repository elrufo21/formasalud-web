import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = "https://www.formasalud.org.pe";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/admin/"],
      },
      {
        userAgent: [
          "Googlebot",
          "Googlebot-Image",
          "Bingbot",
          "OAI-SearchBot",
          "ChatGPT-User",
          "GPTBot",
          "Google-Extended",
          "PerplexityBot",
          "ClaudeBot",
          "anthropic-ai",
          "Applebot-Extended",
        ],
        allow: [
          "/",
          "/cursos",
          "/cursos/*",
          "/quienes-somos",
          "/contacto",
          "/verificar",
          "/llms.txt",
        ],
        disallow: ["/api/", "/admin/"],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: baseUrl,
  };
}
