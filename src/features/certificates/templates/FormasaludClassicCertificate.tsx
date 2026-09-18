import {
  Circle,
  Defs,
  Document,
  Image,
  LinearGradient,
  Page,
  Path,
  Rect,
  Stop,
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
  teacher1?: string;
  teacher2?: string;
  idCertificado?: string;
  certificateCode?: string;
  coordinatorName?: string;
  sealImage?: string;
  signatureLeftImage?: string;
  signatureRightImage?: string;
  logoImage?: string;
  secondaryLogoImage?: string;
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
const BLUE = "#073D92";
const TEAL = "#056878";
const GOLD = "#C99725";
const GOLD_LIGHT = "#F6D66C";
const PAPER = "#FFFDF8";

const resolveAsset = (source?: string) => {
  if (!source || source.startsWith("http") || source.startsWith("data:")) {
    return source;
  }
  if (/^[A-Za-z]:[\\/]/.test(source)) return source;

  const publicPath = source.startsWith("/") ? source : `/${source}`;
  return typeof window === "undefined"
    ? `${process.cwd().replace(/\\/g, "/")}/public${publicPath}`
    : `${window.location.origin}${publicPath}`;
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
    opacity: 0.32,
  },
  logoPrimary: {
    position: "absolute",
    top: 42,
    left: 69,
    width: 126,
    height: 126,
    objectFit: "contain",
  },
  logoSecondary: {
    position: "absolute",
    top: 47,
    right: 67,
    width: 92,
    height: 92,
    objectFit: "contain",
  },
  watermark: {
    position: "absolute",
    left: 292,
    top: 188,
    width: 258,
    height: 258,
    objectFit: "contain",
    opacity: 0.045,
  },
  header: {
    position: "absolute",
    top: 45,
    left: 208,
    width: 428,
    alignItems: "center",
  },
  eyebrow: {
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 13.5,
    color: NAVY,
  },
  brand: {
    marginTop: 1,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 35,
    color: TEAL,
    letterSpacing: 2.2,
  },
  taglineRow: {
    marginTop: 3,
    flexDirection: "row",
    alignItems: "center",
  },
  taglineLine: { width: 88, height: 0.8, backgroundColor: GOLD },
  taglineDot: {
    width: 5,
    height: 5,
    backgroundColor: GOLD,
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
    top: 128,
    left: 190,
    width: 474,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 41,
    letterSpacing: 7.8,
    color: NAVY,
    textAlign: "center",
  },
  certificateSubtitle: {
    position: "absolute",
    top: 171,
    left: 190,
    width: 474,
    fontFamily: "Playfair",
    fontWeight: 700,
    fontSize: 15,
    letterSpacing: 1.5,
    color: NAVY,
    textAlign: "center",
  },
  granted: {
    position: "absolute",
    top: 193,
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
    top: 209,
    left: 40,
    width: W - 80,
    fontFamily: "Lora",
    fontStyle: "italic",
    fontSize: 30,
    color: NAVY,
    textAlign: "center",
  },
  nameRule: {
    position: "absolute",
    top: 252,
    left: 212,
    width: 428,
    height: 0.8,
    backgroundColor: GOLD,
  },
  nameDiamond: {
    position: "absolute",
    top: 248.6,
    left: W / 2 - 3.8,
    width: 7.6,
    height: 7.6,
    backgroundColor: GOLD,
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
    left: 44,
    bottom: 70,
    width: 137,
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
      <Defs>
        <LinearGradient id="gold18" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#8B5A05" />
          <Stop offset="32%" stopColor={GOLD_LIGHT} />
          <Stop offset="57%" stopColor="#B47B10" />
          <Stop offset="100%" stopColor="#FFE68C" />
        </LinearGradient>
        <LinearGradient id="navy18" x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0%" stopColor="#08728E" />
          <Stop offset="50%" stopColor="#003968" />
          <Stop offset="100%" stopColor="#001337" />
        </LinearGradient>
      </Defs>
      <Rect x="0" y="0" width={W} height={H} fill={PAPER} />
      <Rect
        x="24"
        y="24"
        width={W - 48}
        height={H - 48}
        fill="none"
        stroke={GOLD}
        strokeWidth="1.2"
      />
      <Rect
        x="28"
        y="28"
        width={W - 56}
        height={H - 56}
        fill="none"
        stroke={GOLD}
        strokeWidth="0.45"
      />

      <Path
        d="M0 0 H190 C135 17 85 48 48 94 C27 120 13 153 0 180 Z"
        fill="url(#navy18)"
      />
      <Path d="M0 0 H82 C55 27 30 62 0 111 Z" fill="#075E7B" />
      <Path
        d="M76 0 H204 C143 17 91 49 49 101 C31 123 14 145 0 159 L0 130 C23 90 47 48 76 0 Z"
        fill="url(#gold18)"
      />
      <Path
        d="M0 117 C36 65 73 26 121 0 H135 C87 33 48 78 0 143 Z"
        fill="#001F50"
      />
      <Path
        d="M0 130 C39 75 81 31 132 0 H138 C87 37 44 84 0 143 Z"
        fill={GOLD_LIGHT}
        opacity="0.9"
      />

      <Path
        d={`M${W} ${H} H${W - 208} C${W - 144} ${H - 16} ${W - 88} ${H - 52} ${W - 49} ${H - 101} C${W - 27} ${H - 129} ${W - 13} ${H - 159} ${W} ${H - 190} Z`}
        fill="url(#navy18)"
      />
      <Path
        d={`M${W} ${H} H${W - 112} C${W - 72} ${H - 27} ${W - 33} ${H - 67} ${W} ${H - 115} Z`}
        fill="#075E7B"
      />
      <Path
        d={`M${W - 79} ${H} H${W - 218} C${W - 153} ${H - 17} ${W - 96} ${H - 53} ${W - 53} ${H - 107} C${W - 32} ${H - 133} ${W - 15} ${H - 155} ${W} ${H - 170} V${H - 135} C${W - 22} ${H - 91} ${W - 48} ${H - 45} ${W - 79} ${H} Z`}
        fill="url(#gold18)"
      />
      <Path
        d={`M${W} ${H - 135} C${W - 31} ${H - 83} ${W - 72} ${H - 33} ${W - 126} ${H} H${W - 140} C${W - 86} ${H - 39} ${W - 41} ${H - 86} ${W} ${H - 153} Z`}
        fill="#001F50"
      />
      <Path
        d={`M${W} ${H - 144} C${W - 36} ${H - 84} ${W - 82} ${H - 31} ${W - 139} ${H}`}
        fill="none"
        stroke={GOLD_LIGHT}
        strokeWidth="2.2"
      />
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
        right: 61,
        bottom: 43,
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

const getNameFontSize = (nameStr: string) => {
  const len = (nameStr || "").trim().length;
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
  const website = data.website || "www.formasalud.pe";
  const ruc = data.ruc || "20613837613";
  const issueDateStr = issueDateFromParts(data);
  const nameText = data.name || "Nombres y Apellidos";
  const nameFontSize = getNameFontSize(nameText);
  const logoImage = resolveAsset(data.logoImage);
  const secondaryLogoImage = resolveAsset(data.secondaryLogoImage);
  const sealImage = resolveAsset(data.sealImage);
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
        <Image
          src={resolveAsset(
            data.backgroundImage || "/certificates/coche-paro-hospital.png",
          )}
          style={styles.courseBackground}
        />
        {logoImage && <Image src={logoImage} style={styles.watermark} />}
        {logoImage && <Image src={logoImage} style={styles.logoPrimary} />}
        {secondaryLogoImage && (
          <Image src={secondaryLogoImage} style={styles.logoSecondary} />
        )}

        <View style={styles.header}>
          <Text style={styles.eyebrow}>
            CENTRO DE FORMACIÓN E INNOVACIÓN EN SALUD
          </Text>
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

        <Text style={styles.certificateTitle}>CERTIFICADO</Text>
        <Text style={styles.certificateSubtitle}>DE PARTICIPACIÓN</Text>
        <Text style={styles.granted}>Otorgado a:</Text>
        <Text
          style={[styles.name, { fontSize: nameFontSize }]}
          wrap={false}
          hyphenationCallback={(word) => [word]}
        >
          LIC. {nameText}
        </Text>
        <View style={styles.nameRule} />
        <View style={styles.nameDiamond} />

        <View
          style={{
            position: "absolute",
            left: 35,
            top: 294,
            width: 155,
            borderRightWidth: 0.7,
            borderRightColor: GOLD,
          }}
        >
          <InfoItem kind="date" title="FECHA DEL CURSO">
            {courseDate}
          </InfoItem>
          <InfoItem
            kind="time"
            title="DURACIÓN"
          >{`${data.hours || 4} horas académicas`}</InfoItem>
          <InfoItem
            kind="screen"
            title="MODALIDAD"
          >{`100% ${modality}`}</InfoItem>
          <InfoItem kind="award" title="CÓDIGO DE CERTIFICADO">
            {code}
          </InfoItem>
        </View>

        <View style={styles.main}>
          <Text style={styles.preamble}>
            Por su participación y aprobación en el
          </Text>
          <View style={styles.coursePill}>
            <Text style={styles.coursePillText}>CURSO TALLER:</Text>
          </View>
          <Text style={styles.course} hyphenationCallback={(word) => [word]}>
            {data.course ||
              "TALLER PRÁCTICO DE CÁLCULO Y ADMINISTRACIÓN DE DROGAS VASOACTIVAS EN ÁREAS CRÍTICAS: EMERGENCIAS Y UCI"}
          </Text>
          <Text style={styles.description}>
            Desarrollado el {courseDate}, con una duración de {data.hours || 4}{" "}
            horas académicas.{"\n"}Su compromiso y participación activa
            contribuyen al fortalecimiento del conocimiento y la práctica en la
            atención de emergencias.
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

        <Text style={styles.slogan}>
          ¡Juntos por una{"\n"}enfermería más segura!
        </Text>
        <VerificationBadge url={verificationUrl} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            {`${issueDateStr}   •   FORMASALUD RUC: ${ruc}   •   `}
            <Text style={styles.footerLead}>Verificable en: </Text>
            <Text style={styles.footerLink}>{website}</Text>
          </Text>
        </View>
      </Page>
    </Document>
  );
}
