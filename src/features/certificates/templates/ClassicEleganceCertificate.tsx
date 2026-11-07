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
  Circle,
} from "@react-pdf/renderer";
import { create as createQrCode } from "qrcode";
import "../registerFonts";
import { FormasaludCertificatePayload } from "../types";

const W = 841.89;
const H = 595.28;

const NAVY = "#05224D";
const SAPPHIRE = "#074B83";
const TEAL = "#0B8585";
const GOLD = "#C99725";
const PAPER = "#FFFFFF";

const styles = StyleSheet.create({
  page: { minHeight: H, position: "relative", backgroundColor: PAPER },
  background: { position: "absolute", top: 0, left: 0, width: W, height: H },
  watermark: {
    position: "absolute",
    top: 135,
    left: 260,
    width: 320,
    height: 320,
    opacity: 0.05,
    objectFit: "contain",
  },
  logoPrimary: {
    position: "absolute",
    top: 34,
    left: 45,
    width: 95,
    height: 95,
    objectFit: "contain",
  },
  logoSecondaryGroup: {
    position: "absolute",
    top: 34,
    right: 45,
    flexDirection: "row",
    alignItems: "center",
  },
  logoFisio: {
    width: 74,
    height: 74,
    objectFit: "contain",
    marginRight: 10,
  },
  logoAusp: {
    width: 74,
    height: 74,
    objectFit: "contain",
  },
  header: {
    position: "absolute",
    top: 32,
    left: 170,
    width: 500,
    alignItems: "center",
  },
  eyebrow: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 9.5,
    color: NAVY,
    letterSpacing: 0.8,
    textAlign: "center",
  },
  brand: {
    marginTop: 2,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 36,
    color: NAVY,
    letterSpacing: 2,
    textAlign: "center",
  },
  taglineRow: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  taglineLine: { width: 60, height: 0.8, backgroundColor: GOLD },
  taglineDot: {
    width: 4,
    height: 4,
    backgroundColor: GOLD,
    transform: "rotate(45deg)",
  },
  tagline: {
    marginHorizontal: 6,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 7.8,
    color: SAPPHIRE,
    letterSpacing: 0.8,
  },
  otorga: {
    position: "absolute",
    top: 104,
    left: 270,
    width: 300,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 9.5,
    color: NAVY,
    letterSpacing: 1.5,
    textAlign: "center",
  },
  certificateTitle: {
    position: "absolute",
    top: 114,
    left: 170,
    width: 500,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 48,
    letterSpacing: 3,
    color: NAVY,
    textAlign: "center",
  },
  ribbonContainer: {
    position: "absolute",
    top: 170,
    left: 271,
    width: 300,
    height: 27,
    alignItems: "center",
    justifyContent: "center",
  },
  ribbonText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 14.5,
    letterSpacing: 1.5,
    color: "#FFFFFF",
    textAlign: "center",
  },
  granted: {
    position: "absolute",
    top: 202,
    left: 300,
    width: 242,
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: SAPPHIRE,
    letterSpacing: 2,
    textAlign: "center",
  },
  name: {
    position: "absolute",
    top: 216,
    left: 40,
    width: W - 80,
    fontFamily: "Lora",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: 25,
    color: NAVY,
    textAlign: "center",
  },
  nameRule: {
    position: "absolute",
    top: 250,
    left: 180,
    width: 482,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  nameRuleLine: {
    width: 210,
    height: 0.8,
    backgroundColor: GOLD,
  },
  nameRuleDiamond: {
    width: 5,
    height: 5,
    backgroundColor: GOLD,
    marginHorizontal: 6,
    transform: "rotate(45deg)",
  },
  preamble: {
    position: "absolute",
    top: 262,
    left: 170,
    width: 500,
    fontFamily: "Lora",
    fontStyle: "normal",
    fontSize: 11.5,
    color: "#222222",
    textAlign: "center",
  },
  badgePill: {
    position: "absolute",
    top: 284,
    left: 311,
    width: 220,
    backgroundColor: NAVY,
    borderRadius: 12,
    paddingVertical: 4.5,
    alignItems: "center",
  },
  badgePillText: {
    fontFamily: "Helvetica-Bold",
    fontSize: 10.5,
    color: "#FFFFFF",
    letterSpacing: 1.2,
  },
  courseTitle: {
    position: "absolute",
    top: 314,
    left: 155,
    width: 532,
    fontFamily: "Helvetica-Bold",
    fontSize: 15.5,
    lineHeight: 1.24,
    color: NAVY,
    textAlign: "center",
    textTransform: "uppercase",
  },
  courseMeta: {
    position: "absolute",
    top: 374,
    left: 165,
    width: 512,
    fontFamily: "Lora",
    fontSize: 10.2,
    lineHeight: 1.38,
    color: "#222222",
    textAlign: "center",
  },
  sidebar: {
    position: "absolute",
    left: 36,
    top: 202,
    width: 155,
  },
  sidebarItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 13,
  },
  sidebarIconBox: {
    width: 35,
    height: 35,
    borderRadius: 17.5,
    backgroundColor: SAPPHIRE,
    alignItems: "center",
    justifyContent: "center",
  },
  sidebarItemContent: {
    marginLeft: 8,
    width: 112,
  },
  sidebarItemTitle: {
    fontFamily: "Helvetica-Bold",
    fontSize: 7.8,
    color: SAPPHIRE,
    letterSpacing: 0.5,
  },
  sidebarItemVal: {
    marginTop: 2,
    fontFamily: "Helvetica",
    fontSize: 8.2,
    color: "#111111",
  },
  signatures: {
    position: "absolute",
    left: 170,
    top: 442,
    width: 502,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  signatureCol: {
    width: 175,
    alignItems: "center",
  },
  signatureImgBox: {
    width: 175,
    height: 36,
    position: "relative",
    alignItems: "center",
  },
  signatureLeftImg: {
    position: "absolute",
    left: -12,
    bottom: -28,
    width: 195,
    height: 98,
    objectFit: "contain",
  },
  signatureRightImg: {
    position: "absolute",
    left: -10,
    bottom: -18,
    width: 195,
    height: 98,
    objectFit: "contain",
  },
  signatureLine: {
    width: 165,
    height: 0.8,
    backgroundColor: NAVY,
    marginTop: 2,
    marginBottom: 4,
  },
  signatureName: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8.8,
    color: "#111111",
    textAlign: "center",
  },
  signatureRole: {
    marginTop: 1.5,
    fontFamily: "Helvetica",
    fontSize: 7.5,
    color: "#444444",
    textAlign: "center",
    lineHeight: 1.25,
  },
  sealBox: {
    width: 96,
    height: 96,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
  },
  sealImg: {
    width: 92,
    height: 92,
    objectFit: "contain",
  },
  qrContainer: {
    position: "absolute",
    right: 34,
    bottom: 64,
    width: 82,
    padding: 3,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: SAPPHIRE,
    borderRadius: 3,
    alignItems: "center",
  },
  qrLabel: {
    marginTop: 3,
    width: "100%",
    backgroundColor: NAVY,
    color: "#FFFFFF",
    fontFamily: "Helvetica-Bold",
    fontSize: 5.8,
    textAlign: "center",
    paddingVertical: 2.5,
    letterSpacing: 0.4,
  },
  footer: {
    position: "absolute",
    bottom: 12,
    left: 36,
    width: W - 72,
    textAlign: "center",
  },
  footerText: {
    fontFamily: "Helvetica",
    fontSize: 7.8,
    color: "#555555",
    textAlign: "center",
  },
});

