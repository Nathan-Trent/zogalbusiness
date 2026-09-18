import Link from "next/link";
import { ZogalMark } from "./ZogalMark";

/** Same bar as getzogal.com; the wordmark says which Zogal this is. */
export function Nav({ product }: { product?: "doka" }) {
  const appUrl = process.env.NEXT_PUBLIC_DOKA_APP_URL ?? "https://doka.zogal.app";
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 60, display: "flex", justifyContent: "space-between", alignItems: "center", padding: "14px 26px", background: "rgba(6,44,26,0.85)", borderBottom: "1px solid rgba(255,255,255,0.06)", backdropFilter: "none" }}>
      <Link href="/" style={{ display: "flex", alignItems: "center", gap: 9 }}>
        <ZogalMark size={24} />
        <span style={{ fontSize: 16, fontWeight: 800, color: "#F8FAF9", letterSpacing: "-0.02em" }}>
          Zogal <span style={{ color: "var(--gold)", fontWeight: 700 }}>Business</span>
        </span>
      </Link>
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <Link href="/doka" className="hidden-mobile" style={{ fontSize: 13, color: product === "doka" ? "#fff" : "rgba(255,255,255,0.6)", fontWeight: 600 }}>Doka</Link>
        <a href={`${appUrl}`} className="hidden-mobile" style={{ fontSize: 13, color: "rgba(255,255,255,0.6)", fontWeight: 600 }}>Sign in</a>
        <a href={`${appUrl}`} className="btn btn-primary" style={{ padding: "8px 16px", fontSize: 12, borderRadius: 20 }}>Get Doka</a>
      </div>
    </nav>
  );
}
