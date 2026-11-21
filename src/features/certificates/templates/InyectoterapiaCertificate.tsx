import { Circle, Defs, Document, Image as PdfImage, LinearGradient, Link, Page, Path, Rect, Stop, Svg, Text, View } from "@react-pdf/renderer";
import { create as createQrCode } from "qrcode";
import { FormasaludCertificatePayload } from "../types";

const navy = "#081945";
const blue = "#064887";
const gold = "#E9B72B";
const center = { position: "absolute", left: 162, width: 576, textAlign: "center" } as const;
const serif = { fontFamily: "Times-Bold" };
const sans = { fontFamily: "Helvetica-Bold" };
const absolute = (left: number, top: number, width: number, height?: number) =>
  ({ position: "absolute", left, top, width, height } as const);

function CertificateFrame() {
  const hexagons = [[643, -9], [688, 15], [733, -9], [778, 15], [823, -9], [868, 15], [823, 67], [868, 93], [823, 119], [868, 145], [898, 197], [839, 249], [884, 275], [839, 301], [884, 327], [20, 503], [49, 556], [6, 581]];

  return (
    <Svg width={900} height={633} style={absolute(0, 0, 900, 633)}>
      <Defs>
        <LinearGradient id="paper" x1="0%" y1="100%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#C3E9FB" />
          <Stop offset="25%" stopColor="#FFFFFF" />
          <Stop offset="70%" stopColor="#FFFFFF" />
          <Stop offset="100%" stopColor="#A5DAF8" />
        </LinearGradient>
        <LinearGradient id="blueRibbon" x1="0%" y1="90%" x2="100%" y2="0%">
          <Stop offset="0%" stopColor="#004081" />
          <Stop offset="35%" stopColor="#0084E4" />
          <Stop offset="72%" stopColor="#04356E" />
          <Stop offset="100%" stopColor="#021634" />
        </LinearGradient>
        <LinearGradient id="goldRibbon" x1="0%" y1="0%" x2="100%" y2="95%">
          <Stop offset="0%" stopColor="#A97412" />
          <Stop offset="25%" stopColor="#F7CB48" />
          <Stop offset="47%" stopColor="#FFF2A8" />
          <Stop offset="69%" stopColor="#CF9018" />
          <Stop offset="100%" stopColor="#FFE06A" />
        </LinearGradient>
      </Defs>
      <Rect width={900} height={633} fill="url(#paper)" />
      {hexagons.map(([x, y]) => (
        <Path key={`${x}-${y}`} d={`M${x} ${y}l23-13 23 13v26l-23 13-23-13z`} fill="#6CC4F1" fillOpacity={0.14} stroke="#78C5E7" strokeWidth={0.75} />
      ))}
      <Path d="M0 0H350C210 9 75 101 0 255Z" fill="#F5FCFF" />
      <Path d="M0 0H322C183 14 64 98 0 242Z" fill="url(#blueRibbon)" />
      <Path d="M0 122C81 57 157 21 225 0H293C180 14 81 79 0 169Z" fill="url(#goldRibbon)" />
      <Path d="M0 76C41 40 88 15 129 0H207C124 18 53 64 0 102Z" fill="#042451" />
      <Path d="M0 29L41 0H84C49 12 21 32 0 53Z" fill="#0067BA" />
      <Path d="M0 577C150 629 314 636 496 621C675 607 811 541 900 473V633H0Z" fill="url(#goldRibbon)" />
      <Path d="M0 579C152 630 327 637 496 623C673 608 809 558 900 491V633H0Z" fill="url(#blueRibbon)" />
      <Path d="M604 633C714 618 820 578 900 528V540C832 584 733 618 624 633Z" fill="#F5FCFF" />
      <Path d="M700 633C780 609 841 573 900 541V561C853 580 795 612 762 633Z" fill="url(#goldRibbon)" />
      <Path d="M823 633C853 608 877 593 900 586V633Z" fill="#0067BA" />
      <Path d="M0 611C44 621 93 629 143 633H0Z" fill="#062F66" />
      <Circle cx={40} cy={547} r={29} fill="#F8FDFF" stroke="#A4D7EF" strokeWidth={2} />
      <Path d="M34 527h12v13h13v13H46v13H34v-13H21v-13h13z" fill="#258ECD" />
      <Path d="M69 547h24l6-10 8 24 9-53 10 62 8-39 8 20 5-8 4 4h36" fill="none" stroke="#258ECD" strokeWidth={2.1} strokeLinejoin="round" />
      <Path d="M193 86h76m361 0h77" stroke={navy} strokeWidth={1.5} />
      <Circle cx={274} cy={86} r={3.2} fill={navy} />
      <Circle cx={625} cy={86} r={3.2} fill={navy} />
      <Path d="M126 191q77-6 142 0-65 6-142 0m506 0q64-6 123 0-59 6-123 0" fill="url(#goldRibbon)" />
      <Path d="M271 170H629L613 188 629 207H271L287 188Z" fill="url(#blueRibbon)" stroke={gold} strokeWidth={2.2} />
      <Path d="M180 265h262m16 0h265M196 514h186m160 0h187" stroke={gold} strokeWidth={1.7} />
      <Path d="M450 258l7 7-7 7-7-7z" fill={navy} />
      <Path d="M196 298v193" stroke={blue} strokeWidth={1.5} />
    </Svg>
  );
}

