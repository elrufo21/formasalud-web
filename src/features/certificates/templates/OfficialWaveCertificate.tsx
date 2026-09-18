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
} from "@react-pdf/renderer";
import "../registerFonts";
import { FormasaludCertificatePayload } from "../types";

// Dimensiones A4 Landscape (en puntos: 297 x 210 mm)
const W = 841.89;
const H = 595.28;

// Paleta institucional FormaSalud
const NAVY = "#0D2B5E";
const GOLD = "#C9A84C";
const TEAL = "#1B7070";
const WHITE = "#FFFFFF";
const GRAY = "#666666";

const styles = StyleSheet.create({
  page: {
    width: W,
    height: H,
    backgroundColor: WHITE,
    position: "relative",
  },
  contentContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: W,
    height: H,
    paddingHorizontal: 70,
    paddingTop: 22,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  logosRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 6,
  },
  logo: {
    width: 85,
    height: 85,
    objectFit: "contain",
  },
  logoSeparator: {
    width: 1.5,
    height: 65,
    backgroundColor: NAVY,
    marginHorizontal: 18,
  },
  certificateTitle: {
    fontFamily: "Cinzel",
    fontWeight: 700,
    fontSize: 54,
    color: NAVY,
    letterSpacing: 8,
    textAlign: "center",
    marginBottom: 2,
  },
  subtitleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },
  subtitleLine: {
    width: 50,
    height: 1,
    backgroundColor: GOLD,
  },
  subtitleDiamond: {
    width: 5,
    height: 5,
    backgroundColor: GOLD,
    transform: "rotate(45deg)",
  },
  subtitleText: {
    fontFamily: "Cinzel",
    fontSize: 13.5,
    color: GOLD,
    letterSpacing: 3.5,
    textAlign: "center",
    marginHorizontal: 8,
  },
  otorgadoA: {
    fontFamily: "Lato",
    fontWeight: 400,
    fontSize: 11,
    color: GRAY,
    textAlign: "center",
    marginBottom: 4,
    letterSpacing: 0.5,
  },
  studentName: {
    fontFamily: "GreatVibes",
    fontSize: 48,
    color: NAVY,
    textAlign: "center",
    marginBottom: 0,
  },
  nameLine: {
    width: 420,
    height: 0.8,
    backgroundColor: NAVY,
    marginBottom: 8,
  },
  introText: {
    fontFamily: "Lato",
    fontWeight: 300,
    fontSize: 10.5,
    color: GRAY,
    textAlign: "center",
    marginBottom: 4,
  },
  courseTitle: {
    fontFamily: "Lato",
    fontWeight: 700,
    fontSize: 14,
    color: NAVY,
    textAlign: "center",
    marginBottom: 6,
    maxWidth: 580,
    lineHeight: 1.35,
  },
  dateDurationText: {
    fontFamily: "Lato",
    fontWeight: 400,
    fontSize: 10,
    color: GRAY,
    textAlign: "center",
    marginBottom: 4,
  },
  descriptionText: {
    fontFamily: "Lato",
    fontWeight: 300,
    fontSize: 9.5,
    color: GRAY,
    textAlign: "center",
    maxWidth: 490,
    lineHeight: 1.45,
    marginBottom: 12,
  },
  signaturesRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
    width: "100%",
    paddingHorizontal: 25,
  },
  signatureBlock: {
    alignItems: "center",
    width: 175,
  },
  signatureImage: {
    width: 110,
    height: 48,
    objectFit: "contain",
    marginBottom: 3,
  },
  signatureLine: {
    width: 155,
    height: 0.8,
    backgroundColor: NAVY,
    marginBottom: 4,
  },
  signatureName: {
    fontFamily: "Lato",
    fontWeight: 400,
    fontSize: 9,
    color: GRAY,
    textAlign: "center",
  },
  signatureRole: {
    fontFamily: "Lato",
    fontWeight: 700,
    fontSize: 9.5,
    color: NAVY,
    letterSpacing: 0.5,
    marginTop: 1,
    textAlign: "center",
  },
  sealBlock: {
    alignItems: "center",
    justifyContent: "flex-end",
    width: 110,
  },
  sealImage: {
    width: 95,
    height: 95,
    objectFit: "contain",
  },
  footerRow: {
    position: "absolute",
    bottom: 18,
    left: 36,
    right: 36,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Lato",
    fontSize: 8.5,
    color: GRAY,
  },
});

