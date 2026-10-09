import {
  Circle,
  Document,
  Image,
  Page,
  Path,
  Rect,
  StyleSheet,
  Svg,
  Text,
  View,
} from "@react-pdf/renderer";
import { create as createQrCode } from "qrcode";
import "../registerFonts";

// Interfaz autónoma equivalente a CertificatePdf14Data + extras de Pdf18
export interface FormasaludClassicData {
  name?: string;
  course?: string;
  hours?: number;
  hoursUnit?: string;
  triajeCertificate?: boolean;
  pancreatitisCertificate?: boolean;
  speakerCertificate?: boolean;
  previewOnly?: boolean;
  teacher1?: string;
  teacher2?: string;
  idCertificado?: string;
  certificateCode?: string;
  coordinatorName?: string;
  sealImage?: string;
  awardSealImage?: string;
  signatureLeftImage?: string;
  signatureRightImage?: string;
  logoImage?: string;
  secondaryLogoImage?: string;
  sponsorLogoImage?: string;
  backgroundImage?: string;
  courseDay?: string;
  courseMonth?: string;
  courseYear?: string;
  issueDay?: string;
  issueMonth?: string;
  issueYear?: string;
  modality?: string;
  courseDates?: string;
  courseDateText?: string;
  website?: string;
  ruc?: string;
  issueDateText?: string;
  issuePlace?: string;
  verificationUrl?: string;
}

type CertificatePdf18Data = FormasaludClassicData;

const W = 841.89;
const H = 595.28;
const NAVY = "#031D58";
const BLUE = "#0873B8";
const TEAL = "#075A91";
const GOLD = "#C99725";
const PAPER = "#FFFDF8";

const resolveAsset = (source?: string) => {
  if (!source || source.startsWith("http") || source.startsWith("data:")) {
    return source;
  }
  if (/^[A-Za-z]:[\\/]/.test(source)) {
    return `file:///${source.replace(/\\/g, "/")}`;
  }

  const publicPath = source.startsWith("/") ? source : `/${source}`;
  if (typeof window !== "undefined") return `${window.location.origin}${publicPath}`;
  const localPath = `${process.cwd().replace(/\\/g, "/")}/public${publicPath}`;
  return /^[A-Za-z]:\//.test(localPath) ? `file:///${localPath}` : `file://${localPath}`;
};

