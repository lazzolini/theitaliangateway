import { useState, useEffect, useRef } from "react";
import ARTICLES from "./articles.js";

const C = {
  bg: "#0A0E17", card: "#111827", cardHover: "#1a2332",
  gold: "#C9A96E", goldLight: "#E8D5A8", goldDim: "#8B7542",
  text: "#E5E7EB", textDim: "#9CA3AF", white: "#FFFFFF",
  accent: "#1B3A5C", border: "#1F2937",
};

const SERVICES = [
  { icon: "\u{1F3E6}", title: "Private Banking", desc: "Account opening, wealth advisory introductions, family office coordination across Italian and Swiss institutions" },
  { icon: "\u2696\uFE0F", title: "Tax & Legal", desc: "Flat tax optimization, cross-border succession planning, patrimony structuring, trust & holding setup" },
  { icon: "\u{1F3E0}", title: "Real Estate", desc: "Property search in Milan, Lake Como & Tuscany. Due diligence, negotiation, and renovation management" },
  { icon: "\u{1F3E5}", title: "Healthcare", desc: "Private English-speaking GP, VIP access to San Raffaele, Humanitas, IEO. Home care coordination" },
  { icon: "\u{1F393}", title: "Education", desc: "International school placement: ASM, ISM, St. Louis, Sir James Henderson. University guidance" },
  { icon: "\u{1F6C2}", title: "Immigration", desc: "Residence permits, golden visa, citizenship pathway, corporate setup. Full bureaucratic fast-track" },
];

const TIERS = [
  { name: "Essential", setup: "\u20AC5,000", monthly: "\u20AC500/mo", features: ["Tax optimization assessment", "1 private banking introduction", "Property search (5 viewings)", "School placement guidance", "Email support"] },
  { name: "Premium", setup: "\u20AC10,000", monthly: "\u20AC1,500/mo", popular: true, features: ["Everything in Essential", "Full fiscal structuring", "3 banking introductions", "Dedicated property negotiation", "Health concierge & GP setup", "Immigration management", "Staff recruitment coordination"] },
  { name: "Family Office", setup: "\u20AC25,000", monthly: "\u20AC3,000/mo", features: ["Everything in Premium", "Family office coordination", "Cross-border succession planning", "Corporate setup Italy/EU", "Domestic staff vetting & management", "Property security & maintenance", "Transport logistics (jet card, helicopter)", "24/7 dedicated contact"] },
];

const COUNTRIES = [
  { name: "United Kingdom", rate: 0.45, flag: "\u{1F1EC}\u{1F1E7}" },
  { name: "United States (NYC)", rate: 0.519, flag: "\u{1F1FA}\u{1F1F8}" },
  { name: "Germany", rate: 0.45, flag: "\u{1F1E9}\u{1F1EA}" },
  { name: "France", rate: 0.45, flag: "\u{1F1EB}\u{1F1F7}" },
  { name: "Switzerland", rate: 0.40, flag: "\u{1F1E8}\u{1F1ED}" },
  { name: "Netherlands", rate: 0.495, flag: "\u{1F1F3}\u{1F1F1}" },
  { name: "Sweden", rate: 0.52, flag: "\u{1F1F8}\u{1F1EA}" },
  { name: "Australia", rate: 0.45, flag: "\u{1F1E6}\u{1F1FA}" },
  { name: "Singapore", rate: 0.22, flag: "\u{1F1F8}\u{1F1EC}" },
  { name: "UAE (Dubai)", rate: 0, flag: "\u{1F1E6}\u{1F1EA}" },
];