const Background = () => (
  <Svg
    width={W}
    height={H}
    viewBox={`0 0 ${W} ${H}`}
    style={{ position: "absolute", top: 0, left: 0 }}
  >
    <Defs>
      <LinearGradient id="goldGrad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#E8C96B" />
        <Stop offset="50%" stopColor="#C9A84C" />
        <Stop offset="100%" stopColor="#A07830" />
      </LinearGradient>
      <LinearGradient id="navyGrad" x1="0" y1="0" x2="1" y2="1">
        <Stop offset="0%" stopColor="#0D2B5E" />
        <Stop offset="100%" stopColor="#162F6A" />
      </LinearGradient>
      <LinearGradient id="tealGrad" x1="0" y1="0" x2="1" y2="0">
        <Stop offset="0%" stopColor="#1B7070" />
        <Stop offset="100%" stopColor="#145858" />
      </LinearGradient>
    </Defs>

    {/* Esquina superior izquierda */}
    <Path d="M0,0 L200,0 L0,230 Z" fill="url(#navyGrad)" />
    <Path d="M0,0 L160,0 L0,185 Z" fill="url(#goldGrad)" opacity="0.85" />
    <Path d="M160,0 L0,185 L0,200 L175,0 Z" fill={GOLD} opacity="0.5" />

    {/* Esquina inferior derecha */}
    <Path
      d={`M${W},${H} L${W},${H - 230} C${W - 80},${H - 180} ${W - 200},${H - 160} ${W - 260},${H - 80} C${W - 320},0 ${W - 180},${H - 40} ${W},${H} Z`}
      fill="url(#tealGrad)"
    />
    <Path
      d={`M${W},${H} L${W},${H - 170} C${W - 60},${H - 130} ${W - 160},${H - 120} ${W - 210},${H - 50} C${W - 250},${H - 10} ${W - 140},${H} ${W},${H} Z`}
      fill="url(#navyGrad)"
    />
    <Path
      d={`M${W},${H - 170} C${W - 60},${H - 130} ${W - 160},${H - 120} ${W - 210},${H - 50} C${W - 250},${H - 10} ${W - 140},${H} ${W - 5},${H}`}
      fill="none"
      stroke={GOLD}
      strokeWidth="2"
      opacity="0.7"
    />

    {/* Ondas grises decorativas centrales */}
    <Path
      d={`M0,${H * 0.55} C${W * 0.15},${H * 0.42} ${W * 0.3},${H * 0.65} ${W * 0.5},${H * 0.52} C${W * 0.7},${H * 0.39} ${W * 0.85},${H * 0.62} ${W},${H * 0.5}`}
      fill="none"
      stroke="#DDDDDD"
      strokeWidth="35"
      opacity="0.35"
    />
    <Path
      d={`M0,${H * 0.62} C${W * 0.2},${H * 0.5} ${W * 0.38},${H * 0.72} ${W * 0.55},${H * 0.58} C${W * 0.72},${H * 0.44} ${W * 0.88},${H * 0.68} ${W},${H * 0.55}`}
      fill="none"
      stroke="#E5E5E5"
      strokeWidth="25"
      opacity="0.3"
    />

    {/* Bordes dorados */}
    <Rect
      x="10"
      y="10"
      width={W - 20}
      height={H - 20}
      fill="none"
      stroke={GOLD}
      strokeWidth="1.5"
    />
    <Rect
      x="16"
      y="16"
      width={W - 32}
      height={H - 32}
      fill="none"
      stroke={GOLD}
      strokeWidth="0.5"
      opacity="0.6"
    />

    {/* Ornamentos de esquina */}
    <Path d="M22,22 L50,22 M22,22 L22,50" fill="none" stroke={GOLD} strokeWidth="1.5" />
    <Path d={`M${W - 22},22 L${W - 50},22 M${W - 22},22 L${W - 22},50`} fill="none" stroke={GOLD} strokeWidth="1.5" />
    <Path d={`M22,${H - 22} L50,${H - 22} M22,${H - 22} L22,${H - 50}`} fill="none" stroke={GOLD} strokeWidth="1.5" />
    <Path d={`M${W - 22},${H - 22} L${W - 50},${H - 22} M${W - 22},${H - 22} L${W - 22},${H - 50}`} fill="none" stroke={GOLD} strokeWidth="1.5" />
  </Svg>
);

const resolveAsset = (path?: string, fallback = "") => {
  if (path && path.startsWith("http")) return path;
  if (path && path.startsWith("data:")) return path;
  const normalized = path || fallback;
  if (typeof window !== "undefined" && normalized) {
    return `${window.location.origin}${normalized.startsWith("/") ? "" : "/"}${normalized}`;
  }
  return normalized;
};

