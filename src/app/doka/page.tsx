import type { Metadata } from "next";
import { Barcode, Camera, Check, Download, LineChart, Package, ReceiptText, ShieldCheck, Smartphone, WifiOff } from "lucide-react";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Reveal } from "@/components/Reveal";
import { CanopyLeaves } from "@/components/CanopyLeaves";
import { fetchPricing, type PricingPlan } from "@/lib/pricing";

export const metadata: Metadata = {
  title: "Doka — sales, stock and true profit for your shop",
  description: "A till that works offline, stock that knows its cost, and a dashboard that shows the owner real profit from anywhere. Doka by Zogal.",
};

/** Pricing is edited in the Doka back office; this page re-reads it every minute. */
export const revalidate = 60;

export default async function DokaPage() {
  const plans = await fetchPricing();
  const appUrl = process.env.NEXT_PUBLIC_DOKA_APP_URL ?? "https://doka.zogal.app";
  const dlUrl = process.env.NEXT_PUBLIC_DOKA_DOWNLOAD_URL ?? "https://github.com/Nathan-Trent/jakodav2/releases/latest";

  return (
    <main style={{ background: "var(--forest)", minHeight: "100dvh", position: "relative" }}>
      <Nav product="doka" />

      <section style={{ position: "relative", padding: "90px 24px 70px", background: "radial-gradient(ellipse 80% 60% at 30% 40%, #0A3A23 0%, #062C1A 55%, #052316 100%)", overflow: "hidden" }}>
        <CanopyLeaves />
        <div className="container" style={{ position: "relative", zIndex: 5, display: "grid", gridTemplateColumns: "minmax(0,1.1fr) minmax(0,0.9fr)", gap: 40, alignItems: "center" }}>
          <div>
            <p className="eyebrow">Doka <span style={{ color: "rgba(255,255,255,.4)", letterSpacing: 0, textTransform: "none", fontWeight: 500 }}>by Zogal</span></p>
            <h1 style={{ fontSize: 52, lineHeight: 1.02, letterSpacing: "-2px", fontWeight: 700, margin: "0 0 18px" }}>
              Sell from the computer.<br />See your <span style={{ color: "var(--signal)" }}>real profit</span> on your phone.
            </h1>
            <p className="muted" style={{ fontSize: 16, lineHeight: 1.7, margin: "0 0 26px", maxWidth: 480 }}>
              Doka is a till, a stock book and an accountant&apos;s ledger in one — for retail shops that want to know their numbers every day, even when the network is off.
            </p>
            <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
              <a href={`${appUrl}`} className="btn btn-primary">Create your shop</a>
              <a href={dlUrl} className="btn btn-ghost"><Download size={16} /> Download for Windows &amp; Mac</a>
            </div>
            <p style={{ fontSize: 12, color: "rgba(255,255,255,.4)", margin: "14px 0 0" }}>Free to start. Set up in an afternoon. No card needed.</p>
          </div>
          <TillMock />
        </div>
      </section>

      <Reveal style={{ padding: "80px 24px", background: "#051610" }}>
        <div className="container">
          <p className="eyebrow">What Doka does</p>
          <div className="grid-3">
            {[
              { icon: WifiOff, t: "Works offline", d: "Sales queue on the shop computer and upload when the network returns. The till never stops." },
              { icon: Package, t: "Stock that knows its cost", d: "Every delivery is its own batch at its own price. Old stock keeps its cost; profit per sale is exact." },
              { icon: ReceiptText, t: "True profit", d: "Selling price minus what that unit cost you, minus expenses. Today, this month, any period." },
              { icon: Barcode, t: "Barcodes", d: "Scan what has a barcode. Print one for what doesn't. One tap for the rest." },
              { icon: Camera, t: "Notebook photos", d: "Still writing sales by hand? Photograph the page — Doka reads it into rows you confirm." },
              { icon: Smartphone, t: "Owner dashboard", d: "Takings, profit, stock, staff and terminals from your phone, anywhere." },
              { icon: ShieldCheck, t: "Staff and permissions", d: "Cashiers sell. Managers restock. Only the owner sees cost prices. Every override is logged." },
              { icon: LineChart, t: "Tax, already counted", d: "VAT and income-tax status update as you sell. When you file, the figures are there." },
            ].map((f) => (
              <div key={f.t} style={{ padding: 22, background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.13)", borderRadius: 18 }}>
                <div style={{ width: 34, height: 34, borderRadius: 9, background: "rgba(74,222,128,.1)", border: "1px solid rgba(74,222,128,.25)", display: "grid", placeItems: "center", marginBottom: 14 }}>
                  <f.icon size={18} color="var(--signal)" />
                </div>
                <p style={{ fontSize: 15, fontWeight: 600, margin: "0 0 6px" }}>{f.t}</p>
                <p className="muted" style={{ fontSize: 13, lineHeight: 1.6, margin: 0 }}>{f.d}</p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal style={{ padding: "90px 24px", background: "var(--forest)" }}>
        <div className="container" style={{ maxWidth: 640 }}>
          <p className="eyebrow">How it works</p>
          {[
            ["1", "Install the till on the shop computer", "Windows or Mac. Activate it with a code from your dashboard. It updates itself."],
            ["2", "Add your items and what they cost", "Or scan the barcodes. Set a floor price nobody can sell below."],
            ["3", "Sell", "Scan or tap, take the money, done. Works with or without network."],
            ["4", "Open your phone", "Takings, profit after cost and expenses, what's running low, who sold what — any day, any month."],
          ].map(([n, t, d]) => (
            <div key={n} style={{ display: "grid", gridTemplateColumns: "44px 1fr", gap: 16, padding: "18px 0", borderBottom: "1px solid rgba(255,255,255,.08)" }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: "var(--gold-soft)", color: "var(--gold)", display: "grid", placeItems: "center", fontWeight: 800 }}>{n}</div>
              <div><p style={{ fontSize: 17, fontWeight: 600, margin: "0 0 4px" }}>{t}</p><p className="muted" style={{ fontSize: 14, lineHeight: 1.6, margin: 0 }}>{d}</p></div>
            </div>
          ))}
        </div>
      </Reveal>

      <Reveal id="pricing" style={{ padding: "90px 24px", background: "#051610" }}>
        <div className="container">
          <p className="eyebrow">Pricing</p>
          <h2 style={{ fontSize: "clamp(28px, 5vw, 38px)", fontWeight: 600, letterSpacing: "-1px", lineHeight: 1.2, margin: "0 0 10px" }}>Priced for a shop, not a corporation.</h2>
          <p className="muted" style={{ fontSize: 15, margin: "0 0 32px" }}>Per shop, per month. Change or cancel any time.</p>
          {plans.length === 0 ? (
            <p className="muted">Pricing is being finalised — <a href="mailto:hello@getzogal.com" style={{ color: "var(--signal)" }}>ask us</a>.</p>
          ) : (
            <div className="grid-3">{plans.map((p) => <PlanCard key={p.id} plan={p} appUrl={appUrl} />)}</div>
          )}
        </div>
      </Reveal>

      <section style={{ padding: "80px 24px", background: "var(--forest)", textAlign: "center" }}>
        <div className="container" style={{ maxWidth: 560 }}>
          <h2 style={{ fontSize: "clamp(26px, 4vw, 34px)", fontWeight: 600, letterSpacing: "-1px", margin: "0 0 14px" }}>Know your numbers. Every day.</h2>
          <p className="muted" style={{ fontSize: 15, margin: "0 0 24px" }}>Create your shop in a minute. Install the till when you&apos;re ready.</p>
          <a href={`${appUrl}`} className="btn btn-gold">Start with Doka</a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function naira(n: number | string) {
  return "₦" + Math.round(Number(n)).toLocaleString("en-NG");
}

function PlanCard({ plan, appUrl }: { plan: PricingPlan; appUrl: string }) {
  return (
    <div className="card" style={{ padding: 26, position: "relative", borderColor: plan.highlight ? "var(--gold)" : undefined }}>
      {plan.highlight && <span style={{ position: "absolute", top: -12, left: 22, background: "var(--gold)", color: "var(--ink)", fontSize: 11, fontWeight: 700, padding: "4px 10px", borderRadius: 999, letterSpacing: ".06em", textTransform: "uppercase" }}>Recommended</span>}
      <p style={{ fontSize: 18, fontWeight: 700, margin: "0 0 2px" }}>{plan.name}</p>
      <p className="muted" style={{ fontSize: 13, margin: "0 0 18px" }}>{plan.tagline}</p>
      <p style={{ margin: "0 0 4px" }}><span style={{ fontSize: 34, fontWeight: 800, letterSpacing: "-1px" }}>{naira(plan.price_monthly)}</span><span className="muted" style={{ fontSize: 13 }}> / month</span></p>
      {plan.price_yearly != null && <p className="muted" style={{ fontSize: 12, margin: "0 0 18px" }}>or {naira(plan.price_yearly)} / year</p>}
      <ul style={{ listStyle: "none", padding: 0, margin: "0 0 22px", display: "grid", gap: 8 }}>
        {plan.features.map((f, i) => <li key={i} style={{ display: "flex", gap: 8, fontSize: 14 }}><Check size={16} color="var(--signal)" style={{ flexShrink: 0, marginTop: 2 }} />{f}</li>)}
      </ul>
      <a href={`${appUrl}?plan=${plan.key}`} className={`btn ${plan.highlight ? "btn-primary" : "btn-ghost"}`} style={{ width: "100%", justifyContent: "center" }}>Choose {plan.name}</a>
    </div>
  );
}

/** A still of the till — solid card, the product's own surface. */
function TillMock() {
  const rows = [["Peak Milk 400g", "2 × ₦1,800", "₦3,600"], ["Indomie Chicken", "10 × ₦250", "₦2,500"], ["Golden Penny Semo 1kg", "1 × ₦1,400", "₦1,400"]];
  return (
    <div className="card hidden-mobile" style={{ padding: 20, transform: "perspective(900px) rotateY(-6deg)", fontSize: 13 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
        <span style={{ fontWeight: 700 }}>Sale</span>
        <span style={{ fontSize: 11, color: "var(--signal)", background: "rgba(74,222,128,.12)", padding: "3px 8px", borderRadius: 999 }}>● Offline — sales saved locally</span>
      </div>
      {rows.map(([n, q, t]) => (
        <div key={n} style={{ display: "grid", gridTemplateColumns: "1fr auto auto", gap: 12, padding: "9px 0", borderTop: "1px solid rgba(255,255,255,.08)" }}>
          <span>{n}</span><span className="muted">{q}</span><span style={{ fontWeight: 700, fontVariantNumeric: "tabular-nums" }}>{t}</span>
        </div>
      ))}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: 14, paddingTop: 14, borderTop: "1px solid rgba(255,255,255,.14)" }}>
        <span className="muted">Total</span><span style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.5px", fontVariantNumeric: "tabular-nums" }}>₦7,500</span>
      </div>
      <div style={{ marginTop: 14, background: "var(--action)", borderRadius: 10, padding: "12px", textAlign: "center", fontWeight: 700 }}>Record sale</div>
    </div>
  );
}