const QUIZ_QUESTIONS = [
  { q: "What\u2019s your ideal weekend?", opts: [
    { text: "Sailing on the lake, dinner at a lakeside restaurant", score: { como: 3, tuscany: 0, amalfi: 1, milan: 0 } },
    { text: "Wine tasting and a long lunch in the countryside", score: { como: 0, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "Art gallery, opera, then cocktails at a rooftop bar", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Morning swim in the sea, afternoon exploring a cliffside village", score: { como: 0, tuscany: 1, amalfi: 3, milan: 0 } },
  ]},
  { q: "How important is proximity to an international airport?", opts: [
    { text: "Essential \u2014 I travel every week", score: { como: 1, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Important \u2014 monthly flights", score: { como: 2, tuscany: 1, amalfi: 0, milan: 2 } },
    { text: "Nice to have, but not critical", score: { como: 1, tuscany: 2, amalfi: 1, milan: 0 } },
    { text: "I\u2019m here to slow down", score: { como: 1, tuscany: 3, amalfi: 2, milan: 0 } },
  ]},
  { q: "Your ideal home is:", opts: [
    { text: "A historic villa with lake views and a private dock", score: { como: 3, tuscany: 0, amalfi: 1, milan: 0 } },
    { text: "A restored farmhouse with olive groves and vineyards", score: { como: 0, tuscany: 3, amalfi: 0, milan: 0 } },
    { text: "A modern penthouse with skyline views", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "A cliffside villa overlooking the Mediterranean", score: { como: 0, tuscany: 0, amalfi: 3, milan: 0 } },
  ]},
  { q: "What matters most for your daily life?", opts: [
    { text: "World-class healthcare nearby", score: { como: 1, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Nature, space, and tranquility", score: { como: 2, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "Culture, restaurants, social life", score: { como: 1, tuscany: 1, amalfi: 1, milan: 3 } },
    { text: "Year-round warm climate", score: { como: 0, tuscany: 1, amalfi: 3, milan: 0 } },
  ]},
  { q: "Your social style is:", opts: [
    { text: "Intimate dinners with a close circle", score: { como: 3, tuscany: 2, amalfi: 1, milan: 0 } },
    { text: "Hosting friends at my country estate", score: { como: 1, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "Gallery openings, business clubs, networking", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Beach clubs and summer parties", score: { como: 0, tuscany: 0, amalfi: 3, milan: 1 } },
  ]},
  { q: "How do you feel about winter?", opts: [
    { text: "Love it \u2014 skiing is 30 minutes away", score: { como: 3, tuscany: 0, amalfi: 0, milan: 2 } },
    { text: "Cozy fireplaces, truffle season, quiet evenings", score: { como: 1, tuscany: 3, amalfi: 0, milan: 0 } },
    { text: "I\u2019d prefer mild winters year-round", score: { como: 0, tuscany: 1, amalfi: 3, milan: 0 } },
    { text: "I\u2019ll escape to warmer places when it\u2019s cold", score: { como: 0, tuscany: 0, amalfi: 1, milan: 3 } },
  ]},
  { q: "What\u2019s your budget for a primary residence?", opts: [
    { text: "\u20AC1M \u2013 \u20AC3M", score: { como: 1, tuscany: 2, amalfi: 1, milan: 3 } },
    { text: "\u20AC3M \u2013 \u20AC7M", score: { como: 2, tuscany: 3, amalfi: 2, milan: 2 } },
    { text: "\u20AC7M \u2013 \u20AC15M", score: { como: 3, tuscany: 2, amalfi: 3, milan: 1 } },
    { text: "\u20AC15M+", score: { como: 3, tuscany: 2, amalfi: 2, milan: 1 } },
  ]},
  { q: "Do you have school-age children?", opts: [
    { text: "Yes \u2014 international school is essential", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "Yes, but boarding school works", score: { como: 2, tuscany: 2, amalfi: 1, milan: 1 } },
    { text: "No, grown up", score: { como: 2, tuscany: 2, amalfi: 2, milan: 1 } },
    { text: "No children", score: { como: 2, tuscany: 2, amalfi: 2, milan: 1 } },
  ]},
  { q: "How do you want to get around?", opts: [
    { text: "Boat", score: { como: 3, tuscany: 0, amalfi: 2, milan: 0 } },
    { text: "My car through rolling hills", score: { como: 1, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "Walking \u2014 everything within reach", score: { como: 0, tuscany: 0, amalfi: 1, milan: 3 } },
    { text: "Private driver", score: { como: 2, tuscany: 2, amalfi: 2, milan: 1 } },
  ]},
  { q: "What will make you feel truly at home?", opts: [
    { text: "Waking up to mountains reflected in still water", score: { como: 3, tuscany: 0, amalfi: 0, milan: 0 } },
    { text: "The smell of cypress trees and morning espresso on the terrace", score: { como: 0, tuscany: 3, amalfi: 1, milan: 0 } },
    { text: "The energy of a world-class city at my doorstep", score: { como: 0, tuscany: 0, amalfi: 0, milan: 3 } },
    { text: "The sound of waves and the warmth of the Mediterranean sun", score: { como: 0, tuscany: 0, amalfi: 3, milan: 0 } },
  ]},
];

const QUIZ_RESULTS = {
  como: { title: "Lake Como", emoji: "\u{1F3D4}\uFE0F", subtitle: "Elegant, discreet, timeless", desc: "You\u2019re drawn to understated luxury and natural beauty. Lake Como offers the perfect blend of privacy, proximity to Milan and Switzerland, and a social scene that values quality over quantity.", highlights: ["45 min to Milan Malpensa", "2.5 hours to Zurich", "Skiing in 30 minutes", "World-class hospitals in Milan"] },
  tuscany: { title: "Tuscany", emoji: "\u{1F377}", subtitle: "Space, soul, and the slow life", desc: "You want room to breathe, land to call your own, and a rhythm of life dictated by seasons, not schedules. Tuscany delivers with rolling hills, world-famous wine, and a community of like-minded international residents.", highlights: ["Florence airport 30 min", "Wine culture & gastronomy", "Strong expat community", "7% retiree flat tax eligible"] },
  amalfi: { title: "Amalfi Coast", emoji: "\u{1F30A}", subtitle: "Drama, warmth, and la dolce vita", desc: "You crave the Mediterranean at its most spectacular. The Amalfi Coast offers dramatic cliffs, year-round warmth, and a glamorous lifestyle from Positano to Ravello.", highlights: ["Warm year-round", "Naples airport 1.5 hours", "Capri by boat", "7% retiree flat tax eligible"] },
  milan: { title: "Milan", emoji: "\u{1F3D9}\uFE0F", subtitle: "Culture, commerce, and connectivity", desc: "You want a world-class city that happens to be in Italy. Milan gives you La Scala, Michelin-starred restaurants, three airports, the best hospitals, and the best schools \u2014 all walkable.", highlights: ["3 international airports", "Top healthcare", "6+ international schools", "Direct trains everywhere"] },
};

const PROPERTIES = [
  { id: 1, title: "Lakefront Villa, Bellagio", location: "Lake Como", beds: 6, sqm: 450, price: "\u20AC8.5M", tag: "Lakefront", grad: "135deg, #1a3a4a, #2d5a3d, #1a3a4a" },
  { id: 2, title: "Restored Farmhouse, Chianti", location: "Tuscany", beds: 5, sqm: 380, price: "\u20AC3.2M", tag: "Wine Estate", grad: "135deg, #4a3a1a, #6d5a2d, #4a3a1a" },
  { id: 3, title: "Penthouse, Porta Nuova", location: "Milan", beds: 4, sqm: 280, price: "\u20AC4.8M", tag: "City Living", grad: "135deg, #1a1a3a, #2d2d5a, #1a1a3a" },
  { id: 4, title: "Cliffside Villa, Ravello", location: "Amalfi Coast", beds: 5, sqm: 320, price: "\u20AC6.1M", tag: "Sea View", grad: "135deg, #1a3a5a, #2d5a7a, #1a3a5a" },
  { id: 5, title: "Grand Estate, Cernobbio", location: "Lake Como", beds: 8, sqm: 750, price: "\u20AC18M", tag: "Trophy Estate", grad: "135deg, #0a2a2a, #1d4a3d, #0a2a2a" },
  { id: 6, title: "Hilltop Villa, Val d\u2019Orcia", location: "Tuscany", beds: 7, sqm: 520, price: "\u20AC5.5M", tag: "Panoramic", grad: "135deg, #3a2a1a, #5a4a2d, #3a2a1a" },
  { id: 7, title: "Liberty Apartment, Brera", location: "Milan", beds: 3, sqm: 200, price: "\u20AC2.8M", tag: "Historic", grad: "135deg, #2a1a3a, #4a2d5a, #2a1a3a" },
  { id: 8, title: "Waterfront Villa, Tremezzo", location: "Lake Como", beds: 5, sqm: 400, price: "\u20AC12M", tag: "Private Dock", grad: "135deg, #1a3a3a, #2d5a5a, #1a3a3a" },
];

const COL_CITIES = [
  { name: "London", flag: "\u{1F1EC}\u{1F1E7}", villa: 180000, staff: 85000, health: 35000, dining: 48000, school: 45000, tax: 0.45 },
  { name: "New York", flag: "\u{1F1FA}\u{1F1F8}", villa: 200000, staff: 95000, health: 45000, dining: 55000, school: 60000, tax: 0.519 },
  { name: "Geneva", flag: "\u{1F1E8}\u{1F1ED}", villa: 150000, staff: 110000, health: 30000, dining: 52000, school: 42000, tax: 0.40 },
  { name: "Dubai", flag: "\u{1F1E6}\u{1F1EA}", villa: 120000, staff: 35000, health: 35000, dining: 42000, school: 40000, tax: 0 },
  { name: "Singapore", flag: "\u{1F1F8}\u{1F1EC}", villa: 140000, staff: 25000, health: 28000, dining: 38000, school: 38000, tax: 0.22 },
  { name: "Paris", flag: "\u{1F1EB}\u{1F1F7}", villa: 160000, staff: 75000, health: 20000, dining: 45000, school: 40000, tax: 0.45 },
];
const MILAN = { villa: 72000, staff: 30000, health: 15000, dining: 25000, school: 25000, tax: 200000 };

function FadeIn({ children, delay = 0 }) {
  const ref = useRef(null);
  const [v, setV] = useState(false);
  useEffect(() => { const el = ref.current; if (!el) return; const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setTimeout(() => setV(true), delay); obs.disconnect(); } }, { threshold: 0.1 }); obs.observe(el); return () => obs.disconnect(); }, [delay]);
  return <div ref={ref} style={{ opacity: v ? 1 : 0, transform: v ? "translateY(0)" : "translateY(24px)", transition: "opacity 0.7s ease, transform 0.7s ease" }}>{children}</div>;
}

function Nav({ setPage }) {
  const [sc, setSc] = useState(false);
  useEffect(() => { const h = () => setSc(window.scrollY > 40); window.addEventListener("scroll", h); return () => window.removeEventListener("scroll", h); }, []);
  const go = t => { if (["guides","quiz","properties"].includes(t)) { setPage(t); window.scrollTo(0,0); } else { setPage("home"); setTimeout(() => document.getElementById(t)?.scrollIntoView({ behavior: "smooth" }), 100); } };
  return (
    <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:50,background:sc?"rgba(10,14,23,0.97)":"transparent",backdropFilter:sc?"blur(12px)":"none",borderBottom:sc?`1px solid ${C.border}`:"none",transition:"all 0.3s" }}>
      <div style={{ maxWidth:1200,margin:"0 auto",padding:"16px 24px",display:"flex",alignItems:"center",justifyContent:"space-between" }}>
        <div style={{ cursor:"pointer",display:"flex",alignItems:"baseline",gap:6 }} onClick={() => { setPage("home"); window.scrollTo(0,0); }}>
          <span style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.gold,fontWeight:400,letterSpacing:1 }}>THE ITALIAN</span>
          <span style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.white,fontWeight:400,letterSpacing:1,marginLeft:6 }}>GATEWAY</span>
        </div>
        <div style={{ display:"flex",gap:24,alignItems:"center",flexWrap:"wrap" }}>
          {[["Guides","guides"],["Quiz","quiz"],["Properties","properties"],["Plans","plans"],["Contact","contact"]].map(([l,t]) =>
            <span key={t} onClick={() => go(t)} style={{ color:C.textDim,fontSize:14,cursor:"pointer",letterSpacing:1,transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.textDim}>{l}</span>
          )}
          <button onClick={() => go("contact")} style={{ background:C.gold,color:C.bg,padding:"10px 24px",border:"none",fontSize:13,fontWeight:600,letterSpacing:1,cursor:"pointer" }}>BOOK A CALL</button>
        </div>
      </div>
    </nav>
  );
}

function Hero({ setPage }) {
  return (
    <section style={{ minHeight:"100vh",display:"flex",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden",background:`linear-gradient(160deg,${C.bg} 0%,#0d1423 50%,#111827 100%)` }}>
      <div style={{ position:"absolute",inset:0,opacity:0.04,backgroundImage:"radial-gradient(circle at 25% 25%,#C9A96E 1px,transparent 1px)",backgroundSize:"60px 60px" }}/>
      <div style={{ position:"relative",textAlign:"center",maxWidth:800,padding:"120px 24px 80px" }}>
        <FadeIn><div style={{ fontSize:13,color:C.gold,letterSpacing:6,textTransform:"uppercase",marginBottom:32 }}>Premium Relocation Advisory</div></FadeIn>
        <FadeIn delay={150}><h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(36px,6vw,64px)",color:C.white,fontWeight:400,lineHeight:1.15,margin:"0 0 24px" }}>Your gateway to<br/><span style={{ color:C.gold }}>Italian living</span></h1></FadeIn>
        <FadeIn delay={300}><p style={{ color:C.textDim,fontSize:18,lineHeight:1.7,maxWidth:600,margin:"0 auto 48px" }}>We guide high-net-worth individuals and families to their ideal life in Italy. Tax optimization, private banking, real estate, healthcare, education, and domestic staff \u2014 all through a single, confidential point of contact.</p></FadeIn>
        <FadeIn delay={450}><div style={{ display:"flex",gap:16,justifyContent:"center",flexWrap:"wrap" }}>
          <button onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior:"smooth" })} style={{ background:C.gold,color:C.bg,padding:"16px 40px",border:"none",fontSize:14,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>BOOK A CALL</button>
          <button onClick={() => { setPage("quiz"); window.scrollTo(0,0); }} style={{ background:"transparent",color:C.gold,padding:"16px 40px",border:`1px solid ${C.gold}`,fontSize:14,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>TAKE THE QUIZ</button>
        </div></FadeIn>
        <FadeIn delay={600}><div style={{ display:"flex",gap:48,justifyContent:"center",marginTop:64,flexWrap:"wrap" }}>
          {[["\u20AC200K","Annual flat tax"],["15 yrs","Tax certainty"],["#2 WHO","Healthcare ranking"]].map(([n,l]) =>
            <div key={n} style={{ textAlign:"center" }}><div style={{ fontFamily:"Georgia,serif",fontSize:32,color:C.gold }}>{n}</div><div style={{ color:C.textDim,fontSize:12,letterSpacing:2,marginTop:4,textTransform:"uppercase" }}>{l}</div></div>
          )}
        </div></FadeIn>
      </div>
    </section>
  );
}

function ServicesSection() {
  return (
    <section style={{ padding:"100px 24px",maxWidth:1200,margin:"0 auto" }}>
      <FadeIn><div style={{ textAlign:"center",marginBottom:64 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>What We Do</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400 }}>Six verticals, one point of contact</h2></div></FadeIn>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(300px,1fr))",gap:24 }}>
        {SERVICES.map((s,i) => <FadeIn key={i} delay={i*80}><div style={{ background:C.card,border:`1px solid ${C.border}`,padding:32,transition:"all 0.3s",height:"100%" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.goldDim;e.currentTarget.style.background=C.cardHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card}}><div style={{ fontSize:32,marginBottom:16 }}>{s.icon}</div><h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:8 }}>{s.title}</h3><p style={{ color:C.textDim,fontSize:14,lineHeight:1.6,margin:0 }}>{s.desc}</p></div></FadeIn>)}
      </div>
    </section>
  );
}

function RetireeSection({ setPage }) {
  const items = [
    { icon:"\u{1F3E5}", title:"Healthcare, Handled", desc:"English-speaking private GP on retainer, fast-track specialist access at San Raffaele and Humanitas, home care coordination, and medical concierge for visiting family." },
    { icon:"\u{1F4CB}", title:"Succession Planning", desc:"Cross-border inheritance structuring for families spread across 2-3 countries. We coordinate between your Italian, UK, Swiss, and US advisors." },
    { icon:"\u{1F468}\u200D\u{1F373}", title:"Domestic Staff", desc:"Vetted, qualified staff \u2014 custodian, cook, driver, gardener. And a dedicated house manager to coordinate them all. Employment contracts, payroll, everything handled." },
    { icon:"\u{1F510}", title:"Property & Security", desc:"Maintenance, security systems, and property management when you\u2019re away. Your villa is looked after year-round." },
    { icon:"\u{1F91D}", title:"Community & Social", desc:"Introductions to golf clubs, yacht clubs, cultural associations, and the international community. Loneliness is the real enemy \u2014 we make sure it never visits." },
    { icon:"\u{1F681}", title:"Transport & Logistics", desc:"Helicopter transfers Como-Milan, jet card setup, airport VIP services, chauffeur arrangements. Move seamlessly between your Italian life and the world." },
  ];
  return (
    <section style={{ padding:"100px 24px",background:C.card }}>
      <div style={{ maxWidth:1000,margin:"0 auto" }}>
        <FadeIn><div style={{ textAlign:"center",marginBottom:56 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>For Retirees & Empty Nesters</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400,marginBottom:16 }}>Your next chapter deserves more than a tax strategy</h2><p style={{ color:C.textDim,fontSize:16,lineHeight:1.7,maxWidth:650,margin:"0 auto" }}>The best years of your life should feel effortless. We handle everything so you can focus on living.</p></div></FadeIn>
        <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:20 }}>
          {items.map((it,i) => <FadeIn key={i} delay={i*80}><div style={{ background:C.bg,border:`1px solid ${C.border}`,padding:28,height:"100%" }}><div style={{ fontSize:28,marginBottom:12 }}>{it.icon}</div><h3 style={{ fontFamily:"Georgia,serif",fontSize:18,color:C.white,fontWeight:400,marginBottom:8 }}>{it.title}</h3><p style={{ color:C.textDim,fontSize:13,lineHeight:1.6,margin:0 }}>{it.desc}</p></div></FadeIn>)}
        </div>
        <FadeIn delay={500}><div style={{ textAlign:"center",marginTop:48 }}><button onClick={() => { setPage("quiz"); window.scrollTo(0,0); }} style={{ background:"transparent",color:C.gold,padding:"14px 36px",border:`1px solid ${C.gold}`,fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>DISCOVER YOUR IDEAL LOCATION \u2192</button></div></FadeIn>
      </div>
    </section>
  );
}

function CostOfLiving() {
  const [ci, setCi] = useState(0);
  const [inc, setInc] = useState(3000000);
  const c = COL_CITIES[ci];
  const m = MILAN;
  const cTax = inc * c.tax;
  const fmt = n => `\u20AC${Math.round(n).toLocaleString()}`;
  const rows = [
    ["\u{1F3E0} Villa / Apartment", c.villa, m.villa],
    ["\u{1F468}\u200D\u{1F373} Domestic Staff", c.staff, m.staff],
    ["\u{1F3E5} Healthcare (family)", c.health, m.health],
    ["\u{1F377} Dining & Lifestyle", c.dining, m.dining],
    ["\u{1F393} International School", c.school, m.school],
    ["\u{1F4B0} Tax (foreign income)", cTax, m.tax],
  ];
  const cTotal = rows.reduce((s,r)=>s+r[1],0);
  const mTotal = rows.reduce((s,r)=>s+r[2],0);
  const saving = cTotal - mTotal;
  return (
    <section id="cost" style={{ padding:"100px 24px",maxWidth:900,margin:"0 auto" }}>
      <FadeIn><div style={{ textAlign:"center",marginBottom:48 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Cost of Living</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400,marginBottom:12 }}>Live better, spend less</h2><p style={{ color:C.textDim,fontSize:15 }}>A complete comparison \u2014 not just taxes</p></div></FadeIn>
      <FadeIn delay={100}>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:24,marginBottom:32 }}>
          <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:8 }}>Compare with</label><select value={ci} onChange={e=>setCi(+e.target.value)} style={{ width:"100%",padding:"14px 16px",background:C.card,color:C.white,border:`1px solid ${C.border}`,fontSize:16 }}>{COL_CITIES.map((x,i)=><option key={i} value={i}>{x.flag} {x.name}</option>)}</select></div>
          <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:8 }}>Annual foreign income</label><select value={inc} onChange={e=>setInc(+e.target.value)} style={{ width:"100%",padding:"14px 16px",background:C.card,color:C.white,border:`1px solid ${C.border}`,fontSize:16 }}>{[1000000,2000000,3000000,5000000,10000000,20000000].map(v=><option key={v} value={v}>\u20AC{v.toLocaleString()}</option>)}</select></div>
        </div>
        <div style={{ overflowX:"auto" }}>
          <table style={{ width:"100%",borderCollapse:"collapse" }}>
            <thead><tr>{["EXPENSE",`${c.flag} ${c.name.toUpperCase()}`,"\u{1F1EE}\u{1F1F9} MILAN","SAVING"].map((h,i)=><th key={i} style={{ textAlign:i===0?"left":"right",padding:"14px 16px",borderBottom:`2px solid ${C.gold}`,color:i===2?C.gold:C.textDim,fontSize:12,letterSpacing:1 }}>{h}</th>)}</tr></thead>
            <tbody>
              {rows.map(([label,cv,mv],i)=><tr key={i}><td style={{ padding:"14px 16px",borderBottom:`1px solid ${C.border}`,color:C.text,fontSize:14 }}>{label}</td><td style={{ padding:"14px 16px",borderBottom:`1px solid ${C.border}`,color:"#ef4444",fontSize:14,textAlign:"right" }}>{fmt(cv)}</td><td style={{ padding:"14px 16px",borderBottom:`1px solid ${C.border}`,color:C.gold,fontSize:14,textAlign:"right" }}>{fmt(mv)}</td><td style={{ padding:"14px 16px",borderBottom:`1px solid ${C.border}`,color:cv-mv>0?"#22c55e":"#ef4444",fontSize:14,textAlign:"right",fontWeight:600 }}>{cv-mv>0?"+":""}{fmt(cv-mv)}</td></tr>)}
              <tr><td style={{ padding:"16px",borderTop:`2px solid ${C.gold}`,color:C.white,fontSize:15,fontWeight:600 }}>TOTAL</td><td style={{ padding:"16px",borderTop:`2px solid ${C.gold}`,color:"#ef4444",fontSize:18,textAlign:"right",fontWeight:600,fontFamily:"Georgia,serif" }}>{fmt(cTotal)}</td><td style={{ padding:"16px",borderTop:`2px solid ${C.gold}`,color:C.gold,fontSize:18,textAlign:"right",fontWeight:600,fontFamily:"Georgia,serif" }}>{fmt(mTotal)}</td><td style={{ padding:"16px",borderTop:`2px solid ${C.gold}`,color:saving>0?"#22c55e":"#ef4444",fontSize:18,textAlign:"right",fontWeight:600,fontFamily:"Georgia,serif" }}>{saving>0?"+":""}{fmt(saving)}</td></tr>
            </tbody>
          </table>
        </div>
        {saving > 0 && <div style={{ textAlign:"center",marginTop:32,padding:24,background:"rgba(34,197,94,0.08)",border:"1px solid rgba(34,197,94,0.2)" }}><p style={{ color:"#22c55e",fontSize:14,margin:0 }}>Over 15 years: <strong style={{ fontFamily:"Georgia,serif",fontSize:20 }}>{fmt(saving*15)}</strong> saved</p></div>}
      </FadeIn>
    </section>
  );
}