const styles = StyleSheet.create({
  page: { minHeight: H, position: "relative", backgroundColor: PAPER },
  background: { position: "absolute", top: 0, left: 0, width: W, height: H },
  courseBackground: {
    position: "absolute",
    top: 0,
    left: 0,
    width: W,
    height: H,
    objectFit: "cover",
    opacity: 0.16,
  },
  logoPrimary: {
    position: "absolute",
    top: 34,
    left: 30,
    width: 82,
    height: 82,
    objectFit: "contain",
  },
  logoSecondary: {
    position: "absolute",
    top: 30,
    right: 30,
    width: 100,
    height: 100,
    objectFit: "contain",
  },
  logoSponsor: {
    position: "absolute",
    top: 31,
    right: 24,
    width: 83,
    height: 83,
    objectFit: "contain",
  },
  watermark: {
    position: "absolute",
    left: 300,
    top: 245,
    width: 220,
    height: 220,
    objectFit: "contain",
    opacity: 0.045,
  },
  header: {
    position: "absolute",
    top: 27,
    left: 140,
    width: 562,
    alignItems: "center",
  },
  eyebrow: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 10,
    color: NAVY,
  },
  brand: {
    marginTop: 0,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 34,
    color: NAVY,
    letterSpacing: 2.2,
  },
  taglineRow: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  taglineLine: { width: 88, height: 0.8, backgroundColor: BLUE },
  taglineDot: {
    width: 5,
    height: 5,
    backgroundColor: BLUE,
    transform: "rotate(45deg)",
  },
  tagline: {
    marginHorizontal: 7,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 7.7,
    color: NAVY,
  },
  certificateTitle: {
    position: "absolute",
    top: 119,
    left: 190,
    width: 474,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 45,
    letterSpacing: 6,
    color: NAVY,
    textAlign: "center",
  },
  certificateSubtitle: {
    position: "absolute",
    top: 167,
    left: 282,
    width: 278,
    height: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  granted: {
    position: "absolute",
    top: 195,
    left: 220,
    width: 402,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 12,
    color: "#111111",
    textAlign: "center",
  },
  name: {
    position: "absolute",
    top: 207,
    left: 190,
    width: 474,
    fontFamily: "GreatVibes",
    fontSize: 39,
    color: NAVY,
    textAlign: "center",
  },
  nameRule: {
    position: "absolute",
    top: 252,
    left: 212,
    width: 428,
    height: 0.8,
    backgroundColor: BLUE,
  },
  nameDiamond: {
    position: "absolute",
    top: 248.6,
    left: W / 2 - 3.8,
    width: 7.6,
    height: 7.6,
    backgroundColor: BLUE,
    transform: "rotate(45deg)",
  },
  main: {
    position: "absolute",
    top: 266,
    left: 210,
    width: 465,
    alignItems: "center",
  },
  preamble: {
    fontFamily: "Playfair",
    fontSize: 11.5,
    color: "#101010",
    textAlign: "center",
  },
  coursePill: {
    marginTop: 5,
    width: 202,
    height: 21,
    borderRadius: 11,
    backgroundColor: NAVY,
    justifyContent: "center",
  },
  coursePillText: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 11.5,
    color: "#FFFFFF",
    textAlign: "center",
  },
  course: {
    marginTop: 8,
    width: 465,
    fontFamily: "Helvetica-Bold",
    fontSize: 18.5,
    lineHeight: 1.24,
    color: TEAL,
    textAlign: "center",
    textTransform: "uppercase",
  },
  description: {
    marginTop: 4,
    width: 438,
    fontFamily: "Playfair",
    fontSize: 10.6,
    lineHeight: 1.23,
    color: "#151515",
    textAlign: "center",
  },
  signatures: {
    position: "absolute",
    left: 190,
    top: 454,
    width: 455,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
  },
  signature: { width: 146, alignItems: "center" },
  signatureImageBox: { width: 146, height: 25 },
  signatureImage: {
    position: "absolute",
    left: -22,
    bottom: -24,
    width: 190,
    height: 88,
    objectFit: "contain",
  },
  signatureLine: { width: 142, height: 0.8, backgroundColor: GOLD },
  signatureName: {
    marginTop: 4,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 7.2,
    color: "#141414",
    textAlign: "center",
  },
  signatureRole: {
    marginTop: 1,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 7.1,
    lineHeight: 1.3,
    color: NAVY,
    textAlign: "center",
  },
  sealBox: { width: 84, height: 72, alignItems: "center" },
  seal: { width: 79, height: 79, objectFit: "contain", opacity: 0.82 },
  footer: {
    position: "absolute",
    bottom: 12,
    left: 40,
    width: W - 80,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  footerText: {
    fontFamily: "Helvetica",
    fontSize: 8,
    color: "#222222",
    textAlign: "center",
  },
  footerLead: {
    fontFamily: "Helvetica-Bold",
    fontSize: 8,
    color: TEAL,
  },
  footerLink: { fontFamily: "Helvetica-Bold", fontSize: 8, color: BLUE },
  slogan: {
    position: "absolute",
    right: 24,
    bottom: 42,
    width: 126,
    fontFamily: "Lora",
    fontStyle: "italic",
    fontWeight: 600,
    fontSize: 12,
    lineHeight: 1.12,
    color: BLUE,
    textAlign: "center",
    transform: "rotate(-5deg)",
  },
});

function Background() {
  return (
    <Svg width={W} height={H} viewBox={`0 0 ${W} ${H}`}>
      <Rect x="0" y="0" width={W} height={H} fill={PAPER} />
      <Rect
        x="10"
        y="10"
        width={W - 20}
        height={H - 20}
        rx="5"
        fill="none"
        stroke={BLUE}
        strokeWidth="1.5"
      />
      <Rect
        x="28"
        y="28"
        width={W - 56}
        height={H - 56}
        fill="none"
        stroke={BLUE}
        strokeWidth="0.45"
      />

      <Path
        d="M0 0 H240 C155 28 87 76 0 180 Z"
        fill="#0477B8"
      />
      <Path
        d="M0 0 H174 C104 26 48 70 0 132 Z"
        fill="#22A7D8"
      />
      <Path d="M0 0 H122 C74 25 32 59 0 98 Z" fill="#07539A" />

      <Path
        d={`M${W} ${H} H${W - 240} C${W - 155} ${H - 28} ${W - 87} ${H - 76} ${W} ${H - 180} Z`}
        fill="#0477B8"
      />
      <Path
        d={`M${W} ${H} H${W - 174} C${W - 104} ${H - 26} ${W - 48} ${H - 70} ${W} ${H - 132} Z`}
        fill="#22A7D8"
      />
      <Path
        d={`M${W} ${H} H${W - 122} C${W - 74} ${H - 25} ${W - 32} ${H - 59} ${W} ${H - 98} Z`}
        fill="#07539A"
      />
    </Svg>
  );
}

