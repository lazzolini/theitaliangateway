import { useState, useEffect, useRef } from "react";
import ARTICLES from "./articles.js";

/* ── Brand Colors ── */
const C = {
  bg: "#0A0E17", card: "#111827", cardHover: "#1a2332",
  gold: "#C9A96E", goldLight: "#E8D5A8", goldDim: "#8B7542",
  text: "#E5E7EB", textDim: "#9CA3AF", white: "#FFFFFF",
  accent: "#1B3A5C", border: "#1F2937",
};

/* ── Services Data ── */
const SERVICES = [
  { icon: "🏦", title: "Private Banking", desc: "Account opening, wealth advisory introductions, family office coordination" },
  { icon: "⚖️", title: "Tax & Legal", desc: "Flat tax optimization, patrimony structuring, trust & holding setup" },
  { icon: "🏠", title: "Real Estate", desc: "Property search in Milan, Como & Tuscany. Due diligence & negotiation" },
  { icon: "🏥", title: "Healthcare", desc: "VIP access to San Raffaele, Humanitas, IEO. Private GP & insurance" },
  { icon: "🎓", title: "Education", desc: "International school placement: ASM, ISM, St. Louis, Sir James Henderson" },
  { icon: "🛂", title: "Immigration", desc: "Residence permits, golden visa, citizenship, corporate setup" },
];

/* ── Pricing Tiers ── */
const TIERS = [
  { name: "Essential", setup: "€5,000", monthly: "€500/mo", features: ["Tax optimization assessment", "1 private banking introduction", "Property search (5 viewings)", "School placement guidance", "Email support"] },
  { name: "Premium", setup: "€10,000", monthly: "€1,500/mo", popular: true, features: ["Everything in Essential", "Full fiscal structuring", "3 banking introductions", "Dedicated property negotiation", "Health concierge", "Immigration management"] },
  { name: "Family Office", setup: "€25,000", monthly: "€3,000/mo", features: ["Everything in Premium", "Family office coordination", "Corporate setup Italy/EU", "Domestic staff vetting", "Security & privacy advisory", "24/7 dedicated contact"] },
];

/* ── Tax Calculator Countries ── */
const COUNTRIES = [
  { name: "United Kingdom", rate: 0.45, flag: "🇬🇧" },
  { name: "United States (NYC)", rate: 0.519, flag: "🇺🇸" },
  { name: "Germany", rate: 0.45, flag: "🇩🇪" },
  { name: "France", rate: 0.45, flag: "🇫🇷" },
  { name: "Switzerland", rate: 0.40, flag: "🇨🇭" },
  { name: "Netherlands", rate: 0.495, flag: "🇳🇱" },
  { name: "Sweden", rate: 0.52, flag: "🇸🇪" },
  { name: "Australia", rate: 0.45, flag: "🇦🇺" },
  { name: "Singapore", rate: 0.22, flag: "🇸🇬" },
  { name: "UAE (Dubai)", rate: 0, flag: "🇦🇪" },
];

/* ── Fade-In Animation ── */
function FadeIn({ children, className = "", delay = 0 }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setTimeout(() => setVisible(true), delay); obs.disconnect(); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return (
    <div ref={ref} className={className} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(24px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    }}>
      {children}
    </div>
  );
}

