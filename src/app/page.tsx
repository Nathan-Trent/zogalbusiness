import Link from "next/link";
import { Store, ScanLine, ReceiptText, WifiOff } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { FallingLeaves } from "@/components/FallingLeaves";
import { CanopyLeaves } from "@/components/CanopyLeaves";

/**
 * business.getzogal.com — the Zogal Business sub-brand. What it is, and
 * the products under it. Today: Doka. Each product gets a card; the card
 * goes to its own page (/doka), never straight to the app.
 */
export default function BusinessLanding() {
  return (
    <main style={{ background: "var(--forest)", minHeight: "100dvh", position: "relative" }}>
      <Nav />
      <FallingLeaves />

      <section style={{ position: "relative", minHeight: "88dvh", display: "flex", alignItems: "center", background: "radial-gradient(ellipse 80% 60% at 34% 42%, #0A3A23 0%, #062C1A 55%, #052316 100%)", overflow: "hidden" }}>
        <CanopyLeaves />
        <div className="container" style={{ position: "relative", zIndex: 5, padding: "80px 24px" }}>
          <div className="card" style={{ maxWidth: 560, padding: "42px 38px 40px" }}>
            <p className="eyebrow">Zogal Business</p>
            <h1 style={{ fontSize: 46, lineHeight: 1.04, letterSpacing: "-2px", fontWeight: 700, margin: "0 0 16px" }}>
              Know your numbers.<br /><span style={{ color: "var(--signal)" }}>Every day.</span>
            </h1>
            <p className="muted" style={{ fontSize: 15, lineHeight: 1.65, margin: "0 0 24px", maxWidth: 420 }}>
              Zogal helps people see their money coming. Zogal Business does the same for the businesses they run — starting with the shop on the corner.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <Link href="/doka" className="btn btn-primary">Meet Doka</Link>
              <a href="#products" className="btn btn-ghost">Our products ↓</a>
            </div>
          </div>
        </div>
      </section>

      <Reveal id="products" style={{ padding: "90px 24px", background: "#051610" }}>
        <div className="container">
          <p className="eyebrow">Products</p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.2, margin: "0 0 12px" }}>One so far. Built properly.</h2>
          <p className="muted" style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 32px", maxWidth: 560 }}>
            We would rather ship one tool a shop owner actually uses every day than five they open once.
          </p>
          <Link href="/doka" className="card" style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 22, alignItems: "center", padding: 26, maxWidth: 760, transition: "transform .2s" }}>
            <div style={{ width: 56, height: 56, borderRadius: 14, background: "var(--gold-soft)", border: "1px solid rgba(227,179,65,.35)", display: "grid", placeItems: "center" }}>
              <Store size={26} color="var(--gold)" />
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
                <span style={{ fontSize: 22, fontWeight: 800, letterSpacing: "-0.5px" }}>Doka</span>
                <span style={{ fontSize: 12, color: "rgba(255,255,255,.45)" }}>by Zogal</span>
              </div>
              <p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: "6px 0 0" }}>
                Sales, stock and true profit for retail shops. A till that keeps working when the network doesn&apos;t, and a dashboard that shows the owner the real numbers from anywhere.
              </p>
            </div>
            <span style={{ color: "var(--signal)", fontWeight: 600, fontSize: 14 }}>Learn more →</span>
          </Link>
        </div>
      </Reveal>

      <Reveal style={{ padding: "90px 24px", background: "var(--forest)" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <p className="eyebrow">Why business</p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.2, margin: "0 0 24px" }}>
            Most small businesses in Nigeria run on a notebook and a feeling.
          </h2>
          <p className="muted" style={{ fontSize: 17, lineHeight: 1.8, margin: "0 0 20px" }}>
            Sales go in a book. Stock is whatever is on the shelf. Profit is what&apos;s left at the end of the month — if anything is. When it&apos;s time to file, the numbers have to be invented from memory.
          </p>
          <p className="muted" style={{ fontSize: 17, lineHeight: 1.8, margin: "0 0 20px" }}>
            Zogal Business builds tools that record the truth as it happens — every unit bought, every naira sold, every expense — so the owner sees real profit any day, and the tax figures are already there.
          </p>
          <p style={{ fontSize: 17, color: "var(--gold)", fontStyle: "italic", lineHeight: 1.7, margin: 0 }}>
            The same idea as Zogal for your own money: see it, don&apos;t guess it.
          </p>
        </div>
      </Reveal>

      <Reveal style={{ padding: "80px 24px", background: "#051610" }}>
        <div className="container" style={{ maxWidth: 720 }}>
          <p className="eyebrow">What we care about</p>
          <div className="grid-2">
            {[
              { icon: WifiOff, t: "Works without the network", d: "A till that stops when the data finishes is not a till. Ours keeps selling and catches up later." },
              { icon: ReceiptText, t: "True profit, not a guess", d: "Every sale knows exactly what that stock cost. Profit is a fact, not a feeling." },
              { icon: ScanLine, t: "Meets people where they are", d: "Barcodes if you have them. A photo of the notebook page if you don't." },
              { icon: Store, t: "Built for the shop, not the boardroom", d: "Plain words, big numbers, nothing the cashier doesn't need." },
            ].map((f) => (
              <div key={f.t} style={{ padding: 22, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.13)", borderRadius: 18 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "var(--gold-soft)", border: "1px solid rgba(227,179,65,.3)", display: "grid", placeItems: "center", marginBottom: 14 }}>
                  <f.icon size={18} color="var(--gold)" />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>{f.t}</p>
                <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Footer />
    </main>
  );
}
