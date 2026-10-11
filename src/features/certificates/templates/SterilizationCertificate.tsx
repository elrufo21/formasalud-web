import { Circle, Document, Image as PdfImage, Line, Page, Path, Rect, Svg, Text, View } from "@react-pdf/renderer";
import { create as createQrCode } from "qrcode";
import { FormasaludCertificatePayload } from "../types";
import "../registerFonts";

const NAVY = "#073474";
const BLUE = "#0868AC";

// These modules describe the printed certificate only; they create no academic records.
export const STERILIZATION_MODULES = [
  { title: "FUNDAMENTOS DE\nBIOSEGURIDAD Y GESTIÓN\nDE LA CENTRAL DE\nESTERILIZACIÓN (RUMED)", hours: 20, icon: "shield" },
  { title: "LIMPIEZA AVANZADA\nY DESINFECCIÓN DE\nDISPOSITIVOS MÉDICOS", hours: 25, icon: "clean" },
  { title: "MÉTODOS DE ESTERILIZACIÓN\nY VALIDACIÓN DE PROCESOS", hours: 25, icon: "sterilize" },
  { title: "ALMACENAMIENTO,\nTRAZABILIDAD Y SEGURIDAD\nDEL PACIENTE", hours: 20, icon: "storage" },
] as const;

function asset(source: string) {
  if (/^(https?:|data:|file:)/.test(source)) return source;
  if (/^[A-Za-z]:[\\/]/.test(source)) return `file:///${source.replace(/\\/g, "/")}`;
  if (typeof window !== "undefined") return `${window.location.origin}${source}`;
  return `file:///${process.cwd().replace(/\\/g, "/")}/public${source}`;
}

function Icon({ kind, white = false }: { kind: string; white?: boolean }) {
  const ink = white ? "#FFFFFF" : NAVY;
  return (
    <Svg width={36} height={36} viewBox="0 0 40 40">
      {kind === "date" && <>
        <Rect x="6" y="8" width="28" height="27" rx="3" fill="none" stroke={ink} strokeWidth="2" />
        <Path d="M6 16h28M13 5v7M27 5v7M12 22h3M19 22h3M26 22h3M12 28h3M19 28h3M26 28h3" stroke={ink} strokeWidth="2" />
      </>}
      {kind === "time" && <>
        <Circle cx="20" cy="20" r="15" fill="none" stroke={ink} strokeWidth="2" />
        <Path d="M20 9v12l8 5" fill="none" stroke={ink} strokeWidth="2" />
      </>}
      {kind === "screen" && <>
        <Rect x="4" y="7" width="32" height="23" rx="2" fill="none" stroke={ink} strokeWidth="2" />
        <Path d="M20 30v6M12 36h16" stroke={ink} strokeWidth="2" />
      </>}
      {kind === "award" && <>
        <Circle cx="20" cy="15" r="10" fill="none" stroke={ink} strokeWidth="2" />
        <Path d="M13 23l-3 13 10-6 10 6-3-13M20 8l2 4 5 1-3 4v5l-4-2-4 2v-5l-3-4 5-1z" fill="none" stroke={ink} strokeWidth="1.6" />
      </>}
      {kind === "shield" && <>
        <Path d="M5 5l15-3 15 3v14c0 9-8 15-15 19C13 34 5 28 5 19z" fill="none" stroke={ink} strokeWidth="2" />
        <Circle cx="20" cy="20" r="4" fill="none" stroke={ink} strokeWidth="2" />
        <Path d="M18 15C8 15 10 7 15 9M24 18c5-8 12-3 8 2M19 25c4 9-5 13-7 7M16 20l-5 4M22 16l1-6M24 23l5 4" fill="none" stroke={ink} strokeWidth="2" />
      </>}
      {kind === "clean" && <>
        <Path d="M9 4h14v4H9zM12 8v8L7 25v12h19V25l-6-9V8M18 8h12l3 6M8 26h17M32 20v7M28 23h8M32 31v6M29 34h6" fill="none" stroke={ink} strokeWidth="2" />
      </>}
      {kind === "sterilize" && <>
        <Rect x="3" y="5" width="34" height="32" rx="3" fill="none" stroke={ink} strokeWidth="2" />
        <Circle cx="17" cy="21" r="11" fill="none" stroke={ink} strokeWidth="2" />
        <Path d="M12 14c-5 5 5 7 0 13M18 14c-5 5 5 7 0 13M23 14c-5 5 5 7 0 13M31 11h3M31 17h3M31 23h3M30 3v-2M36 3v-2" fill="none" stroke={ink} strokeWidth="1.7" />
        <Circle cx="32" cy="31" r="2" fill="none" stroke={ink} strokeWidth="1.6" />
      </>}
      {kind === "storage" && <>
        <Path d="M6 9l4-6h22l4 6v27H6zM6 10h30M16 4v5h10V4M28 19v13M32 19v13M36 19v13M39 19v13" fill="none" stroke={ink} strokeWidth="2" />
        <Circle cx="19" cy="23" r="7" fill={BLUE} />
        <Path d="M15 23l3 3 5-6" fill="none" stroke="#FFFFFF" strokeWidth="2" />
      </>}
    </Svg>
  );
}