function QuizPage({ setPage }) {
  const [step, setStep] = useState(0);
  const [scores, setScores] = useState({ como:0, tuscany:0, amalfi:0, milan:0 });
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const pick = sc => { const ns = {...scores}; Object.keys(sc).forEach(k=>ns[k]+=sc[k]); setScores(ns); setStep(step+1); };
  const winner = Object.entries(scores).sort((a,b)=>b[1]-a[1])[0][0];
  const result = QUIZ_RESULTS[winner];
  const pct = (step / QUIZ_QUESTIONS.length) * 100;

  if (step >= QUIZ_QUESTIONS.length) return (
    <section style={{ padding:"120px 24px 80px",maxWidth:700,margin:"0 auto" }}>
      <FadeIn><div style={{ textAlign:"center",marginBottom:48 }}><div style={{ fontSize:64,marginBottom:16 }}>{result.emoji}</div><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Your Italian Home</div><h1 style={{ fontFamily:"Georgia,serif",fontSize:44,color:C.white,fontWeight:400,marginBottom:8 }}>{result.title}</h1><p style={{ color:C.gold,fontSize:18,fontStyle:"italic" }}>{result.subtitle}</p></div></FadeIn>
      <FadeIn delay={200}><p style={{ color:C.text,fontSize:16,lineHeight:1.8,marginBottom:32 }}>{result.desc}</p>
        <div style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:12,marginBottom:48 }}>{result.highlights.map((h,i)=><div key={i} style={{ display:"flex",gap:10,alignItems:"center" }}><span style={{ color:C.gold }}>\u2713</span><span style={{ color:C.textDim,fontSize:14 }}>{h}</span></div>)}</div>
      </FadeIn>
      <FadeIn delay={400}><div style={{ background:C.card,border:`1px solid ${C.gold}`,padding:40,textAlign:"center" }}>
        {sent ? <><div style={{ fontSize:48,marginBottom:12 }}>\u2713</div><h3 style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.white,marginBottom:8 }}>Your personalized guide is on the way</h3><p style={{ color:C.textDim,fontSize:14 }}>Check your inbox in the next 24 hours.</p></> : <><h3 style={{ fontFamily:"Georgia,serif",fontSize:22,color:C.white,marginBottom:8 }}>Get your personalized {result.title} guide</h3><p style={{ color:C.textDim,fontSize:14,marginBottom:24 }}>Property insights, lifestyle tips, and tax specifics.</p><div style={{ display:"flex",gap:12,maxWidth:440,margin:"0 auto" }}><input type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} style={{ flex:1,padding:"14px 16px",background:C.bg,color:C.white,border:`1px solid ${C.border}`,fontSize:15 }}/><button onClick={()=>setSent(true)} style={{ background:C.gold,color:C.bg,padding:"14px 28px",border:"none",fontSize:13,fontWeight:600,letterSpacing:1,cursor:"pointer",whiteSpace:"nowrap" }}>SEND GUIDE</button></div></>}
      </div></FadeIn>
      <FadeIn delay={500}><div style={{ display:"flex",gap:16,justifyContent:"center",marginTop:32,flexWrap:"wrap" }}>
        <button onClick={()=>{setStep(0);setScores({como:0,tuscany:0,amalfi:0,milan:0});setSent(false);setEmail("")}} style={{ color:C.textDim,background:"none",border:`1px solid ${C.border}`,padding:"10px 24px",fontSize:13,cursor:"pointer" }}>Retake Quiz</button>
        <button onClick={()=>{setPage("properties");window.scrollTo(0,0)}} style={{ color:C.gold,background:"none",border:`1px solid ${C.gold}`,padding:"10px 24px",fontSize:13,cursor:"pointer" }}>Browse Properties \u2192</button>
      </div></FadeIn>
    </section>
  );

  const q = QUIZ_QUESTIONS[step];
  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:650,margin:"0 auto" }}>
      <div style={{ marginBottom:40 }}><span onClick={()=>{if(step>0)setStep(step-1);else{setPage("home");window.scrollTo(0,0)}}} style={{ color:C.gold,fontSize:13,cursor:"pointer" }}>\u2190 {step>0?"Previous":"Home"}</span></div>
      <div style={{ marginBottom:32 }}><div style={{ display:"flex",justifyContent:"space-between",marginBottom:8 }}><span style={{ color:C.textDim,fontSize:12 }}>Question {step+1} of {QUIZ_QUESTIONS.length}</span><span style={{ color:C.gold,fontSize:12 }}>{Math.round(pct)}%</span></div><div style={{ height:3,background:C.border }}><div style={{ height:3,background:C.gold,width:pct+"%",transition:"width 0.4s" }}/></div></div>
      <FadeIn key={step}><h2 style={{ fontFamily:"Georgia,serif",fontSize:28,color:C.white,fontWeight:400,marginBottom:32,lineHeight:1.3 }}>{q.q}</h2>
        <div style={{ display:"flex",flexDirection:"column",gap:12 }}>{q.opts.map((o,i)=><button key={i} onClick={()=>pick(o.score)} style={{ textAlign:"left",padding:"20px 24px",background:C.card,border:`1px solid ${C.border}`,color:C.text,fontSize:15,lineHeight:1.5,cursor:"pointer",transition:"all 0.2s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.gold;e.currentTarget.style.background=C.cardHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card}}>{o.text}</button>)}</div>
      </FadeIn>
    </section>
  );
}

function PropertyGallery({ setPage }) {
  const [req, setReq] = useState({});
  const [form, setForm] = useState(null);
  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:1200,margin:"0 auto" }}>
      <FadeIn><div style={{ marginBottom:56 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Curated Selection</div><h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,48px)",color:C.white,fontWeight:400,marginBottom:16 }}>Properties for international buyers</h1><p style={{ color:C.textDim,fontSize:16,lineHeight:1.6,maxWidth:600 }}>A private selection of exceptional properties across Italy\u2019s most sought-after locations. Updated monthly.</p></div></FadeIn>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24 }}>
        {PROPERTIES.map((p,i) => <FadeIn key={p.id} delay={i*60}><div style={{ background:C.card,border:`1px solid ${C.border}`,overflow:"hidden",transition:"all 0.3s" }} onMouseEnter={e=>e.currentTarget.style.borderColor=C.goldDim} onMouseLeave={e=>e.currentTarget.style.borderColor=C.border}>
          <div style={{ height:200,background:`linear-gradient(${p.grad})`,position:"relative",display:"flex",alignItems:"center",justifyContent:"center" }}><span style={{ fontFamily:"Georgia,serif",fontSize:48,color:"rgba(255,255,255,0.15)" }}>\u{1F3E1}</span><div style={{ position:"absolute",top:12,left:12,background:"rgba(201,169,110,0.9)",color:C.bg,padding:"4px 12px",fontSize:11,fontWeight:600,letterSpacing:1 }}>{p.tag}</div></div>
          <div style={{ padding:24 }}>
            <h3 style={{ fontFamily:"Georgia,serif",fontSize:18,color:C.white,fontWeight:400,marginBottom:4 }}>{p.title}</h3>
            <p style={{ color:C.textDim,fontSize:13,marginBottom:12 }}>{p.location}</p>
            <div style={{ display:"flex",gap:16,marginBottom:16 }}><span style={{ color:C.textDim,fontSize:12 }}>{p.beds} beds</span><span style={{ color:C.textDim,fontSize:12 }}>{p.sqm} sqm</span><span style={{ color:C.gold,fontSize:12,fontWeight:600 }}>{p.price}</span></div>
            {req[p.id] ? <div style={{ padding:"12px 0",textAlign:"center",color:C.gold,fontSize:13 }}>\u2713 Viewing requested</div> : form===p.id ? <div style={{ display:"flex",gap:8 }}><input type="email" placeholder="Your email" style={{ flex:1,padding:"10px 12px",background:C.bg,color:C.white,border:`1px solid ${C.border}`,fontSize:13 }}/><button onClick={()=>{setReq({...req,[p.id]:true});setForm(null)}} style={{ background:C.gold,color:C.bg,padding:"10px 16px",border:"none",fontSize:12,fontWeight:600,cursor:"pointer" }}>SEND</button></div> : <button onClick={()=>setForm(p.id)} style={{ width:"100%",padding:"12px 0",border:`1px solid ${C.gold}`,background:"transparent",color:C.gold,fontSize:13,fontWeight:600,letterSpacing:1,cursor:"pointer",transition:"all 0.2s" }} onMouseEnter={e=>{e.target.style.background=C.gold;e.target.style.color=C.bg}} onMouseLeave={e=>{e.target.style.background="transparent";e.target.style.color=C.gold}}>REQUEST PRIVATE VIEWING</button>}
          </div>
        </div></FadeIn>)}
      </div>
      <FadeIn delay={500}><div style={{ textAlign:"center",marginTop:48,padding:32,background:C.card,border:`1px solid ${C.border}` }}><p style={{ color:C.textDim,fontSize:14,marginBottom:16 }}>Our best properties sell off-market. Join our private list for early access.</p><button onClick={()=>{setPage("home");setTimeout(()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}),100)}} style={{ background:C.gold,color:C.bg,padding:"14px 36px",border:"none",fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>JOIN PRIVATE LIST</button></div></FadeIn>
    </section>
  );
}