const detailIcons = [
  "M-10-7h20v17h-20zM-10-2h20M-5-10v5M5-10v5M-6 2h2m3 0h2m3 0h2M-6 6h2m3 0h2m3 0h2",
  "M0-10a10 10 0 1 1 0 20 10 10 0 1 1 0-20m0 3v7l5 3",
  "M-11-8h22V6h-22zM0 6v5m-5 0h10",
  "M0-11l4 3 5 1 1 5-1 5-5 2-4 3-4-3-5-2-1-5 1-5 5-1zM-5 5l-2 7 4-2 3 2 2-7m3 0 2 7-4-2M-3-1l2 2 4-4",
];

export function InyectoterapiaCertificate({ data }: { data: FormasaludCertificatePayload }) {
  const approval = data.certificateType === "approval";
  const name = data.studentName.toLocaleUpperCase("es-PE");
  const title = data.courseTitle.toLocaleUpperCase("es-PE");
  const duration = `${data.hours} ${data.hoursUnit}`;
  const details = [data.courseDateText, duration, data.modality, data.certificateCode];
  const qr = data.verificationUrl ? createQrCode(data.verificationUrl, { errorCorrectionLevel: "M" }) : undefined;
  const qrSize = qr ? qr.modules.size + 8 : 0;
  const qrPath = qr ? Array.from(qr.modules.data).reduce((result, cell, i) => cell
    ? `${result}M${i % qr.modules.size + 4} ${Math.floor(i / qr.modules.size) + 4}h1v1h-1z` : result, "") : "";

  return (
    <Document title={`Certificado - ${data.studentName}`} author="FORMASALUD" subject={data.courseTitle}>
      <Page size={[900, 633]} wrap={false} style={{ position: "relative", minHeight: 633, color: navy, fontFamily: "Helvetica" }}>
        <CertificateFrame />
        {data.logoLeftUrl && <PdfImage src={data.logoLeftUrl} style={{ ...absolute(32, 24, 120, 120), objectFit: "contain" }} />}
        {data.logoRightUrl && <PdfImage src={data.logoRightUrl} style={{ ...absolute(754, 23, 116, 116), objectFit: "cover", borderRadius: 58 }} />}
        {data.sponsorLogoUrl && <PdfImage src={data.sponsorLogoUrl} style={{ ...absolute(762, 143, 102, 102), borderRadius: 51 }} />}
        <Text style={{ ...center, ...serif, top: 27, fontSize: 47 }}>FORMASALUD</Text>
        <Text style={{ ...center, top: 76, fontSize: 17, fontFamily: "Times-BoldItalic" }}>Innovación y Desarrollo Académico en Salud</Text>
        <Text style={{ ...center, ...serif, top: 96, fontSize: 72 }}>CERTIFICADO</Text>
        <Text style={{ ...center, ...serif, top: 174, fontSize: 26, letterSpacing: 1.5, color: "#FFFFFF" }}>{approval ? "DE APROBACIÓN" : "DE PARTICIPACIÓN"}</Text>
        <Text style={{ ...center, ...serif, top: 208, fontSize: 18 }}>A:</Text>
        <View style={{ ...center, top: 225, height: 36, justifyContent: "center" }}>
          <Text style={{ ...sans, fontSize: Math.min(29, 940 / name.length), textAlign: "center" }}>{name}</Text>
        </View>
        <Text style={{ ...center, ...serif, top: 274, fontSize: 18 }}>Por su participación{approval ? " y aprobación satisfactoria" : ""} en el</Text>
        <View style={{ ...absolute(344, 298, 222, 23), borderRadius: 12, backgroundColor: navy }}>
          <Text style={{ ...serif, fontSize: 20, color: "#FFFFFF", textAlign: "center" }}>Curso-Taller:</Text>
        </View>
        <Text style={{ ...absolute(211, 325, 489), ...sans, fontSize: 29, lineHeight: 1.01, textAlign: "center" }}>{title}</Text>
        <Text style={{ ...absolute(210, 388, 519), ...serif, fontSize: 14.1, lineHeight: 1.16, textAlign: "center" }}>Organizado por ENFERMERÍA INTEGRAL en convenio con FORMASALUD, con la{"\n"}ponencia de M.G. {data.teacherName?.replace(/^(?:M\.?\s*G\.?|Mg\.?)\s+/i, "")}.</Text>
        <Text style={{ ...absolute(210, 424, 519), ...serif, fontSize: 14.1, lineHeight: 1.12, textAlign: "center" }}>Desarrollado de manera presencial el {data.courseDateText}, con una duración de{"\n"}{duration}.</Text>

        {["FECHA DEL CURSO", "DURACIÓN", "MODALIDAD", "CÓDIGO DE CERTIFICADO"].map((label, i) => (
          <View key={label} style={absolute(18, 297 + i * 50, 173, 42)}>
            <Svg width={42} height={42} viewBox="-20 -20 40 40">
              <Circle r={19.5} fill={blue} />
              <Path d={detailIcons[i]} fill="none" stroke="#FFFFFF" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" />
            </Svg>
            <Text style={{ ...absolute(51, 6, 122), ...sans, fontSize: i === 3 ? 9.6 : 10.7, color: blue }}>{label}</Text>
            <Text style={{ ...absolute(51, 22, 122), ...serif, fontSize: i === 0 ? 11.2 : 12.1 }}>{details[i]}</Text>
          </View>
        ))}

        {data.verificationUrl && qr && (
          <Link src={data.verificationUrl} style={{ ...absolute(774, 350, 108), borderWidth: 1.9, borderColor: navy, borderRadius: 9, backgroundColor: "#FFFFFF", overflow: "hidden", textDecoration: "none" }}>
            <Svg width={104} height={99} viewBox={`0 0 ${qrSize} ${qrSize}`}>
              <Rect width={qrSize} height={qrSize} fill="#FFFFFF" />
              <Path d={qrPath} fill="#000000" />
            </Svg>
            <Text style={{ ...sans, textAlign: "center", color: "#FFFFFF", backgroundColor: navy, fontSize: 9.5, paddingVertical: 4 }}>
              {data.previewOnly ? "MODELO SIN\nEMISIÓN" : "VERIFICA TU\nCERTIFICADO"}
            </Text>
          </Link>
        )}

        {data.signatureLeftUrl && <PdfImage src={data.signatureLeftUrl} style={{ ...absolute(217, 447, 151, 96), objectFit: "contain" }} />}
        {data.signatureRightUrl && <PdfImage src={data.signatureRightUrl} style={{ ...absolute(550, 445, 173, 90), objectFit: "contain" }} />}
        {data.sealUrl && <PdfImage src={data.sealUrl} style={{ ...absolute(411, 467, 103, 98), objectFit: "contain" }} />}
        <Text style={{ ...absolute(196, 520, 186), ...serif, fontSize: 12.1, textAlign: "center" }}>{data.academicDirector}{"\n"}DIRECTOR ACADÉMICO{"\n"}FORMASALUD</Text>
        <Text style={{ ...absolute(542, 520, 187), ...serif, fontSize: 12.1, textAlign: "center" }}>{data.coordinatorName}{"\n"}COORDINADOR ACADÉMICO{"\n"}FORMASALUD</Text>

        <View style={{ ...absolute(150, 578, 592, 32), backgroundColor: navy, borderColor: "#FFFFFF", borderWidth: 1.3, borderRadius: 17 }}>
          <Svg width={16} height={16} viewBox="-14 -14 28 28" style={absolute(14, 7, 16, 16)}>
            <Path d={detailIcons[0]} fill="none" stroke="#FFFFFF" strokeWidth={2} strokeLinecap="round" />
          </Svg>
          <Text style={{ ...absolute(38, 8, 135), ...serif, fontSize: 11.5, color: "#FFFFFF" }}>{data.issueDateText}</Text>
          <View style={{ ...absolute(172, 7, 1, 17), backgroundColor: "#FFFFFF" }} />
          <Text style={{ ...absolute(182, 8, 181), ...serif, fontSize: 11.2, color: "#FFFFFF" }}>FORMASALUD RUC: 20613837613</Text>
          <View style={{ ...absolute(365, 7, 1, 17), backgroundColor: "#FFFFFF" }} />
          <Svg width={16} height={16} viewBox="-14 -14 28 28" style={absolute(376, 7, 16, 16)}>
            <Circle r={11} fill="none" stroke="#FFFFFF" strokeWidth={1.7} />
            <Path d="M0-11C-7-7-7 7 0 11C7 7 7-7 0-11zM-11 0h22M-9-5H9M-9 5H9" fill="none" stroke="#FFFFFF" strokeWidth={1.2} />
          </Svg>
          <Text style={{ ...absolute(400, 8, 181), ...serif, fontSize: 11.5, color: "#FFFFFF" }}>Verificable en: formasalud.org.pe</Text>
        </View>
      </Page>
    </Document>
  );
}