function PancreasIllustration() {
  return (
    <Svg
      width={118}
      height={94}
      viewBox="0 0 118 94"
      style={{ position: "absolute", top: 183, right: 18, opacity: 0.48 }}
    >
      <Path
        d="M9 51 C17 37 27 28 38 31 C46 18 57 17 64 28 C76 19 87 25 88 38 C102 31 111 39 108 51 C104 63 91 66 81 59 C69 72 57 68 52 59 C40 71 28 65 25 57 C18 62 11 59 9 51Z"
        fill="#F5C08C"
        stroke="#D89056"
        strokeWidth="2"
      />
      <Path
        d="M17 50 C34 45 44 51 55 48 C68 44 76 46 94 48 M44 34 C46 41 46 48 45 58 M75 31 C73 38 74 46 78 56"
        fill="none"
        stroke="#BD7648"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Path
        d="M54 48 C61 43 64 37 64 29 M80 48 C87 43 91 38 92 31"
        fill="none"
        stroke="#4E9FBE"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <Circle cx="45" cy="49" r="2" fill="#F7E2C7" />
      <Circle cx="79" cy="47" r="2" fill="#F7E2C7" />
    </Svg>
  );
}

function InfoIcon({ kind }: { kind: "date" | "time" | "screen" | "award" }) {
  return (
    <Svg width={34} height={34} viewBox="0 0 34 34">
      <Circle cx="17" cy="17" r="16.2" fill={BLUE} />
      <Circle
        cx="17"
        cy="17"
        r="15.2"
        fill="none"
        stroke="#FFFFFF"
        strokeWidth="0.7"
        opacity="0.7"
      />
      {kind === "date" && (
        <>
          <Rect
            x="9"
            y="11"
            width="16"
            height="14"
            rx="1.5"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <Path
            d="M9 15 H25 M13 9 V13 M21 9 V13 M13 18 h2 M18 18 h2 M13 22 h2 M18 22 h2"
            stroke="#FFFFFF"
            strokeWidth="1.4"
            fill="none"
          />
        </>
      )}
      {kind === "time" && (
        <>
          <Circle
            cx="17"
            cy="17"
            r="9"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <Path
            d="M17 11 V17 L21 20"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.7"
          />
        </>
      )}
      {kind === "screen" && (
        <>
          <Rect
            x="8.5"
            y="10"
            width="17"
            height="11.5"
            rx="1"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <Path
            d="M14 25 H20 M17 21.5 V25"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
        </>
      )}
      {kind === "award" && (
        <>
          <Circle
            cx="17"
            cy="15"
            r="7"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
          />
          <Path
            d="M13 21 L11.5 27 L17 24.5 L22.5 27 L21 21 M17 10 l1.4 2.2 2.5.5-1.8 1.9.3 2.6-2.4-1.1-2.4 1.1.3-2.6-1.8-1.9 2.5-.5z"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.2"
          />
        </>
      )}
    </Svg>
  );
}

function InfoItem({
  kind,
  title,
  children,
}: {
  kind: "date" | "time" | "screen" | "award";
  title: string;
  children: string;
}) {
  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 9 }}
    >
      <InfoIcon kind={kind} />
      <View style={{ marginLeft: 9, width: 114 }}>
        <Text
          style={{ fontFamily: "Helvetica-Bold", fontSize: 7.8, color: BLUE }}
        >
          {title}
        </Text>
        <Text
          style={{
            marginTop: 2,
            fontFamily: "Helvetica",
            fontSize: 7.8,
            lineHeight: 1.2,
            color: "#111111",
          }}
        >
          {children}
        </Text>
      </View>
    </View>
  );
}