function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  return (
    <section style={{ padding:"80px 24px",background:"rgba(201,169,110,0.04)",borderTop:`1px solid ${C.border}`,borderBottom:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:600,margin:"0 auto",textAlign:"center" }}>
        <FadeIn><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Weekly Dispatch</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:28,color:C.white,fontWeight:400,marginBottom:12 }}>Retire to Italy</h2><p style={{ color:C.textDim,fontSize:14,lineHeight:1.6,marginBottom:32 }}>One email per week. A featured property, a tax insight, and a taste of Italian life. Unsubscribe anytime.</p>
          {done ? <p style={{ color:C.gold,fontSize:15 }}>\u2713 You\u2019re in. First dispatch arrives next Monday.</p> : <div style={{ display:"flex",gap:12,maxWidth:440,margin:"0 auto" }}><input type="email" placeholder="Your email" value={email} onChange={e=>setEmail(e.target.value)} style={{ flex:1,padding:"14px 16px",background:C.card,color:C.white,border:`1px solid ${C.border}`,fontSize:15 }}/><button onClick={()=>setDone(true)} style={{ background:C.gold,color:C.bg,padding:"14px 28px",border:"none",fontSize:13,fontWeight:600,letterSpacing:1,cursor:"pointer",whiteSpace:"nowrap" }}>SUBSCRIBE</button></div>}
        </FadeIn>
      </div>
    </section>
  );
}

