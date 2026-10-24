const fs = require("node:fs");
const assert = require("node:assert/strict");
const ts = require("typescript");

for (const extension of [".ts", ".tsx"]) {
  require.extensions[extension] = (module, filename) => module._compile(
    ts.transpileModule(fs.readFileSync(filename, "utf8"), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
    }).outputText, filename,
  );
}

const { mapCertificateToPayload: map } = require("../src/features/certificates/utils.ts");
const certificate = { template_key: "ventilator-formasalud", certificate_code: "REG-TEST-2026", hours: 4 };
const data = map(certificate);
assert.equal(data.templateId, "ventilator-formasalud");
assert.equal(data.hours, 4);
assert.equal(data.hoursUnit, "horas lectivas");
assert.equal(data.modality, "100 % presencial");
assert.equal(data.logoRightUrl, "/certificates/fisiouci.png");
assert.equal(data.sponsorLogoUrl, "/certificates/ausp.png");
assert.equal(data.signatureRightUrl, "/certificates/bertha.png");
assert.equal(data.verificationUrl, "https://formasalud.org.pe/verificar/REG-TEST-2026");
assert.equal(map(certificate, { signatureRightUrl: "data:image/png;base64,test" }).signatureRightUrl, "data:image/png;base64,test");
assert.equal(map({ course_title: "DESVINCULACIÓN DEL VENTILADOR MECÁNICO" }).templateId, "formasalud-classic");
assert.equal(map({ template_key: "sterilization-formasalud" }).templateId, "sterilization-formasalud");
assert.equal(map({ ...certificate, certificate_type: "speaker" }).templateId, "speaker-recognition");
console.log("Ventilator certificate checks passed");