function BackgroundShapes() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Rect x="0" y="0" width={W} height={H} fill={PAPER} />

      {/* Doble marco institucional */}
      <Rect x="10" y="10" width={W - 20} height={H - 20} rx="5" fill="none" stroke={SAPPHIRE} strokeWidth="1.5" />
      <Rect x="14" y="14" width={W - 28} height={H - 28} rx="3" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.8" />
      <Rect x="26" y="26" width={W - 52} height={H - 52} fill="none" stroke={SAPPHIRE} strokeWidth="0.4" opacity="0.5" />

      {/* Ondas superiores en esquina derecha: Zafiro, Azul Eléctrico y Teal */}
      <Path d={`M${W} 0 H${W - 230} C${W - 145} 25 ${W - 75} 68 ${W} 165 Z`} fill={NAVY} />
      <Path d={`M${W} 0 H${W - 170} C${W - 105} 22 ${W - 48} 60 ${W} 125 Z`} fill={SAPPHIRE} />
      <Path d={`M${W} 0 H${W - 115} C${W - 68} 18 ${W - 28} 45 ${W} 85 Z`} fill={TEAL} />
      <Path d={`M${W - 240} 0 C${W - 150} 28 ${W - 80} 74 ${W} 175`} fill="none" stroke={GOLD} strokeWidth="1" opacity="0.8" />

      {/* Ondas inferiores en esquina derecha */}
      <Path d={`M${W} ${H} H${W - 240} C${W - 150} ${H - 28} ${W - 80} ${H - 74} ${W} ${H - 180} Z`} fill={NAVY} />
      <Path d={`M${W} ${H} H${W - 175} C${W - 105} ${H - 24} ${W - 48} ${H - 62} ${W} ${H - 128} Z`} fill={SAPPHIRE} />
      <Path d={`M${W} ${H} H${W - 120} C${W - 70} ${H - 20} ${W - 30} ${H - 48} ${W} ${H - 85} Z`} fill={TEAL} />
      <Path d={`M${W - 250} ${H} C${W - 160} ${H - 30} ${W - 85} ${H - 80} ${W} ${H - 192}`} fill="none" stroke={GOLD} strokeWidth="1" opacity="0.8" />

      {/* Ondas superiores en esquina izquierda */}
      <Path d="M0 0 H160 C100 20 50 50 0 115 Z" fill={NAVY} />
      <Path d="M0 0 H110 C68 18 32 40 0 80 Z" fill={TEAL} />
      <Path d="M168 0 C108 22 55 55 0 124" fill="none" stroke={GOLD} strokeWidth="0.9" opacity="0.75" />
    </Svg>
  );
}

