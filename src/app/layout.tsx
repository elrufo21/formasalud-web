import type { Metadata, Viewport } from "next";
import { montserrat } from "@/lib/fonts";
import { JsonLd } from "@/components/shared/JsonLd";
import "./globals.css";

const SITE_URL = "https://www.formasalud.org.pe";

export const viewport: Viewport = {
  themeColor: "#0F2942",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "FORMASALUD",
  title: {
    default: "FORMASALUD — Innovación y Desarrollo Académico en Salud | Cursos y Diplomados",
    template: "%s | FORMASALUD",
  },
  description:
    "FORMASALUD es un centro de capacitación especializado en la innovación y desarrollo académico en salud en el Perú. Cursos de Primeros Auxilios, RCP y DEA, Inyectables, Enfermería en UCI, Emergencias y Diplomados con Certificación Oficial con código QR.",
  keywords: [
    "formasalud",
    "forma salud",
    "formasalud peru",
    "formasalud.org.pe",
    "curso de primeros auxilios lima",
    "primeros auxilios y respuesta rapida ante emergencias comunes",
    "curso de rcp y dea lima",
    "curso de inyectables y bioseguridad",
    "cursos de enfermeria peru",
    "cuidados criticos uci emergencias",
    "diplomados en salud lima",
    "capacitacion medica continua peru",
    "soporte vital basico bls acls",
    "simulacion clinica lima",
    "certificados formasalud qr",
  ],
  authors: [{ name: "FORMASALUD", url: SITE_URL }],
  creator: "FORMASALUD",
  publisher: "FORMASALUD — Grupo Paucar Perú S.A.C.",
  category: "education",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  manifest: "/manifest.webmanifest",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-48.png", sizes: "48x48", type: "image/png" },
      { url: "/icon-96.png", sizes: "96x96", type: "image/png" },
      { url: "/icon-144.png", sizes: "144x144", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: "FORMASALUD — Innovación y Desarrollo Académico en Salud",
    description:
      "Cursos teórico-prácticos, Primeros Auxilios, RCP/DEA, Enfermería en Áreas Críticas y Diplomados con Certificación Oficial verificable por QR en el Perú.",
    url: SITE_URL,
    siteName: "FORMASALUD",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "FORMASALUD — Innovación y Desarrollo Académico en Salud",
      },
      {
        url: "/images/flyers/primeros-auxilios-emergencias-2027-banner.png",
        width: 1280,
        height: 720,
        alt: "Curso de Primeros Auxilios y Respuesta Rápida ante Emergencias Comunes — FORMASALUD",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMASALUD — Innovación y Desarrollo Académico en Salud",
    description:
      "Cursos de Primeros Auxilios, Enfermería en UCI, Emergencias y Diplomados con Certificación Oficial con código QR.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="es-PE"
      className={`${montserrat.variable} ${montserrat.className} h-full antialiased`}
    >
      <head>
        <JsonLd />
      </head>
      <body className="min-h-full flex flex-col font-sans text-ink bg-paper selection:bg-goldpale selection:text-navyink">
        {children}
      </body>
    </html>
  );
}
