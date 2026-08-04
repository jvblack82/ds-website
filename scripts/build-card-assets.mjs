/**
 * Generates the two static assets behind the digital business card at /joeblack:
 *   public/joeblack.vcf     the downloadable contact (vCard 3.0, photo embedded)
 *   public/joeblack-qr.svg  a QR pointing at the card URL, shown on the page
 *
 * Run with: npm run card:assets
 * Edit CARD below and re-run whenever the contact details change.
 *
 * No phone number by design (Joe, 2026-08-04): his number stays off the public
 * site, so the card is email and LinkedIn only. Keep it that way unless he says
 * otherwise.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import QRCode from "qrcode";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");

const CARD_URL = "https://www.dreamscope.win/joeblack";

const CARD = {
  first: "Joe",
  last: "Black",
  org: "Dreamscope Consulting",
  title: "Founder",
  email: "joe@dreamscope.win",
  url: "https://www.dreamscope.win",
  linkedin: "https://www.linkedin.com/in/joevblack",
  city: "Ho Chi Minh City",
  country: "Vietnam",
  // Shows inside the saved contact. Written to still make sense to someone
  // opening it six months after they met him.
  note: "Culture and operations for growing companies. I take expert work and train AI to do it. dreamscope.win/joeblack",
  photo: "src/assets/joe-black.jpg",
};

/**
 * vCard lines are limited to 75 octets. Longer lines fold onto continuation
 * lines that start with a single space. The embedded photo is the only line
 * long enough to need it, but folding everything is harmless and safer.
 */
function fold(line) {
  if (Buffer.byteLength(line, "utf8") <= 75) return line;
  const out = [];
  let cur = "";
  for (const ch of line) {
    if (Buffer.byteLength(cur + ch, "utf8") > (out.length === 0 ? 75 : 74)) {
      out.push(cur);
      cur = "";
    }
    cur += ch;
  }
  if (cur) out.push(cur);
  return out.join("\r\n ");
}

const photoB64 = readFileSync(resolve(root, CARD.photo)).toString("base64");

const lines = [
  "BEGIN:VCARD",
  "VERSION:3.0",
  `N:${CARD.last};${CARD.first};;;`,
  `FN:${CARD.first} ${CARD.last}`,
  `ORG:${CARD.org}`,
  `TITLE:${CARD.title}`,
  `EMAIL;type=INTERNET;type=WORK;type=pref:${CARD.email}`,
  `ADR;type=WORK:;;;${CARD.city};;;${CARD.country}`,
  `URL:${CARD.url}`,
  `item1.URL:${CARD.linkedin}`,
  "item1.X-ABLabel:LinkedIn",
  `NOTE:${CARD.note}`,
  `PHOTO;ENCODING=b;TYPE=JPEG:${photoB64}`,
  "END:VCARD",
];

// vCard requires CRLF line endings. Written without a BOM so iOS parses it.
const vcf = lines.map(fold).join("\r\n") + "\r\n";
writeFileSync(resolve(root, "public/joeblack.vcf"), vcf, "utf8");
console.log(`public/joeblack.vcf     ${(vcf.length / 1024).toFixed(1)} KB`);

const svg = await QRCode.toString(CARD_URL, {
  type: "svg",
  errorCorrectionLevel: "M",
  margin: 1,
  color: { dark: "#1E2B3A", light: "#FFFFFF" },
});
writeFileSync(resolve(root, "public/joeblack-qr.svg"), svg, "utf8");
console.log(`public/joeblack-qr.svg  ${(svg.length / 1024).toFixed(1)} KB  ->  ${CARD_URL}`);
