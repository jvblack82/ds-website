import logo4ps from "@/assets/logo-4ps.png";
import logoSellercandy from "@/assets/logo-sellercandy.png";
import logoChristinas from "@/assets/logo-christinas.png";
import logoDreamplex from "@/assets/logo-dreamplex.png";
import logoDh from "@/assets/logo-dh.png";
import logoTpbank from "@/assets/logo-tpbank.png";
import logoMarou from "@/assets/logo-marou.png";
import logoSathapana from "@/assets/logo-sathapana.png";
import logoVpbank from "@/assets/logo-vpbank.svg";

export interface CompanyLogo {
  src: string;
  alt: string;
  // The file's intrinsic pixel size. Passed as width and height so the strip
  // keeps its final wrap while the lazy images load; otherwise it grows a few
  // rows late and pushes a hash link's target down (no scroll anchoring in
  // Safari before 27).
  width: number;
  height: number;
  // Optical size multiplier vs the strip's base height (default 1). Compact
  // marks (a heart, a badge) need a bump to carry the same visual weight as
  // wide wordmarks.
  scale?: number;
}

// Companies where the practice has been built, as a "worked with" credibility
// strip (greyscale, low opacity). Mix of direct operating roles and consulting
// engagements, so the strip is never labelled "clients". Order is tuned for
// visual balance (wide wordmarks alternate with compact marks).
export const COMPANY_LOGOS: CompanyLogo[] = [
  { src: logo4ps, alt: "Pizza 4P's", width: 104, height: 80 },
  { src: logoSellercandy, alt: "Seller Candy", width: 469, height: 42 },
  { src: logoChristinas, alt: "Christina's", width: 80, height: 80, scale: 1.35 },
  { src: logoDreamplex, alt: "Dreamplex", width: 67, height: 80 },
  { src: logoDh, alt: "Delivering Happiness", width: 84, height: 80 },
  { src: logoTpbank, alt: "TPBank", width: 259, height: 80 },
  { src: logoMarou, alt: "Marou", width: 80, height: 80 },
  { src: logoSathapana, alt: "Sathapana Bank", width: 96, height: 96, scale: 1.3 },
  { src: logoVpbank, alt: "VPBank", width: 706, height: 160 },
];