/* ── Navigation ── */
function Nav({ setPage }) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", h);
    return () => window.removeEventListener("scroll", h);
  }, []);
  const navTo = (target) => {
    setMenuOpen(false);
    if (target === "guides") { setPage("guides"); window.scrollTo(0, 0); }
    else { setPage("home"); setTimeout(() => document.getElementById(target)?.scrollIntoView({ behavior: "smooth" }), 100); }
  };
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
      background: scrolled || menuOpen ? "rgba(10,14,23,0.97)" : "transparent",
      backdropFilter: scrolled ? "blur(12px)" : "none",
      borderBottom: scrolled ? `1px solid ${C.border}` : "none",
      transition: "all 0.3s",
    }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "16px 24px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ cursor: "pointer", display: "flex", alignItems: "baseline", gap: 8 }} onClick={() => navTo("home")}>
          <span style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.gold, fontWeight: 400, letterSpacing: 2 }}>ARRIVO</span>
          <span style={{ fontFamily: "'Segoe UI', sans-serif", fontSize: 12, color: C.textDim, letterSpacing: 4, textTransform: "uppercase" }}>ITALY</span>
        </div>
        {/* Mobile hamburger */}
        <button onClick={() => setMenuOpen(!menuOpen)} style={{ display: "none", background: "none", border: "none", color: C.gold, fontSize: 24, cursor: "pointer", "@media(maxWidth:768px)": { display: "block" } }}>☰</button>
        <div style={{ display: "flex", gap: 32, alignItems: "center", flexWrap: "wrap" }}>
          {[["Guides", "guides"], ["Calculator", "calc"], ["Plans", "plans"], ["Contact", "contact"]].map(([label, target]) => (
            <span key={target} onClick={() => navTo(target)}
              style={{ color: C.textDim, fontSize: 14, cursor: "pointer", letterSpacing: 1, transition: "color 0.2s" }}
              onMouseEnter={e => e.target.style.color = C.gold}
              onMouseLeave={e => e.target.style.color = C.textDim}>
              {label}
            </span>
          ))}
          <button onClick={() => navTo("contact")}
            style={{ background: C.gold, color: C.bg, padding: "10px 24px", border: "none", fontSize: 13, fontWeight: 600, letterSpacing: 1, cursor: "pointer", transition: "all 0.2s" }}
            onMouseEnter={e => e.target.style.background = C.goldLight}
            onMouseLeave={e => e.target.style.background = C.gold}>
            BOOK A CALL
          </button>
        </div>
      </div>
    </nav>
  );
}