function SidebarIcon({ kind }: { kind: "date" | "time" | "screen" | "award" }) {
  return (
    <Svg width={32} height={32} viewBox="0 0 34 34">
      <Circle cx="17" cy="17" r="16" fill={SAPPHIRE} />
      <Circle cx="17" cy="17" r="14.8" fill="none" stroke="#FFFFFF" strokeWidth="0.6" opacity="0.6" />
      {kind === "date" && (
        <>
          <Rect x="9" y="11" width="16" height="14" rx="1.5" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <Path d="M9 15 H25 M13 9 V13 M21 9 V13 M13 18 h2 M18 18 h2 M13 22 h2 M18 22 h2" stroke="#FFFFFF" strokeWidth="1.4" fill="none" />
        </>
      )}
      {kind === "time" && (
        <>
          <Circle cx="17" cy="17" r="9" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <Path d="M17 11 V17 L21 20" fill="none" stroke="#FFFFFF" strokeWidth="1.7" />
        </>
      )}
      {kind === "screen" && (
        <>
          <Rect x="8.5" y="10" width="17" height="11.5" rx="1" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <Path d="M14 25 H20 M17 21.5 V25" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
        </>
      )}
      {kind === "award" && (
        <>
          <Circle cx="17" cy="15" r="7" fill="none" stroke="#FFFFFF" strokeWidth="1.5" />
          <Path d="M13 21 L11.5 27 L17 24.5 L22.5 27 L21 21 M17 10 l1.4 2.2 2.5.5-1.8 1.9.3 2.6-2.4-1.1-2.4 1.1.3-2.6-1.8-1.9 2.5-.5z" fill="none" stroke="#FFFFFF" strokeWidth="1.2" />
        </>
      )}
    </Svg>
  );
}

function RibbonSvg({ text }: { text: string }) {
  return (
    <View style={styles.ribbonContainer}>
      <Svg width={300} height={27} viewBox="0 0 278 25" style={{ position: "absolute", width: 300, height: 27 }}>
        <Path d="M0 0h278v25H0l15-12.5zM278 0l-15 12.5L278 25z" fill={SAPPHIRE} />
      </Svg>
      <Text style={styles.ribbonText}>{text}</Text>
    </View>
  );
}