export function OfficialWaveCertificate({ data }: { data: FormasaludCertificatePayload }) {
  const logoLeft = resolveAsset(data.logoLeftUrl, "/certificates/logofms.png");
  const logoRight = resolveAsset(data.logoRightUrl, "/certificates/ausp.png");
  const firmaLeft = resolveAsset(data.signatureLeftUrl, "/certificates/fra.png");
  const firmaRight = resolveAsset(data.signatureRightUrl, "/certificates/firmaMiguel.png");
  const sello = resolveAsset(data.sealUrl, "/certificates/cello.png");

  const subtitle = data.role === "ponente" ? "DE PONENCIA" : "DE PARTICIPACIÓN";
  const hoursText = data.hours ? `${data.hours} horas académicas.` : "40 horas académicas.";
  const courseDateLine = data.courseDateText
    ? `Desarrollado el ${data.courseDateText}   |   Duración: ${hoursText}`
    : `Desarrollado en el año 2026   |   Duración: ${hoursText}`;

  const issueLine = data.issueDateText
    ? `Fecha de emisión: ${data.issueDateText}`
    : `Fecha de emisión: ${data.issueDay || "15"} / ${data.issueMonth || "09"} / 20${data.issueYear || "26"}`;

  return (
    <Document>
      <Page size="A4" orientation="landscape" style={styles.page}>
        <Background />

        <View style={styles.contentContainer}>
          {/* Fila de logos institucionales */}
          <View style={styles.logosRow}>
            {logoLeft && <Image src={logoLeft} style={styles.logo} />}
            <View style={styles.logoSeparator} />
            {logoRight && <Image src={logoRight} style={styles.logo} />}
          </View>

          {/* Título principal */}
          <Text style={styles.certificateTitle}>CERTIFICADO</Text>

          {/* Subtítulo con rombos dorados */}
          <View style={styles.subtitleContainer}>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
              <View style={styles.subtitleLine} />
              <View style={styles.subtitleDiamond} />
            </View>
            <Text style={styles.subtitleText}>{subtitle}</Text>
            <View style={{ flexDirection: "row", alignItems: "center", gap: 3 }}>
              <View style={styles.subtitleDiamond} />
              <View style={styles.subtitleLine} />
            </View>
          </View>

          {/* Nombre del participante */}
          <Text style={styles.otorgadoA}>Otorgado a:</Text>
          <Text style={styles.studentName}>{data.studentName}</Text>
          <View style={styles.nameLine} />

          {/* Detalle del curso */}
          <Text style={styles.introText}>
            Por haber participado y aprobado satisfactoriamente el curso:
          </Text>
          <Text style={styles.courseTitle}>{data.courseTitle}</Text>
          <Text style={styles.dateDurationText}>{courseDateLine}</Text>

          {/* Párrafo descriptivo institucional */}
          <Text style={styles.descriptionText}>
            El presente curso fortaleció sus conocimientos y competencias para brindar{"\n"}
            una atención segura, oportuna y basada en evidencia.
          </Text>

          {/* Firmas y sello central */}
          <View style={styles.signaturesRow}>
            {/* Firma izquierda: Docente / Gerente General */}
            <View style={styles.signatureBlock}>
              {firmaLeft ? (
                <Image src={firmaLeft} style={styles.signatureImage} />
              ) : (
                <View style={{ width: 110, height: 48 }} />
              )}
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>
                {data.teacherName || data.gerenteGeneral || "Lic. Enf. Francisco Paucar Benites"}
              </Text>
              <Text style={styles.signatureRole}>
                {data.gerenteGeneral ? "GERENTE GENERAL" : "DOCENTE"}
              </Text>
            </View>

            {/* Sello central */}
            <View style={styles.sealBlock}>
              {sello && <Image src={sello} style={styles.sealImage} />}
            </View>

            {/* Firma derecha: Coordinación Académica */}
            <View style={styles.signatureBlock}>
              {firmaRight ? (
                <Image src={firmaRight} style={styles.signatureImage} />
              ) : (
                <View style={{ width: 110, height: 48 }} />
              )}
              <View style={styles.signatureLine} />
              <Text style={styles.signatureName}>
                {data.coordinatorName || "Lic. Zambrano Cruz Miguel"}
              </Text>
              <Text style={styles.signatureRole}>COORDINACIÓN ACADÉMICA</Text>
            </View>
          </View>
        </View>

        {/* Pie de página oficial con código */}
        <View style={styles.footerRow}>
          <Text style={styles.footerText}>{issueLine}</Text>
          <Text style={styles.footerText}>
            Código: {data.certificateCode.startsWith("FS-") || data.certificateCode.startsWith("REG-") || data.certificateCode.startsWith("FM-") ? data.certificateCode : `FM-VM-${data.certificateCode}`}
          </Text>
        </View>
      </Page>
    </Document>
  );
}
