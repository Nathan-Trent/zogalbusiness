import Link from "next/link";
import { ZogalMark } from "./ZogalMark";

export function Footer() {
  return (
    <footer style={{ padding: "40px 24px", background: "#041C11", borderTop: "1px solid rgba(255,255,255,0.06)" }}>
      <div className="container" style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", gap: 16, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
          <ZogalMark size={20} />
          <span style={{ fontSize: 13, color: "rgba(255,255,255,0.5)" }}>Zogal Business · a Zogal company</span>
        </div>
        <div style={{ display: "flex", gap: 18, fontSize: 13, color: "rgba(255,255,255,0.5)" }}>
          <Link href="/doka">Doka</Link>
          <a href="https://getzogal.com">Zogal for you</a>
          <a href="mailto:hello@getzogal.com">Contact</a>
        </div>
      </div>
    </footer>
  );
}
