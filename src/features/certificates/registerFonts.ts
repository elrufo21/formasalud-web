import { Font } from "@react-pdf/renderer";
import fs from "node:fs";
import path from "node:path";

const GLOBAL_FLAG = "__FMS_PDF_FONTS_REGISTERED__";

function getBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  if (process.env.NEXT_PUBLIC_APP_URL) {
    return process.env.NEXT_PUBLIC_APP_URL;
  }
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://formasalud-web.vercel.app";
}

const getFontSrc = (fileName: string) => {
  if (typeof window === "undefined") {
    // Si el archivo existe físicamente en el disco (desarrollo local / standalone)
    const localPath = path.join(process.cwd(), "public", "fonts", fileName);
    try {
      if (fs.existsSync(localPath)) {
        return localPath.replace(/\\/g, "/");
      }
    } catch {
      // Ignorar y usar URL remota
    }
  }
  // En Vercel Serverless, los archivos de public/ se descargan desde la CDN pública
  const baseUrl = getBaseUrl();
  return `${baseUrl}/fonts/${fileName}`;
};

export function registerFonts() {
  const globalScope = globalThis as typeof globalThis & {
    [GLOBAL_FLAG]?: boolean;
  };

  if (globalScope[GLOBAL_FLAG]) return;
  globalScope[GLOBAL_FLAG] = true;

  try {
    Font.registerHyphenationCallback((word) => [word]);

    Font.register({
      family: "Playfair",
      fonts: [
        { src: getFontSrc("playfair-display-400.ttf"), fontWeight: 400 },
        { src: getFontSrc("playfair-display-700.ttf"), fontWeight: 700 },
      ],
    });

    Font.register({
      family: "Lora",
      fonts: [
        { src: getFontSrc("lora-400.ttf"), fontWeight: 400 },
        { src: getFontSrc("lora-600.ttf"), fontWeight: 600 },
        { src: getFontSrc("lora-italic.ttf"), fontStyle: "italic" },
        { src: getFontSrc("lora-italic.ttf"), fontWeight: 600, fontStyle: "italic" },
      ],
    });

    // Fuentes remotas con CDN global de alta disponibilidad
    Font.register({
      family: "GreatVibes",
      src: "https://cdn.jsdelivr.net/fontsource/fonts/great-vibes@latest/latin-400-normal.ttf",
    });

    Font.register({
      family: "CinzelDeco",
      src: "https://cdn.jsdelivr.net/fontsource/fonts/cinzel-decorative@latest/latin-400-normal.ttf",
    });

    Font.register({
      family: "Cinzel",
      fonts: [
        {
          src: "https://cdn.jsdelivr.net/fontsource/fonts/cinzel@latest/latin-400-normal.ttf",
          fontWeight: 400,
        },
        {
          src: "https://cdn.jsdelivr.net/fontsource/fonts/cinzel@latest/latin-700-normal.ttf",
          fontWeight: 700,
        },
      ],
    });

    Font.register({
      family: "Lato",
      fonts: [
        {
          src: "https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-300-normal.ttf",
          fontWeight: 300,
        },
        {
          src: "https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-400-normal.ttf",
          fontWeight: 400,
        },
        {
          src: "https://cdn.jsdelivr.net/fontsource/fonts/lato@latest/latin-700-normal.ttf",
          fontWeight: 700,
        },
      ],
    });
  } catch (err) {
    console.warn("No se pudieron registrar algunas fuentes en @react-pdf/renderer:", err);
  }
}

registerFonts();