function Info({ top, kind, title, text }: { top: number; kind: string; title: string; text: string }) {
  return <View style={{ position: "absolute", top, left: 27, flexDirection: "row", alignItems: "center", width: 166 }}>
    <View style={{ width: 43, height: 43, borderRadius: 22, backgroundColor: NAVY, borderWidth: 1.5, borderColor: "#169CE1", alignItems: "center", justifyContent: "center" }}>
      <Icon kind={kind} white />
    </View>
    <View style={{ width: 116, marginLeft: 9 }}>
      <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 8.4, color: BLUE }}>{title}</Text>
      <Text style={{ marginTop: 3, fontFamily: "Helvetica", fontSize: 9.3, lineHeight: 1.18, color: NAVY }}>{text}</Text>
    </View>
  </View>;
}

function Qr({ url, preview }: { url: string; preview?: boolean }) {
  const qr = createQrCode(url, { errorCorrectionLevel: "M" });
  const size = qr.modules.size + 8;
  const path = Array.from(qr.modules.data).reduce((result, cell, i) => cell
    ? `${result}M${i % qr.modules.size + 4} ${Math.floor(i / qr.modules.size) + 4}h1v1h-1z`
    : result, "");
  return <View style={{ position: "absolute", left: 786, top: 389, width: 89, alignItems: "center" }}>
    <View style={{ borderWidth: 2, borderRadius: 7, borderColor: BLUE, padding: 3, backgroundColor: "#FFFFFF" }}>
      <Svg width={79} height={79} viewBox={`0 0 ${size} ${size}`}>
        <Rect width={size} height={size} fill="#FFFFFF" />
        <Path d={path} fill="#000000" />
      </Svg>
    </View>
    <Text style={{ width: 89, marginTop: 3, paddingVertical: 4, borderRadius: 4, backgroundColor: NAVY, color: "#FFFFFF", fontFamily: "Helvetica-Bold", fontSize: 6.7, textAlign: "center" }}>
      {preview ? "QR DE MUESTRA\nModelo sin emisión" : "Verifica la autenticidad\nde tu certificado"}
    </Text>
  </View>;
}

