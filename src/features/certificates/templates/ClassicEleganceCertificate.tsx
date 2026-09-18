import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  Image,
  StyleSheet,
  Svg,
  Path,
  Rect,
  Defs,
  LinearGradient,
  Stop,
  G,
  Circle,
} from "@react-pdf/renderer";
import "../registerFonts";
import { FormasaludCertificatePayload } from "../types";

const W = 841.89;
const H = 595.28;
const NAVY = "#031D58";
const BLUE_ICON = "#073D92";
const TEAL = "#056878";
const GOLD = "#C99725";
const GOLD_LIGHT = "#F6D66C";
const PAPER = "#FFFDF8";

const styles = StyleSheet.create({
  page: { width: W, height: H, position: "relative", backgroundColor: PAPER },
  background: { position: "absolute", top: 0, left: 0, width: W, height: H },
  logoPrimary: {
    position: "absolute",
    top: 36,
    left: 55,
    width: 112,
    height: 112,
    objectFit: "contain",
  },
  logoSecondary: {
    position: "absolute",
    top: 38,
    right: 55,
    width: 90,
    height: 90,
    objectFit: "contain",
  },
  header: {
    position: "absolute",
    top: 34,
    left: 190,
    width: 462,
    alignItems: "center",
  },
  eyebrow: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 12.5,
    color: NAVY,
    letterSpacing: 0.5,
  },
  brand: {
    marginTop: 1,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 32,
    color: TEAL,
    letterSpacing: 2,
  },
  taglineRow: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  taglineLine: { width: 70, height: 0.8, backgroundColor: GOLD },
  taglineDot: {
    width: 4.5,
    height: 4.5,
    backgroundColor: GOLD,
    transform: "rotate(45deg)",
  },
  tagline: {
    marginHorizontal: 6,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 7.2,
    color: NAVY,
    letterSpacing: 0.6,
  },
  titleSection: {
    position: "absolute",
    top: 114,
    left: 180,
    width: 480,
    alignItems: "center",
  },
  certificateTitle: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 36,
    letterSpacing: 6,
    color: NAVY,
    textAlign: "center",
  },
  subtitleRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 2,
  },
  subtitleLine: { width: 55, height: 1, backgroundColor: GOLD },
  subtitleText: {
    marginHorizontal: 8,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 14.5,
    letterSpacing: 2.8,
    color: TEAL,
    textAlign: "center",
  },
  granted: {
    position: "absolute",
    top: 176,
    left: 220,
    width: 400,
    fontFamily: "Playfair",
    fontSize: 11,
    color: "#222222",
    textAlign: "center",
  },
  name: {
    position: "absolute",
    top: 194,
    left: 40,
    width: W - 80,
    fontFamily: "Lora",
    fontStyle: "italic",
    fontSize: 28,
    color: NAVY,
    textAlign: "center",
  },
  nameRule: {
    position: "absolute",
    top: 238,
    left: 215,
    width: 412,
    height: 0.8,
    backgroundColor: GOLD,
  },
  main: {
    position: "absolute",
    top: 250,
    left: 200,
    width: 470,
    alignItems: "center",
  },
  preamble: {
    fontFamily: "Playfair",
    fontSize: 10.8,
    color: "#111111",
    textAlign: "center",
  },
  course: {
    marginTop: 6,
    width: 465,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 15,
    lineHeight: 1.25,
    color: NAVY,
    textAlign: "center",
    textTransform: "uppercase",
  },
  description: {
    marginTop: 6,
    width: 445,
    fontFamily: "Playfair",
    fontSize: 10.5,
    lineHeight: 1.35,
    color: "#222222",
    textAlign: "center",
  },
  leftSidebar: {
    position: "absolute",
    left: 40,
    top: 265,
    width: 150,
    borderRightWidth: 0.8,
    borderRightColor: GOLD,
    paddingRight: 6,
  },
  sidebarItemLabel: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 8,
    color: NAVY,
    textTransform: "uppercase",
  },
  sidebarItemVal: {
    fontFamily: "Playfair",
    fontSize: 8,
    color: "#444444",
    marginBottom: 6,
  },
  signatures: {
    position: "absolute",
    left: 170,
    top: 420,
    width: 500,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  signature: { width: 175, alignItems: "center" },
  signatureImage: {
    width: 130,
    height: 52,
    objectFit: "contain",
  },
  signatureLine: {
    width: 160,
    height: 1,
    backgroundColor: GOLD,
    marginTop: 2,
    marginBottom: 4,
  },
  signatureName: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 8.5,
    color: "#141414",
    textAlign: "center",
  },
  signatureRole: {
    marginTop: 1.5,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 7.8,
    color: NAVY,
    textAlign: "center",
  },
  sealBox: {
    width: 102,
    height: 102,
    alignItems: "center",
    justifyContent: "center",
  },
  seal: { width: 98, height: 98, objectFit: "contain" },
  footerContainer: {
    position: "absolute",
    bottom: 12,
    left: 40,
    width: W - 80,
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Playfair",
    fontSize: 8,
    color: "#444444",
    textAlign: "center",
  },
  codeBadge: {
    position: "absolute",
    right: 50,
    bottom: 35,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: GOLD,
    borderRadius: 4,
    backgroundColor: "#FFFFFF",
    alignItems: "center",
  },
  codeBadgeText: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 8.5,
    color: NAVY,
  },
});

const resolveAsset = (path?: string, fallback = "") => {
  if (path && path.startsWith("http")) return path;
  if (path && path.startsWith("data:")) return path;
  const normalized = path || fallback;
  if (typeof window !== "undefined" && normalized) {
    return `${window.location.origin}${normalized.startsWith("/") ? "" : "/"}${normalized}`;
  }
  return normalized;
};