function Pricing() {
  return (
    <section id="plans" style={{ padding:"100px 24px",maxWidth:1200,margin:"0 auto" }}>
      <FadeIn><div style={{ textAlign:"center",marginBottom:64 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Membership</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400 }}>Choose your level of support</h2></div></FadeIn>
      <div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(280px,1fr))",gap:24 }}>
        {TIERS.map((t,i) => <FadeIn key={i} delay={i*100}><div style={{ background:C.card,border:`1px solid ${t.popular?C.gold:C.border}`,padding:40,position:"relative",display:"flex",flexDirection:"column",height:"100%" }}>
          {t.popular && <div style={{ position:"absolute",top:-1,left:0,right:0,height:3,background:C.gold }}/>}
          <div style={{ color:C.gold,fontSize:12,letterSpacing:3,textTransform:"uppercase",marginBottom:8 }}>{t.name}</div>
          <div style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,marginBottom:4 }}>{t.setup}</div>
          <div style={{ color:C.textDim,fontSize:14,marginBottom:32 }}>setup + {t.monthly}</div>
          <div style={{ flex:1 }}>{t.features.map((f,j)=><div key={j} style={{ display:"flex",gap:10,alignItems:"flex-start",marginBottom:12 }}><span style={{ color:C.gold,fontSize:14,marginTop:2 }}>\u2713</span><span style={{ color:C.text,fontSize:14,lineHeight:1.5 }}>{f}</span></div>)}</div>
          <button onClick={()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"})} style={{ width:"100%",marginTop:32,padding:"14px 0",border:t.popular?"none":`1px solid ${C.gold}`,background:t.popular?C.gold:"transparent",color:t.popular?C.bg:C.gold,fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>BOOK A CALL</button>
        </div></FadeIn>)}
      </div>
    </section>
  );
}

