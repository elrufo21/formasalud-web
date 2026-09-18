import { Font } from "@react-pdf/renderer";

const GLOBAL_FLAG = "__FMS_PDF_FONTS_REGISTERED__";

const getFontSrc = (fileName: string) => {
  if (typeof window === "undefined") {
    return `${process.cwd().replace(/\\/g, "/")}/public/fonts/${fileName}`;
  }
  return `${window.location.origin}/fonts/${fileName}`;
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

    Font.register({
      family: "GreatVibes",
      src: "https://fonts.gstatic.com/s/greatvibes/v19/RWmMoKWR9v4ksMfaWd_JN9XLiaQoDmlH.ttf",
    });

    Font.register({
      family: "CinzelDeco",
      src: "https://fonts.gstatic.com/s/cinzeldecorative/v16/daaHSScvJGqLYhG8nNt8KPPswUAPnh7URs4lY0yY.ttf",
    });

    Font.register({
      family: "Cinzel",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-tbnTYrvDE5ZdqU.ttf",
          fontWeight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/cinzel/v23/8vIU7ww63mVu7gtR-kwKxNvkNOjw-uDiTYrvDE5ZdqU.ttf",
          fontWeight: 700,
        },
      ],
    });

    Font.register({
      family: "Lato",
      fonts: [
        {
          src: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjx4wWA.ttf",
          fontWeight: 300,
        },
        {
          src: "https://fonts.gstatic.com/s/lato/v24/S6uyw4BMUTPHjxAwXg.ttf",
          fontWeight: 400,
        },
        {
          src: "https://fonts.gstatic.com/s/lato/v24/S6u9w4BMUTPHh6UVSwaPGQ.ttf",
          fontWeight: 700,
        },
      ],
    });
  } catch (err) {
    console.warn("No se pudieron registrar algunas fuentes en @react-pdf/renderer:", err);
  }
}

registerFonts();