export function SterilizationCertificate({ data }: { data: FormasaludCertificatePayload }) {
  const preview = data.previewOnly;
  const displayName = data.studentName === "Nombre del participante" ? data.studentName : data.studentName.toLocaleLowerCase("es-PE").replace(/(^|[\s.])([a-záéíóúñ])/g, (_, separator: string, letter: string) => separator + letter.toLocaleUpperCase("es-PE"));
  const nameSize = displayName.length > 45 ? 26 : displayName.length > 32 ? 32 : displayName.length > 26 ? 36 : 42;
  return <Document title="Certificado - Esterilización y Desinfección" author="FormaSalud" subject={preview ? "Modelo de certificado sin emisión" : "Certificado de aprobación"}>
    <Page size={[900, 600]} wrap={false} style={{ position: "relative", minHeight: 600, backgroundColor: "#F9FDFF", color: NAVY, fontFamily: "Helvetica" }}>
      <PdfImage src={asset(data.backgroundUrl || "/certificates/esterilizacion-fondo.png")} style={{ position: "absolute", left: 0, top: 0, width: 900, height: 600 }} />
      <PdfImage src={asset(data.logoLeftUrl || "/certificates/logofms.png")} style={{ position: "absolute", left: 164, top: 18, width: 88, height: 88, objectFit: "contain" }} />
      <Text style={{ position: "absolute", left: 264, top: 25, width: 344, fontFamily: "Helvetica-Bold", fontSize: 46, letterSpacing: 0.5 }}>FORMASALUD</Text>
      <Text style={{ position: "absolute", left: 270, top: 79, width: 340, fontFamily: "Helvetica-Oblique", fontSize: 12.1, color: "#07518D" }}>Innovación y Desarrollo Académico en Salud</Text>
      <View style={{ position: "absolute", left: 182, top: 101, width: 423, height: 0.7, backgroundColor: BLUE }} />
      <View style={{ position: "absolute", left: 622, top: 25, height: 72, width: 0.7, backgroundColor: BLUE }} />
      <PdfImage src={asset(data.logoRightUrl || "/certificates/fisiouci.png")} style={{ position: "absolute", left: 638, top: 24, width: 85, height: 78, objectFit: "contain" }} />
      <View style={{ position: "absolute", left: 737, top: 25, height: 72, width: 0.7, backgroundColor: BLUE }} />
      <PdfImage src={asset(data.sponsorLogoUrl || "/certificates/ausp.png")} style={{ position: "absolute", left: 753, top: 20, width: 88, height: 88, objectFit: "contain" }} />
      <Text style={{ position: "absolute", top: 96, left: 231, width: 478, fontFamily: "Playfair", fontWeight: 700, fontSize: 50, letterSpacing: 1.2, textAlign: "center" }}>CERTIFICADO</Text>
      <Text style={{ position: "absolute", top: 160, left: 217, width: 484, fontFamily: "Helvetica-Bold", fontSize: 15, letterSpacing: 2, textAlign: "center" }}>OTORGADO A:</Text>
      <Text style={{ position: "absolute", top: 174, left: 215, width: 485, fontFamily: "GreatVibes", fontSize: nameSize, textAlign: "center" }} hyphenationCallback={word => [word]}>{displayName}</Text>
      <View style={{ position: "absolute", top: 218, left: 215, width: 484, height: 0.7, backgroundColor: NAVY }} />
      <View style={{ position: "absolute", left: 196, top: 157, width: 0.8, height: 178, backgroundColor: NAVY }} />
      <Info top={148} kind="date" title="FECHA DEL CURSO" text={data.courseDateText || "Del 06 de mayo al\n15 de junio de 2026"} />
      <Info top={199} kind="time" title="DURACIÓN TOTAL" text={`${data.hours || 90} horas académicas`} />
      <Info top={250} kind="screen" title="MODALIDAD" text={data.modality || "Semipresencial\n(virtual + presencial)"} />
      <Info top={301} kind="award" title="CÓDIGO DE CERTIFICADO" text={data.certificateCode} />
      <Text style={{ position: "absolute", left: 216, top: 224, width: 484, fontSize: 12, fontFamily: "Helvetica-Bold", color: "#07518D", textAlign: "center" }}>Por su participación y aprobación satisfactoria en el</Text>
      <View style={{ position: "absolute", left: 320, top: 244, width: 275, borderRadius: 12, backgroundColor: BLUE, paddingVertical: 3 }}>
        <Text style={{ textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 13, color: "#FFFFFF" }}>CURSO DE ACTUALIZACIÓN EN</Text>
      </View>
      <Text style={{ position: "absolute", left: 212, top: 265, width: 510, fontSize: 28, fontFamily: "Helvetica-Bold", textAlign: "center" }}>{data.courseTitle}</Text>
      <Text style={{ position: "absolute", left: 215, top: 300, width: 490, fontSize: 11.5, textAlign: "center", color: "#07518D" }}>Desarrollado de manera semipresencial con una duración total de</Text>
      <View style={{ position: "absolute", left: 346, top: 315, width: 224, borderRadius: 12, backgroundColor: BLUE, paddingVertical: 2 }}>
        <Text style={{ textAlign: "center", fontFamily: "Helvetica-Bold", fontSize: 13, color: "#FFFFFF" }}>{data.hours || 90} HORAS ACADÉMICAS</Text>
      </View>
      {STERILIZATION_MODULES.map((module, i) => <View key={module.icon} style={{ position: "absolute", left: 106 + i * 161, top: 352, width: 154, height: 114, borderWidth: 0.7, borderColor: "#69B7E0", borderRadius: 8, backgroundColor: "#EDF8FF" }}>
        <View style={{ position: "absolute", left: 28, top: -7, width: 99, borderRadius: 10, backgroundColor: BLUE, paddingVertical: 3 }}>
          <Text style={{ textAlign: "center", color: "#FFFFFF", fontFamily: "Helvetica-Bold", fontSize: 10.5 }}>MÓDULO {i + 1}</Text>
        </View>
        <View style={{ position: "absolute", left: 59, top: 16 }}><Icon kind={module.icon} /></View>
        <View style={{ position: "absolute", top: 54, left: 5, width: 144, height: 38, justifyContent: "center" }}>
          <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 8.5, lineHeight: 1.08, textAlign: "center" }}>{module.title}</Text>
        </View>
        <View style={{ position: "absolute", bottom: 1, left: 1, width: 151, borderRadius: 8, backgroundColor: BLUE, paddingVertical: 5 }}>
          <Text style={{ color: "#FFFFFF", fontFamily: "Helvetica-Bold", fontSize: 7.4, textAlign: "center" }}>DURACIÓN: {module.hours} HORAS ACADÉMICAS</Text>
        </View>
      </View>)}
      <Text style={{ position: "absolute", top: 469, left: 291, width: 410, fontFamily: "GreatVibes", fontSize: 23, textAlign: "center" }}>Juntos por una enfermería más preparada</Text>
      <PdfImage src={asset(data.signatureLeftUrl || "/certificates/fra.png")} style={{ position: "absolute", left: 185, top: 459, width: 154, height: 110, objectFit: "contain" }} />
      <PdfImage src={asset(data.signatureRightUrl || "/certificates/firmaMiguel.png")} style={{ position: "absolute", left: 549, top: 476, width: 148, height: 86, objectFit: "contain" }} />
      <Svg width={550} height={1} style={{ position: "absolute", left: 159, top: 540 }}><Line x1="0" y1="0" x2="190" y2="0" stroke={BLUE} strokeWidth="1" /><Line x1="375" y1="0" x2="550" y2="0" stroke={BLUE} strokeWidth="1" /></Svg>
      <Text style={{ position: "absolute", left: 159, top: 546, width: 190, fontFamily: "Helvetica-Bold", fontSize: 9.5, textAlign: "center" }}>{data.academicDirector || "FRANCISCO PAUCAR BENITES"}</Text>
      <Text style={{ position: "absolute", left: 159, top: 559, width: 190, fontSize: 8.5, lineHeight: 1.3, textAlign: "center" }}>DIRECTOR ACADÉMICO{"\n"}FORMASALUD</Text>
      <PdfImage src={asset(data.sealUrl || "/certificates/cello.png")} style={{ position: "absolute", left: 394, top: 493, width: 95, height: 83, objectFit: "contain" }} />
      <Text style={{ position: "absolute", left: 526, top: 546, width: 191, fontFamily: "Helvetica-Bold", fontSize: 9.3, textAlign: "center" }}>{data.coordinatorName || "LIC. ZAMBRANO CRUZ MIGUEL"}</Text>
      <Text style={{ position: "absolute", left: 526, top: 559, width: 191, fontSize: 8.5, lineHeight: 1.3, textAlign: "center" }}>COORDINADOR ACADÉMICO{"\n"}FORMASALUD</Text>
      <Qr url={data.verificationUrl || `https://formasalud.org.pe/verificar/${encodeURIComponent(data.certificateCode)}`} preview={preview} />
      <Text style={{ position: "absolute", left: 35, top: 576, fontSize: 8.2 }}>Lima, {data.issueDateText || "16 de junio de 2026"}</Text>
      <Text style={{ position: "absolute", left: 724, top: 557, width: 148, fontFamily: "Helvetica-Bold", fontSize: 7.8, textAlign: "center", lineHeight: 1.6 }}>FORMASALUD | RUC: 20613837613{"\n"}www.formasalud.org.pe</Text>
      {preview && <Text style={{ position: "absolute", left: 328, top: 577, width: 256, textAlign: "center", fontSize: 5.7, color: BLUE }}>MODELO DE CERTIFICADO · SIN EMISIÓN A UN PARTICIPANTE</Text>}
    </Page>
  </Document>;
}