function Contact() {
  const [sent, setSent] = useState(false);
  const is = { width:"100%",padding:"14px 16px",background:C.bg,color:C.white,border:`1px solid ${C.border}`,fontSize:15,boxSizing:"border-box" };
  return (
    <section id="contact" style={{ padding:"100px 24px",background:C.card }}>
      <div style={{ maxWidth:600,margin:"0 auto" }}>
        <FadeIn><div style={{ textAlign:"center",marginBottom:48 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Get in Touch</div><h2 style={{ fontFamily:"Georgia,serif",fontSize:36,color:C.white,fontWeight:400,marginBottom:16 }}>30-minute discovery call</h2><p style={{ color:C.textDim,fontSize:15,lineHeight:1.6 }}>Completely confidential. No obligation.</p></div></FadeIn>
        {sent ? <FadeIn><div style={{ textAlign:"center",padding:48,background:C.bg,border:`1px solid ${C.gold}` }}><div style={{ fontSize:48,marginBottom:16 }}>\u2713</div><h3 style={{ fontFamily:"Georgia,serif",fontSize:24,color:C.white,marginBottom:8 }}>Thank you</h3><p style={{ color:C.textDim }}>We\u2019ll be in touch within 24 hours.</p></div></FadeIn> :
        <FadeIn delay={150}><div style={{ display:"flex",flexDirection:"column",gap:16 }}>
          {[["Name","text"],["Email","email"],["Phone (optional)","tel"]].map(([l,t])=><div key={l}><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 }}>{l}</label><input type={t} style={is}/></div>)}
          <div><label style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",display:"block",marginBottom:6 }}>Tell us about your situation</label><textarea rows={4} style={{ ...is,resize:"vertical",fontFamily:"inherit" }}/></div>
          <button onClick={()=>setSent(true)} style={{ width:"100%",padding:"16px 0",background:C.gold,color:C.bg,border:"none",fontSize:14,fontWeight:600,letterSpacing:2,cursor:"pointer",marginTop:8 }}>REQUEST A CALL</button>
        </div></FadeIn>}
      </div>
    </section>
  );
}

