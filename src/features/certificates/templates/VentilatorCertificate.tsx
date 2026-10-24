import { Document, Image as PdfImage, Page, Path, Rect, Svg, Text, View } from "@react-pdf/renderer";
import { create as createQrCode } from "qrcode";
import { FormasaludCertificatePayload } from "../types";
import "../registerFonts";

const NAVY = "#072B62";
const BLUE = "#0879C5";

function asset(source: string) {
  if (/^(https?:|data:|file:)/.test(source)) return source;
  if (typeof window !== "undefined") return `${window.location.origin}${source}`;
  return `file:///${process.cwd().replace(/\\/g, "/")}/public${source}`;
}

export function VentilatorCertificate({ data }: { data: FormasaludCertificatePayload }) {
  const qr = createQrCode(data.verificationUrl || `https://formasalud.org.pe/verificar/${encodeURIComponent(data.certificateCode)}`, { errorCorrectionLevel: "M" });
  const qrSize = qr.modules.size + 8;
  const qrPath = Array.from(qr.modules.data).reduce((result, cell, i) => cell
    ? `${result}M${i % qr.modules.size + 4} ${Math.floor(i / qr.modules.size) + 4}h1v1h-1z` : result, "");
  const displayName = data.studentName.toLocaleLowerCase("es-PE").replace(/(^|[\s.])([a-záéíóúñ])/g, (_, space: string, letter: string) => space + letter.toLocaleUpperCase("es-PE"));
  return <Document title={`Certificado - ${data.studentName}`} author="FORMASALUD" subject={data.courseTitle}>
    <Page size={[900, 600]} wrap={false} style={{ position: "relative", minHeight: 600, backgroundColor: "#FCFEFF", color: NAVY, fontFamily: "Helvetica" }}>
      <Svg width={900} height={600} style={{ position: "absolute", left: 0, top: 0 }}>
        <Rect x="12" y="12" width="876" height="576" rx="14" fill="none" stroke={BLUE} strokeWidth="2" />
        <Rect x="18" y="18" width="864" height="564" rx="10" fill="none" stroke="#9CD5ED" strokeWidth="0.7" />
        <Rect x="23" y="23" width="854" height="554" rx="7" fill="none" stroke="#D7B96A" strokeWidth="0.35" />
        <Path d="M640 0H900V124C851 56 754 27 640 0Z" fill={NAVY} />
        <Path d="M716 0H900V94C857 45 793 24 716 0Z" fill={BLUE} />
        <Path d="M780 0H900V64C869 31 830 13 780 0Z" fill="#58C6EB" />
        <Path d="M0 450C49 524 130 555 285 600H0Z" fill="#E2F4FC" />
        <Path d="M0 501C65 555 135 571 222 600H0Z" fill={BLUE} />
        <Path d="M0 543C50 574 91 587 141 600H0Z" fill={NAVY} />
        <Path d="M32 143H868M32 551H868" stroke="#B1D9ED" strokeWidth="0.6" />
        <Path d="M35 157l16-9 16 9v18l-16 9-16-9zM67 175l16-9 16 9v18l-16 9-16-9zM35 193l16-9 16 9v18l-16 9-16-9zM67 428l16-9 16 9v18l-16 9-16-9zM99 446l16-9 16 9v18l-16 9-16-9zM35 446l16-9 16 9v18l-16 9-16-9zM67 464l16-9 16 9v18l-16 9-16-9zM793 157l16-9 16 9v18l-16 9-16-9zM825 175l16-9 16 9v18l-16 9-16-9zM793 193l16-9 16 9v18l-16 9-16-9zM825 499l16-9 16 9v18l-16 9-16-9zM793 517l16-9 16 9v18l-16 9-16-9z" fill="#E8F5FC" stroke="#C9E6F4" strokeWidth="0.6" />
        <Path d="M174 173h45M681 173h45M224 173l4-4 4 4-4 4zM668 173l4-4 4 4-4 4zM177 115h416" fill="none" stroke="#C9A44A" strokeWidth="0.8" />
        <Path d="M27 490C68 526 105 540 157 546M650 23C739 42 818 76 875 129" fill="none" stroke="#83CDEB" strokeWidth="0.65" />
      </Svg>
      <PdfImage src={asset(data.logoLeftUrl || "/certificates/logofms.png")} style={{ position: "absolute", left: 282, top: 159, width: 336, height: 336, objectFit: "contain", opacity: 0.065 }} />
      <PdfImage src={asset(data.backgroundUrl || "/certificates/ventilador-mecanico.png")} style={{ position: "absolute", left: 736, top: 326, width: 137, height: 213, objectFit: "contain", opacity: 0.65 }} />

      <PdfImage src={asset(data.logoLeftUrl || "/certificates/logofms.png")} style={{ position: "absolute", left: 50, top: 28, width: 100, height: 100, objectFit: "contain" }} />
      <Text style={{ position: "absolute", left: 174, top: 43, width: 430, fontFamily: "Helvetica-Bold", fontSize: 46, letterSpacing: 0.4 }}>FORMASALUD</Text>
      <Text style={{ position: "absolute", left: 177, top: 96, fontFamily: "Helvetica-Oblique", fontSize: 13, color: BLUE }}>Innovación y Desarrollo Académico en Salud</Text>
      <View style={{ position: "absolute", left: 629, top: 43, width: 1, height: 82, backgroundColor: "#B1D9ED" }} />
      <PdfImage src={asset(data.logoRightUrl || "/certificates/fisiouci.png")} style={{ position: "absolute", left: 647, top: 44, width: 85, height: 79, objectFit: "contain" }} />
      <PdfImage src={asset(data.sponsorLogoUrl || "/certificates/ausp.png")} style={{ position: "absolute", left: 753, top: 39, width: 88, height: 88, objectFit: "contain" }} />

      <Text style={{ position: "absolute", left: 165, top: 143, width: 570, fontFamily: "Playfair", fontWeight: 700, fontSize: 49, letterSpacing: 2, textAlign: "center" }}>CERTIFICADO</Text>
      <Text style={{ position: "absolute", left: 171, top: 207, width: 558, fontSize: 10, fontFamily: "Helvetica-Bold", letterSpacing: 3.5, textAlign: "center", color: BLUE }}>OTORGADO A</Text>
      <Text style={{ position: "absolute", left: 171, top: 230, width: 558, fontFamily: "GreatVibes", fontSize: displayName.length > 36 ? 33 : 38, textAlign: "center" }} hyphenationCallback={word => [word]}>{displayName}</Text>
      <View style={{ position: "absolute", left: 183, top: 276, width: 534, height: 0.7, backgroundColor: BLUE }} />
      <Text style={{ position: "absolute", left: 170, top: 289, width: 560, fontSize: 11.4, textAlign: "center" }}>Por su participación{data.certificateType === "approval" ? " y aprobación satisfactoria" : ""} en el</Text>
      <View style={{ position: "absolute", left: 336, top: 311, width: 228, borderRadius: 12, backgroundColor: NAVY, paddingVertical: 5 }}>
        <Text style={{ fontFamily: "Helvetica-Bold", fontSize: 10.5, color: "#FFFFFF", textAlign: "center", letterSpacing: 1.2 }}>CURSO-TALLER PRESENCIAL</Text>
      </View>
      <Text style={{ position: "absolute", left: 166, top: 341, width: 568, fontFamily: "Helvetica-Bold", fontSize: 25, lineHeight: 1.15, textAlign: "center" }}>{data.courseTitle}</Text>
      <Text style={{ position: "absolute", left: 177, top: 416, width: 546, fontSize: 11.2, lineHeight: 1.5, textAlign: "center", color: "#24547C" }}>Desarrollado de manera presencial el {data.courseDateText || "21 de octubre de 2026"},{"\n"}con una duración de {data.hours || 4} horas lectivas. Organizado por FORMASALUD.</Text>

      <View style={{ position: "absolute", left: 39, top: 203, width: 115, height: 216, backgroundColor: "#EFF8FD", borderRadius: 9, borderLeftWidth: 3, borderLeftColor: BLUE, padding: 10 }}>
        <Text style={{ fontSize: 7.7, fontFamily: "Helvetica-Bold", color: BLUE }}>FECHA DEL CURSO</Text>
        <Text style={{ marginTop: 5, fontSize: 10, lineHeight: 1.3 }}>{data.courseDateText || "21 de octubre de 2026"}</Text>
        <Text style={{ marginTop: 18, fontSize: 7.7, fontFamily: "Helvetica-Bold", color: BLUE }}>DURACIÓN</Text>
        <Text style={{ marginTop: 5, fontSize: 10 }}>{data.hours || 4} horas lectivas</Text>
        <Text style={{ marginTop: 18, fontSize: 7.7, fontFamily: "Helvetica-Bold", color: BLUE }}>MODALIDAD</Text>
        <Text style={{ marginTop: 5, fontSize: 10 }}>100 % presencial</Text>
        <Text style={{ marginTop: 18, fontSize: 7.7, fontFamily: "Helvetica-Bold", color: BLUE }}>CÓDIGO</Text>
        <Text style={{ marginTop: 5, fontSize: 9.4 }}>{data.certificateCode}</Text>
      </View>

      <View style={{ position: "absolute", left: 748, top: 166, width: 111, alignItems: "center" }}>
        <View style={{ padding: 3, backgroundColor: "#FFFFFF", borderWidth: 1.5, borderColor: BLUE, borderRadius: 8 }}>
          <Svg width={103} height={103} viewBox={`0 0 ${qrSize} ${qrSize}`}><Rect width={qrSize} height={qrSize} fill="#FFFFFF" /><Path d={qrPath} fill="#000000" /></Svg>
        </View>
        <Text style={{ width: 111, backgroundColor: NAVY, color: "#FFFFFF", borderRadius: 5, paddingVertical: 7, marginTop: 6, fontFamily: "Helvetica-Bold", textAlign: "center", fontSize: 7.8, lineHeight: 1.3 }}>{data.previewOnly ? "MODELO SIN EMISIÓN" : "Verifica la autenticidad\nde tu certificado"}</Text>
      </View>
      <PdfImage src={asset(data.signatureLeftUrl || "/certificates/fra.png")} style={{ position: "absolute", left: 218, top: 444, width: 162, height: 73, objectFit: "contain" }} />
      <PdfImage src={asset(data.signatureRightUrl || "/certificates/firmaMiguel.png")} style={{ position: "absolute", left: 538, top: 444, width: 162, height: 73, objectFit: "contain" }} />
      <View style={{ position: "absolute", left: 202, top: 510, width: 205, height: 0.7, backgroundColor: "#C9A44A" }} />
      <View style={{ position: "absolute", left: 518, top: 510, width: 205, height: 0.7, backgroundColor: "#C9A44A" }} />
      <Text style={{ position: "absolute", left: 196, top: 516, width: 215, fontFamily: "Times-Bold", fontSize: 10, textAlign: "center" }}>Lic. Francisco Paucar Benites</Text>
      <Text style={{ position: "absolute", left: 199, top: 529, width: 210, fontFamily: "Times-Bold", fontSize: 7.8, lineHeight: 1.25, textAlign: "center" }}>DIRECTOR ACADÉMICO{"\n"}FORMASALUD</Text>
      <PdfImage src={asset(data.sealUrl || "/certificates/cello.png")} style={{ position: "absolute", left: 422, top: 463, width: 78, height: 78, objectFit: "contain" }} />
      <Text style={{ position: "absolute", left: 510, top: 516, width: 221, fontFamily: "Times-Bold", fontSize: 10, textAlign: "center" }}>Lic. Zambrano Cruz Miguel</Text>
      <Text style={{ position: "absolute", left: 516, top: 529, width: 210, fontFamily: "Times-Bold", fontSize: 7.8, lineHeight: 1.25, textAlign: "center" }}>COORDINADOR ACADÉMICO{"\n"}FORMASALUD</Text>
      <Text style={{ position: "absolute", left: 142, top: 565, fontSize: 8, color: "#24547C" }}>Lima, {data.issueDateText}</Text>
      <Text style={{ position: "absolute", left: 602, top: 565, width: 250, textAlign: "right", fontSize: 7.8, color: "#24547C" }}>FORMASALUD | RUC: 20613837613 | formasalud.org.pe</Text>
    </Page>
  </Document>;
}