function VerificationBadge({ url }: { url: string }) {
  const qr = createQrCode(url, { errorCorrectionLevel: "M" });
  const quietZone = 4;
  const viewBoxSize = qr.modules.size + quietZone * 2;
  const qrPath = Array.from(qr.modules.data).reduce((path, cell, index) => {
    if (!cell) return path;
    const x = (index % qr.modules.size) + quietZone;
    const y = Math.floor(index / qr.modules.size) + quietZone;
    return `${path}M${x} ${y}h1v1h-1z`;
  }, "");

  return (
    <View
      style={{
        position: "absolute",
        right: 34,
        bottom: 90,
        width: 78,
        padding: 4,
        paddingBottom: 3,
        borderWidth: 2,
        borderColor: NAVY,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        alignItems: "center",
      }}
    >
      <Svg width={68} height={68} viewBox={`0 0 ${viewBoxSize} ${viewBoxSize}`}>
        <Rect width={viewBoxSize} height={viewBoxSize} fill="#FFFFFF" />
        <Path d={qrPath} fill="#050505" />
      </Svg>
      <Text
        style={{
          marginTop: 2,
          fontFamily: "Helvetica-Bold",
          fontSize: 5.7,
          color: "#FFFFFF",
          backgroundColor: NAVY,
          width: 68,
          paddingVertical: 2,
          textAlign: "center",
        }}
      >
        VERIFICA TU CERTIFICADO
      </Text>
    </View>
  );
}

const dateFromParts = (data: CertificatePdf18Data) => {
  if (data.courseDateText || data.courseDates)
    return data.courseDateText || data.courseDates || "";
  if (data.courseDay || data.courseMonth || data.courseYear)
    return `${data.courseDay || "___"} de ${data.courseMonth || "__________"} de 20${data.courseYear || "__"}`;
  return "14 de agosto de 2026";
};

const getNameFontSize = (nameStr: string, triaje = false) => {
  const len = (nameStr || "").trim().length;
  if (triaje) {
    if (len > 50) return 14;
    if (len > 42) return 16;
    if (len > 35) return 18;
    if (len > 28) return 20;
    if (len > 23) return 22;
    return 24;
  }
  if (len > 50) return 16;
  if (len > 42) return 18;
  if (len > 35) return 21;
  if (len > 28) return 24;
  if (len > 23) return 27;
  return 30;
};

const issueDateFromParts = (data: CertificatePdf18Data) => {
  if (data.issueDateText) return data.issueDateText;
  const day = data.issueDay || "16";
  const rawMonth = data.issueMonth || "08";
  const monthNames: Record<string, string> = {
    "01": "enero",
    "1": "enero",
    "02": "febrero",
    "2": "febrero",
    "03": "marzo",
    "3": "marzo",
    "04": "abril",
    "4": "abril",
    "05": "mayo",
    "5": "mayo",
    "06": "junio",
    "6": "junio",
    "07": "julio",
    "7": "julio",
    "08": "agosto",
    "8": "agosto",
    "09": "septiembre",
    "9": "septiembre",
    "10": "octubre",
    "11": "noviembre",
    "12": "diciembre",
  };
  const month = monthNames[rawMonth.toLowerCase()] || rawMonth;
  const rawYear = data.issueYear || "26";
  const year = rawYear.length === 2 ? `20${rawYear}` : rawYear;
  return `Lima, ${day} de ${month} del ${year}`;
};