function Footer({ setPage }) {
  return (
    <footer style={{ padding:"60px 24px 32px",borderTop:`1px solid ${C.border}` }}>
      <div style={{ maxWidth:1200,margin:"0 auto",display:"flex",justifyContent:"space-between",flexWrap:"wrap",gap:32 }}>
        <div>
          <div style={{ display:"flex",alignItems:"baseline",gap:6,marginBottom:12 }}><span style={{ fontFamily:"Georgia,serif",fontSize:18,color:C.gold }}>THE ITALIAN</span><span style={{ fontFamily:"Georgia,serif",fontSize:18,color:C.white,marginLeft:6 }}>GATEWAY</span></div>
          <p style={{ color:C.textDim,fontSize:13,maxWidth:300,lineHeight:1.6 }}>Premium relocation advisory for high-net-worth individuals. Milan, Italy.</p>
          <p style={{ color:C.textDim,fontSize:13,marginTop:8 }}>info@theitaliangateway.com</p>
        </div>
        <div style={{ display:"flex",gap:48,flexWrap:"wrap" }}>
          <div><div style={{ color:C.gold,fontSize:11,letterSpacing:3,marginBottom:12,textTransform:"uppercase" }}>Guides</div>{ARTICLES.slice(0,4).map(a=><div key={a.id} style={{ marginBottom:8 }}><span onClick={()=>{setPage(a.id);window.scrollTo(0,0)}} style={{ color:C.textDim,fontSize:13,cursor:"pointer",transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.textDim}>{a.title.split(":")[0]}</span></div>)}</div>
          <div><div style={{ color:C.gold,fontSize:11,letterSpacing:3,marginBottom:12,textTransform:"uppercase" }}>Tools</div>{[["Where Should I Live?","quiz"],["Properties","properties"]].map(([l,t])=><div key={t} style={{ marginBottom:8 }}><span onClick={()=>{setPage(t);window.scrollTo(0,0)}} style={{ color:C.textDim,fontSize:13,cursor:"pointer",transition:"color 0.2s" }} onMouseEnter={e=>e.target.style.color=C.gold} onMouseLeave={e=>e.target.style.color=C.textDim}>{l}</span></div>)}</div>
          <div><div style={{ color:C.gold,fontSize:11,letterSpacing:3,marginBottom:12,textTransform:"uppercase" }}>Company</div>{["About","Contact","Privacy Policy"].map(l=><div key={l} style={{ marginBottom:8 }}><span style={{ color:C.textDim,fontSize:13,cursor:"pointer" }}>{l}</span></div>)}</div>
        </div>
      </div>
      <div style={{ maxWidth:1200,margin:"40px auto 0",paddingTop:24,borderTop:`1px solid ${C.border}`,textAlign:"center" }}><p style={{ color:C.textDim,fontSize:12 }}>\u00A9 2026 The Italian Gateway. All rights reserved. This website does not constitute financial, legal, or tax advice.</p></div>
    </footer>
  );
}

function GuidesPage({ setPage }) {
  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:1000,margin:"0 auto" }}>
      <FadeIn><div style={{ marginBottom:56 }}><div style={{ color:C.gold,fontSize:12,letterSpacing:4,textTransform:"uppercase",marginBottom:12 }}>Knowledge Hub</div><h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(32px,5vw,48px)",color:C.white,fontWeight:400,marginBottom:16 }}>Guides for relocating to Italy</h1><p style={{ color:C.textDim,fontSize:16,lineHeight:1.6,maxWidth:600 }}>In-depth, practical guides written for HNWI and their advisors. Updated for 2026.</p></div></FadeIn>
      <div style={{ display:"flex",flexDirection:"column",gap:20 }}>
        {ARTICLES.map((a,i) => <FadeIn key={a.id} delay={i*80}><div onClick={()=>{setPage(a.id);window.scrollTo(0,0)}} style={{ background:C.card,border:`1px solid ${C.border}`,padding:"32px 36px",cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center",gap:24,transition:"all 0.3s" }} onMouseEnter={e=>{e.currentTarget.style.borderColor=C.goldDim;e.currentTarget.style.background=C.cardHover}} onMouseLeave={e=>{e.currentTarget.style.borderColor=C.border;e.currentTarget.style.background=C.card}}>
          <div style={{ flex:1 }}><div style={{ display:"flex",gap:16,marginBottom:8,flexWrap:"wrap" }}><span style={{ color:C.gold,fontSize:11,letterSpacing:2,textTransform:"uppercase" }}>{a.cat}</span><span style={{ color:C.textDim,fontSize:11 }}>{a.read} read</span><span style={{ color:C.textDim,fontSize:11 }}>{a.date}</span></div><h3 style={{ fontFamily:"Georgia,serif",fontSize:20,color:C.white,fontWeight:400,marginBottom:8,lineHeight:1.3 }}>{a.title}</h3><p style={{ color:C.textDim,fontSize:14,lineHeight:1.5,margin:0 }}>{a.desc}</p></div>
          <span style={{ color:C.gold,fontSize:24,flexShrink:0 }}>\u2192</span>
        </div></FadeIn>)}
      </div>
    </section>
  );
}