/* ── Hero Section ── */
function Hero({ setPage }) {
  return (
    <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden", background: `linear-gradient(160deg, ${C.bg} 0%, #0d1423 50%, #111827 100%)` }}>
      <div style={{ position: "absolute", inset: 0, opacity: 0.04, backgroundImage: "radial-gradient(circle at 25% 25%, #C9A96E 1px, transparent 1px)", backgroundSize: "60px 60px" }} />
      <div style={{ position: "relative", textAlign: "center", maxWidth: 800, padding: "120px 24px 80px" }}>
        <FadeIn>
          <div style={{ fontSize: 13, color: C.gold, letterSpacing: 6, textTransform: "uppercase", marginBottom: 32, fontFamily: "'Segoe UI', sans-serif" }}>Your Gateway to Italian Living</div>
        </FadeIn>
        <FadeIn delay={150}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(36px, 6vw, 64px)", color: C.white, fontWeight: 400, lineHeight: 1.15, margin: "0 0 24px" }}>
            We make Italy<br /><span style={{ color: C.gold }}>feel like home</span>
          </h1>
        </FadeIn>
        <FadeIn delay={300}>
          <p style={{ color: C.textDim, fontSize: 18, lineHeight: 1.7, maxWidth: 600, margin: "0 auto 48px" }}>
            Premium advisory for high-net-worth individuals relocating to Milan. Tax optimization, private banking, real estate, healthcare, and education — all through a single, confidential point of contact.
          </p>
        </FadeIn>
        <FadeIn delay={450}>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
            <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              style={{ background: C.gold, color: C.bg, padding: "16px 40px", border: "none", fontSize: 14, fontWeight: 600, letterSpacing: 2, cursor: "pointer" }}>
              BOOK A CALL
            </button>
            <button onClick={() => { setPage("guides"); window.scrollTo(0, 0); }}
              style={{ background: "transparent", color: C.gold, padding: "16px 40px", border: `1px solid ${C.gold}`, fontSize: 14, fontWeight: 600, letterSpacing: 2, cursor: "pointer" }}>
              READ OUR GUIDES
            </button>
          </div>
        </FadeIn>
        <FadeIn delay={600}>
          <div style={{ display: "flex", gap: 48, justifyContent: "center", marginTop: 64, flexWrap: "wrap" }}>
            {[["€200K", "Annual flat tax"], ["15 yrs", "Tax certainty"], ["#2 WHO", "Healthcare ranking"]].map(([n, l]) => (
              <div key={n} style={{ textAlign: "center" }}>
                <div style={{ fontFamily: "Georgia, serif", fontSize: 32, color: C.gold }}>{n}</div>
                <div style={{ color: C.textDim, fontSize: 12, letterSpacing: 2, marginTop: 4, textTransform: "uppercase" }}>{l}</div>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Services Grid ── */
function ServicesSection() {
  return (
    <section style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: C.gold, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>What We Do</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: C.white, fontWeight: 400 }}>Six verticals, one point of contact</h2>
        </div>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 24 }}>
        {SERVICES.map((s, i) => (
          <FadeIn key={i} delay={i * 80}>
            <div style={{ background: C.card, border: `1px solid ${C.border}`, padding: 32, transition: "all 0.3s", height: "100%" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldDim; e.currentTarget.style.background = C.cardHover; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}>
              <div style={{ fontSize: 32, marginBottom: 16 }}>{s.icon}</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, color: C.white, fontWeight: 400, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: C.textDim, fontSize: 14, lineHeight: 1.6, margin: 0 }}>{s.desc}</p>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ── Tax Calculator ── */
function Calculator() {
  const [country, setCountry] = useState(0);
  const [income, setIncome] = useState(2000000);
  const c = COUNTRIES[country];
  const currentTax = income * c.rate;
  const italyTax = 200000;
  const saving = currentTax - italyTax;
  const fmt = n => n < 0 ? `-€${Math.abs(n).toLocaleString()}` : `€${n.toLocaleString()}`;
  return (
    <section id="calc" style={{ padding: "100px 24px", background: C.card }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: C.gold, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Tax Calculator</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: C.white, fontWeight: 400 }}>How much could you save?</h2>
          </div>
        </FadeIn>
        <FadeIn delay={150}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 40 }}>
            <div>
              <label style={{ color: C.textDim, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Current country</label>
              <select value={country} onChange={e => setCountry(Number(e.target.value))}
                style={{ width: "100%", padding: "14px 16px", background: C.bg, color: C.white, border: `1px solid ${C.border}`, fontSize: 16 }}>
                {COUNTRIES.map((c, i) => <option key={i} value={i}>{c.flag} {c.name}</option>)}
              </select>
            </div>
            <div>
              <label style={{ color: C.textDim, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 8 }}>Annual foreign income</label>
              <select value={income} onChange={e => setIncome(Number(e.target.value))}
                style={{ width: "100%", padding: "14px 16px", background: C.bg, color: C.white, border: `1px solid ${C.border}`, fontSize: 16 }}>
                {[500000, 1000000, 2000000, 5000000, 10000000, 20000000, 50000000].map(v => (
                  <option key={v} value={v}>€{v.toLocaleString()}</option>
                ))}
              </select>
            </div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16 }}>
            <div style={{ background: C.bg, padding: 24, textAlign: "center", border: `1px solid ${C.border}` }}>
              <div style={{ color: C.textDim, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Tax in {c.name}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 28, color: "#ef4444" }}>{fmt(Math.round(currentTax))}</div>
              <div style={{ color: C.textDim, fontSize: 12, marginTop: 4 }}>{(c.rate * 100).toFixed(1)}% effective</div>
            </div>
            <div style={{ background: C.bg, padding: 24, textAlign: "center", border: `1px solid ${C.gold}` }}>
              <div style={{ color: C.textDim, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Tax in Italy (flat)</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 28, color: C.gold }}>{fmt(italyTax)}</div>
              <div style={{ color: C.textDim, fontSize: 12, marginTop: 4 }}>{((200000 / income) * 100).toFixed(2)}% effective</div>
            </div>
            <div style={{ background: C.bg, padding: 24, textAlign: "center", border: `1px solid ${saving > 0 ? "#22c55e" : C.border}` }}>
              <div style={{ color: C.textDim, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", marginBottom: 8 }}>Annual saving</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 28, color: saving > 0 ? "#22c55e" : "#ef4444" }}>{fmt(Math.round(saving))}</div>
              <div style={{ color: C.textDim, fontSize: 12, marginTop: 4 }}>
                {saving > 0 ? `${fmt(Math.round(saving * 15))} over 15 years` : "Italy costs more at this level"}
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

/* ── Pricing Section ── */
function Pricing() {
  return (
    <section id="plans" style={{ padding: "100px 24px", maxWidth: 1200, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ textAlign: "center", marginBottom: 64 }}>
          <div style={{ color: C.gold, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Membership</div>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: C.white, fontWeight: 400 }}>Choose your level of support</h2>
        </div>
      </FadeIn>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 24 }}>
        {TIERS.map((t, i) => (
          <FadeIn key={i} delay={i * 100}>
            <div style={{ background: C.card, border: `1px solid ${t.popular ? C.gold : C.border}`, padding: 40, position: "relative", display: "flex", flexDirection: "column", height: "100%" }}>
              {t.popular && <div style={{ position: "absolute", top: -1, left: 0, right: 0, height: 3, background: C.gold }} />}
              <div style={{ color: C.gold, fontSize: 12, letterSpacing: 3, textTransform: "uppercase", marginBottom: 8 }}>{t.name}</div>
              <div style={{ fontFamily: "Georgia, serif", fontSize: 36, color: C.white, marginBottom: 4 }}>{t.setup}</div>
              <div style={{ color: C.textDim, fontSize: 14, marginBottom: 32 }}>setup + {t.monthly}</div>
              <div style={{ flex: 1 }}>
                {t.features.map((f, j) => (
                  <div key={j} style={{ display: "flex", gap: 10, alignItems: "flex-start", marginBottom: 12 }}>
                    <span style={{ color: C.gold, fontSize: 14, marginTop: 2 }}>✓</span>
                    <span style={{ color: C.text, fontSize: 14, lineHeight: 1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
                style={{ width: "100%", marginTop: 32, padding: "14px 0", border: t.popular ? "none" : `1px solid ${C.gold}`, background: t.popular ? C.gold : "transparent", color: t.popular ? C.bg : C.gold, fontSize: 13, fontWeight: 600, letterSpacing: 2, cursor: "pointer" }}>
                BOOK A CALL
              </button>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ── Contact Form ── */
function Contact() {
  const [sent, setSent] = useState(false);
  const inputStyle = { width: "100%", padding: "14px 16px", background: C.bg, color: C.white, border: `1px solid ${C.border}`, fontSize: 15, boxSizing: "border-box" };
  return (
    <section id="contact" style={{ padding: "100px 24px", background: C.card }}>
      <div style={{ maxWidth: 600, margin: "0 auto" }}>
        <FadeIn>
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <div style={{ color: C.gold, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Get in Touch</div>
            <h2 style={{ fontFamily: "Georgia, serif", fontSize: 36, color: C.white, fontWeight: 400, marginBottom: 16 }}>30-minute discovery call</h2>
            <p style={{ color: C.textDim, fontSize: 15, lineHeight: 1.6 }}>Completely confidential. No obligation. We'll discuss your situation and whether Arrivo Italy is the right fit.</p>
          </div>
        </FadeIn>
        {sent ? (
          <FadeIn>
            <div style={{ textAlign: "center", padding: 48, background: C.bg, border: `1px solid ${C.gold}` }}>
              <div style={{ fontSize: 48, marginBottom: 16 }}>✓</div>
              <h3 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.white, marginBottom: 8 }}>Thank you</h3>
              <p style={{ color: C.textDim }}>We'll be in touch within 24 hours.</p>
            </div>
          </FadeIn>
        ) : (
          <FadeIn delay={150}>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {[["Name", "text"], ["Email", "email"], ["Phone (optional)", "tel"]].map(([label, type]) => (
                <div key={label}>
                  <label style={{ color: C.textDim, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>{label}</label>
                  <input type={type} style={inputStyle} />
                </div>
              ))}
              <div>
                <label style={{ color: C.textDim, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", display: "block", marginBottom: 6 }}>Tell us about your situation</label>
                <textarea rows={4} style={{ ...inputStyle, resize: "vertical", fontFamily: "inherit" }} />
              </div>
              <button onClick={() => setSent(true)}
                style={{ width: "100%", padding: "16px 0", background: C.gold, color: C.bg, border: "none", fontSize: 14, fontWeight: 600, letterSpacing: 2, cursor: "pointer", marginTop: 8 }}>
                REQUEST A CALL
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </section>
  );
}

/* ── Footer ── */
function Footer({ setPage }) {
  return (
    <footer style={{ padding: "60px 24px 32px", borderTop: `1px solid ${C.border}` }}>
      <div style={{ maxWidth: 1200, margin: "0 auto", display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: 32 }}>
        <div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 8, marginBottom: 12 }}>
            <span style={{ fontFamily: "Georgia, serif", fontSize: 20, color: C.gold }}>ARRIVO</span>
            <span style={{ fontSize: 10, color: C.textDim, letterSpacing: 3 }}>ITALY</span>
          </div>
          <p style={{ color: C.textDim, fontSize: 13, maxWidth: 300, lineHeight: 1.6 }}>Premium relocation advisory for high-net-worth individuals. Milan, Italy.</p>
          <p style={{ color: C.textDim, fontSize: 13, marginTop: 8 }}>hello@arrivoitaly.com</p>
        </div>
        <div style={{ display: "flex", gap: 48, flexWrap: "wrap" }}>
          <div>
            <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" }}>Guides</div>
            {ARTICLES.slice(0, 4).map(a => (
              <div key={a.id} style={{ marginBottom: 8 }}>
                <span onClick={() => { setPage(a.id); window.scrollTo(0, 0); }}
                  style={{ color: C.textDim, fontSize: 13, cursor: "pointer", transition: "color 0.2s" }}
                  onMouseEnter={e => e.target.style.color = C.gold}
                  onMouseLeave={e => e.target.style.color = C.textDim}>
                  {a.title.split(":")[0]}
                </span>
              </div>
            ))}
          </div>
          <div>
            <div style={{ color: C.gold, fontSize: 11, letterSpacing: 3, marginBottom: 12, textTransform: "uppercase" }}>Company</div>
            {["About", "Contact", "Privacy Policy"].map(l => (
              <div key={l} style={{ marginBottom: 8 }}>
                <span style={{ color: C.textDim, fontSize: 13, cursor: "pointer" }}>{l}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div style={{ maxWidth: 1200, margin: "40px auto 0", paddingTop: 24, borderTop: `1px solid ${C.border}`, textAlign: "center" }}>
        <p style={{ color: C.textDim, fontSize: 12 }}>© 2026 Arrivo Italy. All rights reserved. This website does not constitute financial, legal, or tax advice.</p>
      </div>
    </footer>
  );
}

/* ── Guides Listing Page ── */
function GuidesPage({ setPage }) {
  return (
    <section style={{ padding: "120px 24px 80px", maxWidth: 1000, margin: "0 auto" }}>
      <FadeIn>
        <div style={{ marginBottom: 56 }}>
          <div style={{ color: C.gold, fontSize: 12, letterSpacing: 4, textTransform: "uppercase", marginBottom: 12 }}>Knowledge Hub</div>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(32px, 5vw, 48px)", color: C.white, fontWeight: 400, marginBottom: 16 }}>Guides for relocating to Italy</h1>
          <p style={{ color: C.textDim, fontSize: 16, lineHeight: 1.6, maxWidth: 600 }}>In-depth, practical guides written for HNWI and their advisors. Updated for 2026.</p>
        </div>
      </FadeIn>
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {ARTICLES.map((a, i) => (
          <FadeIn key={a.id} delay={i * 80}>
            <div onClick={() => { setPage(a.id); window.scrollTo(0, 0); }}
              style={{ background: C.card, border: `1px solid ${C.border}`, padding: "32px 36px", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 24, transition: "all 0.3s" }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = C.goldDim; e.currentTarget.style.background = C.cardHover; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = C.border; e.currentTarget.style.background = C.card; }}>
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 16, marginBottom: 8, flexWrap: "wrap" }}>
                  <span style={{ color: C.gold, fontSize: 11, letterSpacing: 2, textTransform: "uppercase" }}>{a.cat}</span>
                  <span style={{ color: C.textDim, fontSize: 11 }}>{a.read} read</span>
                  <span style={{ color: C.textDim, fontSize: 11 }}>{a.date}</span>
                </div>
                <h3 style={{ fontFamily: "Georgia, serif", fontSize: 20, color: C.white, fontWeight: 400, marginBottom: 8, lineHeight: 1.3 }}>{a.title}</h3>
                <p style={{ color: C.textDim, fontSize: 14, lineHeight: 1.5, margin: 0 }}>{a.desc}</p>
              </div>
              <span style={{ color: C.gold, fontSize: 24, flexShrink: 0 }}>→</span>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}

/* ── Article Content Renderer ── */
function ArticleContent({ blocks }) {
  return blocks.map((block, i) => {
    const key = i;
    switch (block.type) {
      case "p":
        return <p key={key} style={{ color: C.text, fontSize: 16, lineHeight: 1.8, marginBottom: 20 }}>{block.text}</p>;
      case "h2":
        return <h2 key={key} style={{ fontFamily: "Georgia, serif", fontSize: 28, color: C.white, fontWeight: 400, marginTop: 48, marginBottom: 16, paddingBottom: 12, borderBottom: `1px solid ${C.border}` }}>{block.text}</h2>;
      case "h3":
        return <h3 key={key} style={{ fontFamily: "Georgia, serif", fontSize: 21, color: C.gold, fontWeight: 400, marginTop: 32, marginBottom: 12 }}>{block.text}</h3>;
      case "list":
        return (
          <ul key={key} style={{ margin: "0 0 24px 0", paddingLeft: 0, listStyle: "none" }}>
            {block.items.map((item, j) => (
              <li key={j} style={{ color: C.text, fontSize: 15, lineHeight: 1.7, marginBottom: 10, paddingLeft: 24, position: "relative" }}>
                <span style={{ position: "absolute", left: 0, color: C.gold }}>•</span>
                {item}
              </li>
            ))}
          </ul>
        );
      case "table":
        return (
          <div key={key} style={{ overflowX: "auto", marginBottom: 24 }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
              <thead>
                <tr>
                  {block.headers.map((h, j) => (
                    <th key={j} style={{ textAlign: "left", padding: "12px 16px", background: "rgba(201,169,110,0.1)", color: C.gold, fontWeight: 600, fontSize: 12, letterSpacing: 1, textTransform: "uppercase", borderBottom: `2px solid ${C.gold}` }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {block.rows.map((row, j) => (
                  <tr key={j}>
                    {row.map((cell, k) => (
                      <td key={k} style={{ padding: "12px 16px", color: C.text, borderBottom: `1px solid ${C.border}`, lineHeight: 1.5 }}>{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
      case "callout":
        return (
          <div key={key} style={{ background: "rgba(201,169,110,0.08)", borderLeft: `3px solid ${C.gold}`, padding: "20px 24px", marginBottom: 24 }}>
            <p style={{ color: C.text, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{block.text}</p>
          </div>
        );
      case "faq":
        return (
          <div key={key} style={{ marginBottom: 24 }}>
            <h4 style={{ color: C.white, fontSize: 16, fontWeight: 600, marginBottom: 8, fontFamily: "'Segoe UI', sans-serif" }}>{block.q}</h4>
            <p style={{ color: C.textDim, fontSize: 15, lineHeight: 1.7, margin: 0 }}>{block.a}</p>
          </div>
        );
      default:
        return null;
    }
  });
}

/* ── Article Detail Page ── */
function ArticlePage({ id, setPage }) {
  const article = ARTICLES.find(a => a.id === id);
  if (!article) return null;
  return (
    <section style={{ padding: "120px 24px 80px", maxWidth: 780, margin: "0 auto" }}>
      <div style={{ marginBottom: 48 }}>
        <span onClick={() => { setPage("guides"); window.scrollTo(0, 0); }}
          style={{ color: C.gold, fontSize: 13, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          ← Back to Guides
        </span>
        <div style={{ display: "flex", gap: 16, marginBottom: 16, flexWrap: "wrap" }}>
          <span style={{ color: C.gold, fontSize: 11, letterSpacing: 2, textTransform: "uppercase", background: "rgba(201,169,110,0.1)", padding: "4px 12px" }}>{article.cat}</span>
          <span style={{ color: C.textDim, fontSize: 12 }}>{article.read} read · {article.date}</span>
        </div>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "clamp(28px, 4vw, 40px)", color: C.white, fontWeight: 400, lineHeight: 1.25, marginBottom: 20 }}>{article.title}</h1>
        <p style={{ color: C.textDim, fontSize: 17, lineHeight: 1.7 }}>{article.desc}</p>
        <div style={{ height: 2, background: `linear-gradient(to right, ${C.gold}, transparent)`, marginTop: 32 }} />
      </div>

      {/* Full Article Content */}
      <ArticleContent blocks={article.content} />

      {/* CTA Box */}
      <div style={{ background: C.card, border: `1px solid ${C.gold}`, padding: 48, textAlign: "center", marginTop: 48 }}>
        <h3 style={{ fontFamily: "Georgia, serif", fontSize: 24, color: C.white, fontWeight: 400, marginBottom: 12 }}>Want personalized guidance?</h3>
        <p style={{ color: C.textDim, fontSize: 14, lineHeight: 1.6, maxWidth: 400, margin: "0 auto 24px" }}>Our team can walk you through the specifics of your situation in a confidential 30-minute call.</p>
        <button onClick={() => { setPage("home"); setTimeout(() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" }), 100); }}
          style={{ background: C.gold, color: C.bg, padding: "14px 36px", border: "none", fontSize: 13, fontWeight: 600, letterSpacing: 2, cursor: "pointer" }}>
          BOOK A CALL
        </button>
      </div>

      {/* Related Articles */}
      <div style={{ marginTop: 64, paddingTop: 32, borderTop: `1px solid ${C.border}` }}>
        <div style={{ color: C.textDim, fontSize: 12, letterSpacing: 2, textTransform: "uppercase", marginBottom: 16 }}>More Guides</div>
        {ARTICLES.filter(a => a.id !== id).slice(0, 3).map(a => (
          <div key={a.id} onClick={() => { setPage(a.id); window.scrollTo(0, 0); }}
            style={{ padding: "16px 0", borderBottom: `1px solid ${C.border}`, cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center" }}
            onMouseEnter={e => e.currentTarget.querySelector("h4").style.color = C.gold}
            onMouseLeave={e => e.currentTarget.querySelector("h4").style.color = C.white}>
            <div>
              <span style={{ color: C.gold, fontSize: 10, letterSpacing: 2, textTransform: "uppercase" }}>{a.cat}</span>
              <h4 style={{ fontFamily: "Georgia, serif", fontSize: 16, color: C.white, fontWeight: 400, margin: "4px 0 0", transition: "color 0.2s" }}>{a.title}</h4>
            </div>
            <span style={{ color: C.gold }}>→</span>
          </div>
        ))}
      </div>
    </section>
  );
}

/* ── Main App ── */
export default function App() {
  const [page, setPage] = useState("home");
  const isArticle = ARTICLES.some(a => a.id === page);

  return (
    <div style={{ background: C.bg, minHeight: "100vh", fontFamily: "'Segoe UI', -apple-system, sans-serif", color: C.text }}>
      <Nav setPage={setPage} />
      {page === "home" && (
        <>
          <Hero setPage={setPage} />
          <ServicesSection />
          <Calculator />
          <Pricing />
          <Contact />
        </>
      )}
      {page === "guides" && <GuidesPage setPage={setPage} />}
      {isArticle && <ArticlePage id={page} setPage={setPage} />}
      <Footer setPage={setPage} />
    </div>
  );
}