export function ClassicEleganceCertificate({ data }: { data: FormasaludCertificatePayload }) {
  const isPonente = data.role === "ponente";
  const logoLeft = resolveAsset(data.logoLeftUrl, "/certificates/logofms.png");
  const logoRight = resolveAsset(data.logoRightUrl, "/certificates/ausp.png");
  const firmaLeft = resolveAsset(data.signatureLeftUrl, "/certificates/firmaMiguel.png");
  const firmaRight = resolveAsset(data.signatureRightUrl, "/certificates/bertha.png");
  const sello = resolveAsset(data.sealUrl, "/certificates/cello.png");

  const subtitle = isPonente ? "DE RECONOCIMIENTO" : "DE PARTICIPACIÓN";
  const roleText = isPonente ? "PONENTE" : "PARTICIPANTE";

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        {/* Fondo decorativo perimetral */}
        <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={styles.background}>
          <Defs>
            <LinearGradient id="borderGrad" x1="0" y1="0" x2="1" y2="1">
              <Stop offset="0%" stopColor={GOLD_LIGHT} />
              <Stop offset="50%" stopColor={GOLD} />
              <Stop offset="100%" stopColor="#8A6414" />
            </LinearGradient>
          </Defs>
          <Rect x={14} y={14} width={W - 28} height={H - 28} fill="none" stroke="url(#borderGrad)" strokeWidth={2} />
          <Rect x={20} y={20} width={W - 40} height={H - 40} fill="none" stroke={NAVY} strokeWidth={0.8} />
          <Rect x={24} y={24} width={W - 48} height={H - 48} fill="none" stroke={GOLD} strokeWidth={0.5} opacity={0.7} />
        </Svg>

        {/* Logos superiores */}
        {logoLeft && <Image src={logoLeft} style={styles.logoPrimary} />}
        {logoRight && <Image src={logoRight} style={styles.logoSecondary} />}

        {/* Encabezado institucional */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>CENTRO DE FORMACIÓN E INNOVACIÓN EN SALUD</Text>
          <Text style={styles.brand}>FORMASALUD</Text>
          <View style={styles.taglineRow}>
            <View style={styles.taglineLine} />
            <View style={styles.taglineDot} />
            <Text style={styles.tagline}>CALIDAD Y EXCELENCIA ACADÉMICA NACIONAL</Text>
            <View style={styles.taglineDot} />
            <View style={styles.taglineLine} />
          </View>
        </View>

        {/* Título y Subtítulo */}
        <View style={styles.titleSection}>
          <Text style={styles.certificateTitle}>CERTIFICADO</Text>
          <View style={styles.subtitleRow}>
            <View style={styles.subtitleLine} />
            <Text style={styles.subtitleText}>{subtitle}</Text>
            <View style={styles.subtitleLine} />
          </View>
        </View>

        {/* Otorgado a */}
        <Text style={styles.granted}>Otorgado a:</Text>
        <Text style={styles.name}>{data.studentName}</Text>
        <View style={styles.nameRule} />

        {/* Contenido Central */}
        <View style={styles.main}>
          <Text style={styles.preamble}>
            En reconocimiento a su destacada participación en calidad de{" "}
            <Text style={{ fontFamily: "Playfair", fontWeight: 700, color: NAVY }}>{roleText}</Text> en el curso:
          </Text>
          <Text style={styles.course}>{data.courseTitle}</Text>
          <Text style={styles.description}>
            {data.courseDateText ? `Desarrollado el ${data.courseDateText}. ` : ""}
            {data.hours ? `Con una duración académica de ${data.hours} horas lectivas.` : ""}
          </Text>
        </View>

        {/* Barra lateral con metadatos */}
        <View style={styles.leftSidebar}>
          <Text style={styles.sidebarItemLabel}>Registro Oficial:</Text>
          <Text style={styles.sidebarItemVal}>{data.certificateCode}</Text>
          <Text style={styles.sidebarItemLabel}>Modalidad:</Text>
          <Text style={styles.sidebarItemVal}>{data.modality || "Virtual / Asincrónico"}</Text>
          <Text style={styles.sidebarItemLabel}>Institución:</Text>
          <Text style={styles.sidebarItemVal}>Grupo Paucar Perú S.A.C.</Text>
          <Text style={styles.sidebarItemLabel}>RUC:</Text>
          <Text style={styles.sidebarItemVal}>20613837613</Text>
        </View>

        {/* Firmas y Sello */}
        <View style={styles.signatures}>
          <View style={styles.signature}>
            {firmaLeft && <Image src={firmaLeft} style={styles.signatureImage} />}
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>
              {data.coordinatorName || "LIC. ZAMBRANO CRUZ MIGUEL"}
            </Text>
            <Text style={styles.signatureRole}>COORDINADOR ACADÉMICO</Text>
          </View>

          <View style={styles.sealBox}>
            {sello && <Image src={sello} style={styles.seal} />}
          </View>

          <View style={styles.signature}>
            {firmaRight && <Image src={firmaRight} style={styles.signatureImage} />}
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>
              {data.gerenteGeneral || "LIC. BERTHA BENITES"}
            </Text>
            <Text style={styles.signatureRole}>GERENTE GENERAL</Text>
          </View>
        </View>

        {/* Código QR Badge */}
        <View style={styles.codeBadge}>
          <Text style={styles.codeBadgeText}>{data.certificateCode}</Text>
        </View>

        {/* Pie de página institucional */}
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            GRUPO PAUCAR PERÚ S.A.C. · RUC 20613837613 · Lima, Perú · www.formasalud.org.pe
          </Text>
        </View>
      </Page>
    </Document>
  );
}