function ArticleContent({ blocks }) {
  return blocks.map((b,i) => {
    if (b.type==="p") return <p key={i} style={{ color:C.text,fontSize:16,lineHeight:1.8,marginBottom:20 }}>{b.text}</p>;
    if (b.type==="h2") return <h2 key={i} style={{ fontFamily:"Georgia,serif",fontSize:28,color:C.white,fontWeight:400,marginTop:48,marginBottom:16,paddingBottom:12,borderBottom:`1px solid ${C.border}` }}>{b.text}</h2>;
    if (b.type==="h3") return <h3 key={i} style={{ fontFamily:"Georgia,serif",fontSize:21,color:C.gold,fontWeight:400,marginTop:32,marginBottom:12 }}>{b.text}</h3>;
    if (b.type==="list") return <ul key={i} style={{ margin:"0 0 24px",paddingLeft:0,listStyle:"none" }}>{b.items.map((it,j)=><li key={j} style={{ color:C.text,fontSize:15,lineHeight:1.7,marginBottom:10,paddingLeft:24,position:"relative" }}><span style={{ position:"absolute",left:0,color:C.gold }}>\u2022</span>{it}</li>)}</ul>;
    if (b.type==="table") return <div key={i} style={{ overflowX:"auto",marginBottom:24 }}><table style={{ width:"100%",borderCollapse:"collapse",fontSize:14 }}><thead><tr>{b.headers.map((h,j)=><th key={j} style={{ textAlign:"left",padding:"12px 16px",background:"rgba(201,169,110,0.1)",color:C.gold,fontWeight:600,fontSize:12,letterSpacing:1,textTransform:"uppercase",borderBottom:`2px solid ${C.gold}` }}>{h}</th>)}</tr></thead><tbody>{b.rows.map((r,j)=><tr key={j}>{r.map((c,k)=><td key={k} style={{ padding:"12px 16px",color:C.text,borderBottom:`1px solid ${C.border}`,lineHeight:1.5 }}>{c}</td>)}</tr>)}</tbody></table></div>;
    if (b.type==="callout") return <div key={i} style={{ background:"rgba(201,169,110,0.08)",borderLeft:`3px solid ${C.gold}`,padding:"20px 24px",marginBottom:24 }}><p style={{ color:C.text,fontSize:15,lineHeight:1.7,margin:0 }}>{b.text}</p></div>;
    if (b.type==="faq") return <div key={i} style={{ marginBottom:24 }}><h4 style={{ color:C.white,fontSize:16,fontWeight:600,marginBottom:8 }}>{b.q}</h4><p style={{ color:C.textDim,fontSize:15,lineHeight:1.7,margin:0 }}>{b.a}</p></div>;
    return null;
  });
}

function ArticlePage({ id, setPage }) {
  const a = ARTICLES.find(x=>x.id===id);
  if (!a) return null;
  return (
    <section style={{ padding:"120px 24px 80px",maxWidth:780,margin:"0 auto" }}>
      <div style={{ marginBottom:48 }}>
        <span onClick={()=>{setPage("guides");window.scrollTo(0,0)}} style={{ color:C.gold,fontSize:13,cursor:"pointer",marginBottom:24,display:"inline-block" }}>\u2190 Back to Guides</span>
        <div style={{ display:"flex",gap:16,marginBottom:16,flexWrap:"wrap" }}><span style={{ color:C.gold,fontSize:11,letterSpacing:2,textTransform:"uppercase",background:"rgba(201,169,110,0.1)",padding:"4px 12px" }}>{a.cat}</span><span style={{ color:C.textDim,fontSize:12 }}>{a.read} read \u00B7 {a.date}</span></div>
        <h1 style={{ fontFamily:"Georgia,serif",fontSize:"clamp(28px,4vw,40px)",color:C.white,fontWeight:400,lineHeight:1.25,marginBottom:20 }}>{a.title}</h1>
        <p style={{ color:C.textDim,fontSize:17,lineHeight:1.7 }}>{a.desc}</p>
        <div style={{ height:2,background:`linear-gradient(to right,${C.gold},transparent)`,marginTop:32 }}/>
      </div>
      <ArticleContent blocks={a.content}/>
      <div style={{ background:C.card,border:`1px solid ${C.gold}`,padding:48,textAlign:"center",marginTop:48 }}><h3 style={{ fontFamily:"Georgia,serif",fontSize:24,color:C.white,fontWeight:400,marginBottom:12 }}>Want personalized guidance?</h3><p style={{ color:C.textDim,fontSize:14,lineHeight:1.6,maxWidth:400,margin:"0 auto 24px" }}>Confidential 30-minute call to discuss your situation.</p><button onClick={()=>{setPage("home");setTimeout(()=>document.getElementById("contact")?.scrollIntoView({behavior:"smooth"}),100)}} style={{ background:C.gold,color:C.bg,padding:"14px 36px",border:"none",fontSize:13,fontWeight:600,letterSpacing:2,cursor:"pointer" }}>BOOK A CALL</button></div>
      <div style={{ marginTop:64,paddingTop:32,borderTop:`1px solid ${C.border}` }}><div style={{ color:C.textDim,fontSize:12,letterSpacing:2,textTransform:"uppercase",marginBottom:16 }}>More Guides</div>
        {ARTICLES.filter(x=>x.id!==id).slice(0,3).map(x=><div key={x.id} onClick={()=>{setPage(x.id);window.scrollTo(0,0)}} style={{ padding:"16px 0",borderBottom:`1px solid ${C.border}`,cursor:"pointer",display:"flex",justifyContent:"space-between",alignItems:"center" }} onMouseEnter={e=>e.currentTarget.querySelector("h4").style.color=C.gold} onMouseLeave={e=>e.currentTarget.querySelector("h4").style.color=C.white}><div><span style={{ color:C.gold,fontSize:10,letterSpacing:2,textTransform:"uppercase" }}>{x.cat}</span><h4 style={{ fontFamily:"Georgia,serif",fontSize:16,color:C.white,fontWeight:400,margin:"4px 0 0",transition:"color 0.2s" }}>{x.title}</h4></div><span style={{ color:C.gold }}>\u2192</span></div>)}
      </div>
    </section>
  );
}

export default function App() {
  const [page, setPage] = useState("home");
  const isArt = ARTICLES.some(a=>a.id===page);
  return (
    <div style={{ background:C.bg,minHeight:"100vh",fontFamily:"'Segoe UI',-apple-system,sans-serif",color:C.text }}>
      <Nav setPage={setPage}/>
      {page==="home" && <><Hero setPage={setPage}/><ServicesSection/><RetireeSection setPage={setPage}/><CostOfLiving/><Pricing/><Newsletter/><Contact/></>}
      {page==="guides" && <GuidesPage setPage={setPage}/>}
      {page==="quiz" && <QuizPage setPage={setPage}/>}
      {page==="properties" && <PropertyGallery setPage={setPage}/>}
      {isArt && <ArticlePage id={page} setPage={setPage}/>}
      <Footer setPage={setPage}/>
    </div>
  );
}