function QrBadge({ url }: { url: string }) {
  const qr = createQrCode(url, { errorCorrectionLevel: "M" });
  const quietZone = 2;
  const viewBoxSize = qr.modules.size + quietZone * 2;
  const qrPath = Array.from(qr.modules.data).reduce((path, cell, index) => {
    if (!cell) return path;
    const x = (index % qr.modules.size) + quietZone;
    const y = Math.floor(index / qr.modules.size) + quietZone;
    return `${path}M${x} ${y}h1v1h-1z`;
  }, "");

  return (
    <View style={styles.qrContainer}>
      <Svg viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`} style={{ width: 70, height: 70 }}>
        <Path d={qrPath} fill={NAVY} />
      </Svg>
      <Text style={styles.qrLabel}>VERIFICA TU CERTIFICADO</Text>
    </View>
  );
}

const resolveAsset = (path?: string, fallback = "") => {
  if (path && (path.startsWith("http") || path.startsWith("data:"))) return path;
  const normalized = path || fallback;
  if (typeof window !== "undefined" && normalized) {
    return `${window.location.origin}${normalized.startsWith("/") ? "" : "/"}${normalized}`;
  }
  return normalized;
};

export function ClassicEleganceCertificate({ data }: { data: FormasaludCertificatePayload }) {
  const isApproval = data.certificateType === "approval";
  const logoLeft = resolveAsset(data.logoLeftUrl, "/certificates/logofms.png");
  const logoFisio = resolveAsset(data.logoRightUrl, "/certificates/fisiouci.png");
  const logoAusp = resolveAsset(data.sponsorLogoUrl, "/certificates/ausp.png");
  const firmaLeft = resolveAsset(data.signatureLeftUrl, "/certificates/fra.png");
  const firmaRight = resolveAsset(data.signatureRightUrl, "/certificates/firmaMiguel.png");
  const sello = resolveAsset(data.sealUrl, "/certificates/cello.png");

  const verificationUrl =
    data.verificationUrl ||
    `https://formasalud.org.pe/verificar/${encodeURIComponent(data.certificateCode)}`;

  const nameLength = (data.studentName || "").trim().length;
  const nameFontSize = nameLength > 45 ? 19 : nameLength > 36 ? 21 : nameLength > 28 ? 23 : 25;

  return (
    <Document title={`Certificado Formasalud - ${data.studentName}`}>
      <Page size="A4" orientation="landscape" style={styles.page} wrap={false}>
        {/* Fondo institucional con curvas elegantes */}
        <View style={styles.background}>
          <BackgroundShapes />
        </View>

        {/* Marca de agua institucional */}
        {logoLeft && <Image src={logoLeft} style={styles.watermark} />}

        {/* Logos superiores */}
        {logoLeft && <Image src={logoLeft} style={styles.logoPrimary} />}
        <View style={styles.logoSecondaryGroup}>
          {logoFisio && <Image src={logoFisio} style={styles.logoFisio} />}
          {logoAusp && <Image src={logoAusp} style={styles.logoAusp} />}
        </View>

        {/* Encabezado FormaSalud */}
        <View style={styles.header}>
          <Text style={styles.eyebrow}>CENTRO DE FORMACIÓN E INNOVACIÓN EN SALUD</Text>
          <Text style={styles.brand}>FORMASALUD</Text>
          <View style={styles.taglineRow}>
            <View style={styles.taglineLine} />
            <View style={styles.taglineDot} />
            <Text style={styles.tagline}>INNOVACIÓN Y DESARROLLO ACADÉMICO EN SALUD</Text>
            <View style={styles.taglineDot} />
            <View style={styles.taglineLine} />
          </View>
        </View>

        {/* Título de Certificado */}
        <Text style={styles.otorga}>OTORGA EL PRESENTE</Text>
        <Text style={styles.certificateTitle}>CERTIFICADO</Text>

        {/* Cinta Ribbon */}
        <RibbonSvg text={isApproval ? "DE APROBACIÓN" : "DE PARTICIPACIÓN"} />

        {/* Otorgado a */}
        <Text style={styles.granted}>A:</Text>

        {/* Nombre del participante en una sola línea */}
        <Text
          style={[styles.name, { fontSize: nameFontSize }]}
          wrap={false}
          hyphenationCallback={(w) => [w]}
        >
          {data.studentName}
        </Text>

        {/* Línea dorada divisoria con rombo */}
        <View style={styles.nameRule}>
          <View style={styles.nameRuleLine} />
          <View style={styles.nameRuleDiamond} />
          <View style={styles.nameRuleLine} />
        </View>

        {/* Preámbulo */}
        <Text style={styles.preamble}>
          Por su participación y aprobación satisfactoria en el
        </Text>

        {/* Cápsula de Curso Internacional */}
        <View style={styles.badgePill}>
          <Text style={styles.badgePillText}>CURSO INTERNACIONAL:</Text>
        </View>

        {/* Título del Curso */}
        <Text style={styles.courseTitle}>{data.courseTitle}</Text>

        {/* Metadatos y Auspicios */}
        <Text style={styles.courseMeta}>
          Desarrollado de manera virtual el {data.courseDateText || "03 de octubre de 2026"}, con una duración de {data.hours || 4} horas lectivas.{"\n"}
          Organizado por FORMASALUD, con el auspicio de FisioUCI y Medical Service Perú.
        </Text>

        {/* Barra lateral con iconos circulares oficiales */}
        <View style={styles.sidebar}>
          <View style={styles.sidebarItem}>
            <View style={styles.sidebarIconBox}>
              <SidebarIcon kind="date" />
            </View>
            <View style={styles.sidebarItemContent}>
              <Text style={styles.sidebarItemTitle}>FECHA DEL CURSO</Text>
              <Text style={styles.sidebarItemVal}>{data.courseDateText || "03 de octubre de 2026"}</Text>
            </View>
          </View>

          <View style={styles.sidebarItem}>
            <View style={styles.sidebarIconBox}>
              <SidebarIcon kind="time" />
            </View>
            <View style={styles.sidebarItemContent}>
              <Text style={styles.sidebarItemTitle}>DURACIÓN</Text>
              <Text style={styles.sidebarItemVal}>{data.hours || 4} {data.hoursUnit || "horas lectivas"}</Text>
            </View>
          </View>

          <View style={styles.sidebarItem}>
            <View style={styles.sidebarIconBox}>
              <SidebarIcon kind="screen" />
            </View>
            <View style={styles.sidebarItemContent}>
              <Text style={styles.sidebarItemTitle}>MODALIDAD</Text>
              <Text style={styles.sidebarItemVal}>{data.modality || "100% Virtual"}</Text>
            </View>
          </View>

          <View style={styles.sidebarItem}>
            <View style={styles.sidebarIconBox}>
              <SidebarIcon kind="award" />
            </View>
            <View style={styles.sidebarItemContent}>
              <Text style={styles.sidebarItemTitle}>CÓDIGO DE CERTIFICADO</Text>
              <Text style={styles.sidebarItemVal}>{data.certificateCode}</Text>
            </View>
          </View>
        </View>

        {/* Firmas y Sello Oficial Central */}
        <View style={styles.signatures}>
          <View style={styles.signatureCol}>
            <View style={styles.signatureImgBox}>
              {firmaLeft && <Image src={firmaLeft} style={styles.signatureLeftImg} />}
            </View>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>
              {data.academicDirector || "Lic. Francisco Paucar Benites"}
            </Text>
            <Text style={styles.signatureRole}>DIRECTOR ACADÉMICO{"\n"}FORMASALUD</Text>
          </View>

          <View style={styles.sealBox}>
            {sello && <Image src={sello} style={styles.sealImg} />}
          </View>

          <View style={styles.signatureCol}>
            <View style={styles.signatureImgBox}>
              {firmaRight && <Image src={firmaRight} style={styles.signatureRightImg} />}
            </View>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>
              {data.coordinatorName || "Lic. Zambrano Cruz Miguel"}
            </Text>
            <Text style={styles.signatureRole}>COORDINADOR ACADÉMICO{"\n"}FORMASALUD</Text>
          </View>
        </View>

        {/* Código QR de verificación con marco institucional */}
        <QrBadge url={verificationUrl} />

        {/* Pie de página institucional */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {data.issueDateText ? `${data.issueDateText}   •   ` : "05 de octubre del 2026   •   "}
            FORMASALUD RUC: 20613837613   •   Verificable en: formasalud.org.pe
          </Text>
        </View>
      </Page>
    </Document>
  );
}