export function CertificatePdf18({ data }: { data: CertificatePdf18Data }) {
  const courseDate = dateFromParts(data);
  const code =
    data.certificateCode || data.idCertificado || "FMAS-2026-08-14-1027";
  const modality = data.modality || "Virtual";
  const coordinator =
    data.teacher2 || data.coordinatorName || "ZAMBRANO CRUZ MIGUEL";
  const website = data.website || "www.formasalud.org.pe";
  const ruc = data.ruc || "20613837613";
  const issueDateStr = issueDateFromParts(data);
  const nameText = data.name || "Nombres y Apellidos";
  const compactName = data.triajeCertificate && nameText.length > 30;
  const approvalCertificate = data.triajeCertificate || data.pancreatitisCertificate;
  const speakerCertificate = data.speakerCertificate;
  const nameFontSize = getNameFontSize(nameText, approvalCertificate || speakerCertificate);
  const logoImage = resolveAsset(data.logoImage);
  const secondaryLogoImage = resolveAsset(data.secondaryLogoImage);
  const sponsorLogoImage = resolveAsset(data.sponsorLogoImage);
  const sealImage = resolveAsset(data.sealImage);
  const awardSealImage = resolveAsset(data.awardSealImage || "/certificates/sellofms.png");
  const signatureLeftImage = resolveAsset(data.signatureLeftImage);
  const signatureRightImage = resolveAsset(data.signatureRightImage);
  const verificationUrl =
    data.verificationUrl ||
    `https://formasalud.org.pe/verificar/${encodeURIComponent(code)}`;

  return (
    <Document title={`Certificado Formasalud - ${data.name}`}>
      <Page size="A4" orientation="landscape" style={styles.page} wrap={false}>
        <View style={styles.background}>
          <Background />
        </View>
        {!data.triajeCertificate && !data.pancreatitisCertificate && <Image
          src={resolveAsset(
            data.backgroundImage || "/certificates/coche-paro-hospital.png",
          )}
          style={styles.courseBackground}
        />}
        {data.pancreatitisCertificate && <PancreasIllustration />}
        {logoImage && <Image src={logoImage} style={styles.watermark} />}
        {logoImage && <Image src={logoImage} style={styles.logoPrimary} />}
        {secondaryLogoImage && (
          <Image src={secondaryLogoImage} style={[styles.logoSecondary, data.triajeCertificate ? { right: 115, width: 90, height: 90 } : undefined]} />
        )}
        {approvalCertificate && sponsorLogoImage && (
          <Image src={sponsorLogoImage} style={styles.logoSponsor} />
        )}

        <View style={styles.header}>
          <Text style={styles.brand}>FORMASALUD</Text>
          <View style={styles.taglineRow}>
            <View style={styles.taglineLine} />
            <View style={styles.taglineDot} />
            <Text style={styles.tagline}>
              INNOVACIÓN Y DESARROLLO ACADÉMICO EN SALUD
            </Text>
            <View style={styles.taglineDot} />
            <View style={styles.taglineLine} />
          </View>
        </View>

        <Text
          style={{
            ...styles.eyebrow,
            position: "absolute",
            top: 107,
            left: 300,
            width: 242,
            textAlign: "center",
          }}
        >
          OTORGA EL PRESENTE
        </Text>
        <Text style={[styles.certificateTitle, data.triajeCertificate ? { top: 110 } : undefined]}>CERTIFICADO</Text>
        <View style={[styles.certificateSubtitle, data.triajeCertificate ? { top: 176 } : undefined]}>
          <Svg
            width={278}
            height={25}
            viewBox="0 0 278 25"
            style={{ position: "absolute" }}
          >
            <Path d="M0 0h278v25H0l15-12.5zM278 0l-15 12.5L278 25z" fill={BLUE} />
          </Svg>
          <Text
            style={{
              fontFamily: "Helvetica-Bold",
              fontSize: 14,
              letterSpacing: 1.5,
              color: "#FFFFFF",
              textAlign: "center",
            }}
          >
              {speakerCertificate ? "DE PONENCIA" : approvalCertificate ? "DE APROBACIÓN" : "DE PARTICIPACIÓN"}
          </Text>
        </View>
        <Text style={[styles.granted, data.triajeCertificate ? { top: 206 } : undefined]}>A:</Text>
        <Text
          style={[styles.name, { fontSize: nameFontSize }, data.triajeCertificate ? { top: 218 } : undefined,
            compactName ? { fontFamily: "Lora", fontStyle: "italic", fontSize: 20, left: 120, width: 602 } : undefined]}
          wrap={false}
          hyphenationCallback={(word) => [word]}
        >
          {nameText}
        </Text>
        <View style={[styles.nameRule, data.triajeCertificate ? { top: 258 } : undefined]} />
        <View style={[styles.nameDiamond, data.triajeCertificate ? { top: 254.6 } : undefined]} />

        <View
          style={{
            position: "absolute",
            left: 35,
            top: 294,
            width: 155,
            borderRightWidth: 0.7,
            borderRightColor: BLUE,
          }}
        >
          <InfoItem kind="date" title="FECHA DEL CURSO">
            {courseDate}
          </InfoItem>
          <InfoItem
            kind="time"
            title="DURACIÓN"
          >{`${data.hours || 4} ${data.hoursUnit || "horas académicas"}`}</InfoItem>
          <InfoItem
            kind="screen"
            title="MODALIDAD"
          >{`100% ${modality}`}</InfoItem>
          <InfoItem kind="award" title="CÓDIGO DE CERTIFICADO">
            {code}
          </InfoItem>
        </View>

        <View style={[styles.main, data.triajeCertificate ? { top: 272 } : undefined]}>
          <Text style={styles.preamble}>
            {speakerCertificate
              ? "En reconocimiento a su destacada labor como ponente internacional en el"
              : approvalCertificate
                ? "Por su participación y aprobación satisfactoria en el"
                : "Por su valiosa participación en el"}
          </Text>
          <View style={styles.coursePill}>
            <Text style={styles.coursePillText}>CURSO INTERNACIONAL:</Text>
          </View>
          <Text style={styles.course} hyphenationCallback={(word) => [word]}>
            {data.course ||
              "TALLER PRÁCTICO DE CÁLCULO Y ADMINISTRACIÓN DE DROGAS VASOACTIVAS EN ÁREAS CRÍTICAS: EMERGENCIAS Y UCI"}
          </Text>
          <Text style={styles.description}>
            {speakerCertificate
              ? `Por compartir sus conocimientos y experiencia profesional en el desarrollo del curso, realizado el ${courseDate}.\nOrganizado por FORMASALUD, con el auspicio de FisioUCI y Medical Service Perú.`
              : approvalCertificate
              ? `Desarrollado de manera virtual el ${courseDate}, con una duración de ${data.hours || 2} ${data.hoursUnit || "horas lectivas"}.\nOrganizado por FORMASALUD, con el auspicio de FisioUCI y Medical Service Perú.`
              : `Desarrollado el ${courseDate}, con una duración de ${data.hours || 4} horas académicas.\nSu compromiso y participación activa contribuyen al fortalecimiento del conocimiento y la práctica de la enfermería avanzada.`}
          </Text>
        </View>

        <View style={styles.signatures}>
          <View style={styles.signature}>
            <View style={styles.signatureImageBox}>
              {signatureLeftImage && (
                <Image src={signatureLeftImage} style={styles.signatureImage} />
              )}
            </View>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>
              {data.teacher1 || "FRANCISCO PAUCAR BENITES"}
            </Text>
            <Text style={styles.signatureRole}>
              GERENTE GENERAL{"\n"}FORMASALUD
            </Text>
          </View>
          <View style={styles.sealBox}>
            {sealImage && <Image src={sealImage} style={styles.seal} />}
          </View>
          <View style={styles.signature}>
            <View style={styles.signatureImageBox}>
              {signatureRightImage && (
                <Image
                  src={signatureRightImage}
                  style={styles.signatureImage}
                />
              )}
            </View>
            <View style={styles.signatureLine} />
            <Text style={styles.signatureName}>{coordinator}</Text>
            <Text style={styles.signatureRole}>
              COORDINADOR ACADÉMICO{"\n"}FORMASALUD
            </Text>
          </View>
        </View>

        <Image
          src={awardSealImage}
          style={{
            position: "absolute",
            right: 22,
            top: 245,
            width: 108,
            height: 108,
            objectFit: "contain",
          }}
        />
        <Text style={[styles.slogan, data.triajeCertificate || speakerCertificate ? { left: 301, right: undefined, bottom: 36, width: 240, textAlign: "center", transform: "rotate(0deg)" } : undefined]}>
          {speakerCertificate
            ? "Gracias por compartir\ntu experiencia"
            : data.pancreatitisCertificate
              ? "¡Te esperamos!"
              : "¡Juntos por una\nenfermería más segura!"}
        </Text>
        <VerificationBadge url={verificationUrl} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {`${issueDateStr}   •   FORMASALUD RUC: ${ruc}   •   `}
            <Text style={styles.footerLead}>Verificable en: </Text>
            <Text style={styles.footerLink}>{website}</Text>
          </Text>
        </View>
        {data.previewOnly && (
          <Text
            style={{
              position: "absolute",
              top: 284,
              left: 168,
              width: 505,
              textAlign: "center",
              fontFamily: "Helvetica-Bold",
              fontSize: 31,
              letterSpacing: 3,
              color: "#566174",
              opacity: 0.16,
              transform: "rotate(-23deg)",
            }}
          >
            VISTA PREVIA - SIN VALIDEZ
          </Text>
        )}
      </Page>
    </Document>
  );
}
