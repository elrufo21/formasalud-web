import type { Metadata, Viewport } from "next";
import { Fraunces, Inter, IBM_Plex_Mono } from "next/font/google";
import { JsonLd } from "@/components/shared/JsonLd";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const ibmPlexMono = IBM_Plex_Mono({
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500"],
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0F2942",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://formasalud.pe"),
  title: {
    default: "FORMASALUD — Centro de Capacitación y Formación Médica Continua",
    template: "%s | FORMASALUD",
  },
  description:
    "Centro especializado en formación médica continua en Perú. Diplomados, cursos clínicos y talleres de simulación dictados por especialistas de hospitales de referencia. Certificación oficial respaldada por GRUPO PAUCAR PERÚ S.A.C.",
  keywords: [
    "cursos medicos peru",
    "diplomados en salud lima",
    "capacitacion medica continua",
    "enfermeria cuidados criticos",
    "auditoria medica susalud",
    "ia en medicina",
    "simulacion clinica lima",
    "formasalud",
    "grupo paucar peru",
  ],
  authors: [{ name: "FORMASALUD - Grupo Paucar Perú S.A.C." }],
  creator: "FORMASALUD",
  publisher: "GRUPO PAUCAR PERÚ S.A.C.",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "FORMASALUD — Capacitación Médica Continua & Diplomados Clínicos",
    description:
      "Formación médica de alto nivel para médicos, enfermeros y gestores de salud en el Perú. Clases en vivo, talleres prácticos y aula virtual 24/7.",
    url: "https://formasalud.pe",
    siteName: "FORMASALUD",
    locale: "es_PE",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 1200,
        height: 630,
        alt: "FORMASALUD - Centro de Capacitación en Salud",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "FORMASALUD — Innovación y Desarrollo Académico en Salud",
    description:
      "Diplomados y cursos clínicos dictados por especialistas médicos en ejercicio activo.",
    images: ["/images/logo.png"],
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
      lang="es"
      className={`${fraunces.variable} ${inter.variable} ${ibmPlexMono.variable} h-full antialiased`}
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
