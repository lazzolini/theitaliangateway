// seo.js — Runs AFTER vite build. Generates static HTML pages + sitemap + robots.txt
// This ensures Google can read all content without JavaScript.

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');
const DOMAIN = 'https://theitaliangateway.com';

// ── Parse articles ──────────────────────────────────────────
const raw = readFileSync(join(__dirname, 'src/articles.js'), 'utf8');
const clean = raw.replace('export default ARTICLES;', '');
let ARTICLES;
try {
  ARTICLES = new Function(clean + '\nreturn ARTICLES;')();
  console.log('[seo] Parsed', ARTICLES.length, 'articles');
} catch (e) {
  console.error('[seo] Failed to parse articles:', e.message);
  process.exit(0); // Don't break the build, just skip SEO
}

// ── Helpers ─────────────────────────────────────────────────
function esc(s) { return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;'); }

function renderBlock(b) {
  if (b.type === 'p') return '<p>' + b.text + '</p>';
  if (b.type === 'h2') return '<h2>' + b.text + '</h2>';
  if (b.type === 'h3') return '<h3>' + b.text + '</h3>';
  if (b.type === 'list') return '<ul>' + b.items.map(i => '<li>' + i + '</li>').join('') + '</ul>';
  if (b.type === 'callout') return '<blockquote>' + b.text + '</blockquote>';
  if (b.type === 'faq') return '<details><summary>' + b.q + '</summary><p>' + b.a + '</p></details>';
  if (b.type === 'table') return '<table><thead><tr>' + b.headers.map(h => '<th>' + h + '</th>').join('') + '</tr></thead><tbody>' + b.rows.map(r => '<tr>' + r.map(c => '<td>' + c + '</td>').join('') + '</tr>').join('') + '</tbody></table>';
  return '';
}

function page(title, desc, canonical, body, jsonLd) {
  const ldScript = jsonLd ? jsonLd.map(j => `<script type="application/ld+json">${JSON.stringify(j)}</script>`).join('\n') : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)}</title>
<meta name="description" content="${esc(desc)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${canonical}">
<meta property="og:title" content="${esc(title)}">
<meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${canonical}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="The Italian Gateway">
${ldScript}
<style>body{background:#0A0E17;color:#E5E7EB;font-family:Segoe UI,-apple-system,sans-serif;margin:0;padding:0}
.w{max-width:780px;margin:0 auto;padding:60px 24px}
a{color:#C9A96E}h1{font:400 36px/1.25 Georgia,serif;color:#fff;margin:0 0 16px}
h2{font:400 26px/1.3 Georgia,serif;color:#fff;margin:40px 0 12px;padding-bottom:10px;border-bottom:1px solid #1F2937}
h3{font:400 20px/1.3 Georgia,serif;color:#C9A96E;margin:28px 0 10px}
p{font-size:16px;line-height:1.8;margin:0 0 16px}
ul{margin:0 0 20px;padding:0 0 0 20px}li{margin:0 0 8px;line-height:1.7}
table{width:100%;border-collapse:collapse;margin:0 0 20px;font-size:14px}
th{text-align:left;padding:10px;background:rgba(201,169,110,.1);color:#C9A96E;border-bottom:2px solid #C9A96E;font-size:12px;text-transform:uppercase}
td{padding:10px;border-bottom:1px solid #1F2937}
blockquote{background:rgba(201,169,110,.06);border-left:3px solid #C9A96E;padding:16px 20px;margin:0 0 20px}
details{margin:0 0 16px}summary{color:#fff;font-weight:600;cursor:pointer;margin:0 0 8px}
details p{color:#9CA3AF}
.nav{background:rgba(10,14,23,.97);border-bottom:1px solid #1F2937;padding:16px 24px;position:sticky;top:0;z-index:10}
.nav a{color:#C9A96E;text-decoration:none;font:400 20px Georgia,serif}
.cta{background:#111827;border:1px solid #C9A96E;padding:40px;text-align:center;margin:40px 0}
.cta a{background:#C9A96E;color:#0A0E17;padding:12px 32px;text-decoration:none;font-weight:600;font-size:13px;letter-spacing:2px}
.ft{max-width:780px;margin:40px auto;padding:20px 24px;border-top:1px solid #1F2937;text-align:center;color:#9CA3AF;font-size:12px}
.tag{color:#C9A96E;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:0 0 12px}
</style>
</head>
<body>
<div class="nav"><a href="/">THE ITALIAN <span style="color:#fff">GATEWAY</span></a></div>
<div class="w">
${body}
<div class="cta">
<p style="font:400 22px Georgia,serif;color:#fff;margin:0 0 12px">Want personalized guidance?</p>
<p style="color:#9CA3AF;font-size:14px;margin:0 0 20px">Confidential 30-minute discovery call.</p>
<a href="https://theitaliangateway.com">BOOK A CALL</a>
</div>
</div>
<div class="ft">
<p>&copy; 2026 The Italian Gateway. All rights reserved.</p>
<p style="margin-top:8px"><a href="/">Home</a> &middot; <a href="/guides/">Guides</a> &middot; info@theitaliangateway.com</p>
</div>
</body>
</html>`;
}

function ensureDir(d) { if (!existsSync(d)) mkdirSync(d, { recursive: true }); }

// ── Generate article pages ──────────────────────────────────
console.log('[seo] Generating static pages...');

for (const art of ARTICLES) {
  const dir = join(DIST, 'guide', art.id);
  ensureDir(dir);
  const body = `
<a href="/guides/" style="color:#C9A96E;font-size:13px">&larr; All Guides</a>
<div class="tag" style="margin-top:24px">${art.cat} &middot; ${art.read} read</div>
<h1>${art.title}</h1>
<p style="color:#9CA3AF;font-size:17px">${art.desc}</p>
<hr style="border:none;height:2px;background:linear-gradient(to right,#C9A96E,transparent);margin:28px 0">
${art.content.map(renderBlock).join('\n')}`;

  // Build structured data
  const jsonLd = [];
  
  // Article schema
  const taxCats = ["Tax & Legal","Immigration","Private Banking","Relocation"];
  const healthCats = ["Healthcare"];
  const reviewer = healthCats.some(c=>art.cat.includes(c))
    ? { name:"Dr. Gabriele Azzolini", url:"https://www.linkedin.com/in/gabriele-azzolini-b309651b7" }
    : taxCats.some(c=>art.cat.includes(c))
    ? { name:"Nicolò Bolla", url:"https://www.linkedin.com/in/accountingbolla" }
    : null;

  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": art.title,
    "description": art.desc,
    "datePublished": "2026-04-01",
    "dateModified": "2026-06-01",
    "author": { "@type": "Organization", "name": "The Italian Gateway", "url": DOMAIN },
    "publisher": { "@type": "Organization", "name": "The Italian Gateway", "url": DOMAIN },
    "reviewedBy": reviewer ? { "@type": "Person", "name": reviewer.name, "url": reviewer.url } : undefined,
    "mainEntityOfPage": { "@type": "WebPage", "@id": DOMAIN + '/guide/' + art.id + '/' },
  });

  // FAQ schema from article FAQ blocks
  const faqs = art.content.filter(b => b.type === 'faq');
  if (faqs.length > 0) {
    jsonLd.push({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    });
  }

  // Breadcrumb schema
  jsonLd.push({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": "Home", "item": DOMAIN + "/" },
      { "@type": "ListItem", "position": 2, "name": "Guides", "item": DOMAIN + "/guides/" },
      { "@type": "ListItem", "position": 3, "name": art.title, "item": DOMAIN + "/guide/" + art.id + "/" },
    ]
  });

  writeFileSync(join(dir, 'index.html'), page(
    art.title + ' | The Italian Gateway',
    art.desc,
    DOMAIN + '/guide/' + art.id + '/',
    body,
    jsonLd
  ));
  console.log('  +', art.id);
}

// ── Guides listing page ─────────────────────────────────────
ensureDir(join(DIST, 'guides'));
const guidesBody = `
<h1>Guides for Relocating to Italy</h1>
<p style="color:#9CA3AF;font-size:17px;margin-bottom:32px">Comprehensive guides for HNWI and families considering Italy.</p>
${ARTICLES.map(a => `
<a href="/guide/${a.id}/" style="display:block;background:#111827;border:1px solid #1F2937;padding:24px;margin:0 0 16px;text-decoration:none">
<div class="tag">${a.cat} &middot; ${a.read} read</div>
<h3 style="color:#fff;margin:4px 0 8px">${a.title}</h3>
<p style="color:#9CA3AF;font-size:14px;margin:0">${a.desc}</p>
</a>`).join('\n')}`;

writeFileSync(join(DIST, 'guides', 'index.html'), page(
  'Relocation Guides for HNWI | The Italian Gateway',
  'Guides on Italian flat tax, real estate, private banking, healthcare, education, immigration, and yachting for HNWI.',
  DOMAIN + '/guides/',
  guidesBody
));
console.log('  + guides/');

// ── Advisors page ───────────────────────────────────────────
ensureDir(join(DIST, 'advisors'));
const advisorsBody = `
<h1>Our Advisory Network</h1>
<p style="color:#9CA3AF;font-size:17px;margin-bottom:16px">A curated network of trusted professionals. Every introduction is personal. Every professional is vetted. One point of contact coordinates everything.</p>
<h2>Core Advisors</h2>
<div style="background:#111827;border:1px solid #1F2937;padding:28px;margin-bottom:16px">
<h3 style="color:#C9A96E">Nicolò Bolla</h3>
<p style="font-style:italic;color:#C9A96E;font-size:14px">Tax, Corporate &amp; Immigration Advisor</p>
<p>A chartered accountant specialising in international tax and immigration law. From flat tax applications and corporate structuring to residence permits and citizenship pathways — end-to-end guidance with full regulatory compliance.</p>
</div>
<div style="background:#111827;border:1px solid #1F2937;padding:28px;margin-bottom:16px">
<h3 style="color:#C9A96E">Dr. Gabriele Azzolini</h3>
<p style="font-style:italic;color:#C9A96E;font-size:14px">Medical Advisor</p>
<p>A qualified Doctor of Medicine and Surgery (M.D.). Dr. Azzolini connects you with the most qualified specialist for your needs — trusted GPs, world-class surgeons, and paediatric screening. Confidential medical orientation across Italy.</p>
</div>
<div style="background:#111827;border:1px solid #1F2937;padding:28px;margin-bottom:16px">
<h3 style="color:#C9A96E">Private Banking Team</h3>
<p style="font-style:italic;color:#C9A96E;font-size:14px">Wealth Management &amp; Private Banking</p>
<p>Our private banking introductions are handled with the utmost discretion. We work with senior relationship managers at Italy's leading private banks and international institutions. By the nature of the profession, our banking partners remain confidential — introductions are made personally, matched to your specific profile and requirements.</p>
</div>
<h2>Lifestyle Network</h2>
<div style="background:#111827;border:1px solid #1F2937;padding:28px;margin-bottom:16px">
<h3 style="color:#C9A96E">Davide Marescalchi</h3>
<p style="font-style:italic;color:#C9A96E;font-size:14px">Hair &amp; Wellness Specialist</p>
<p>A Milan-based hair specialist with deep expertise in scalp health and hair wellness. Personalised consultations and treatments — because settling into a new city means feeling like yourself again.</p>
</div>
<p style="margin-top:32px">Contact: <a href="mailto:info@theitaliangateway.com">info@theitaliangateway.com</a></p>`;

writeFileSync(join(DIST, 'advisors', 'index.html'), page(
  'Our Advisory Network | The Italian Gateway',
  'Meet the professionals behind The Italian Gateway: tax advisors, medical consultants, and lifestyle specialists supporting HNWI families relocating to Italy.',
  DOMAIN + '/advisors/',
  advisorsBody
));
console.log('  + advisors/');

// ── Professionals page ───────────────────────────────────────────
ensureDir(join(DIST, 'professionals'));
const profBody = `
<h1>For Wealth Managers, Family Offices &amp; Law Firms</h1>
<p style="color:#9CA3AF;font-size:17px;margin-bottom:16px">Your client wants to move to Italy. We handle everything on the ground — tax structuring, property, banking introductions, healthcare, schools, immigration. Your client gets white-glove service. You keep the client.</p>
<h2>How the referral works</h2>
<p>1. You identify the need — your client mentions Italy. 2. Warm introduction via email. We schedule a confidential call within 48 hours. 3. We handle Italy — tax, property, banking, schools, healthcare, immigration. 4. You stay informed. Your client remains your client.</p>
<h2>Why advisors refer to us</h2>
<p>Your client's relocation creates complexity outside your core mandate. We coordinate every aspect without touching the investment relationship. Your AUM stays with you.</p>
<h2>Technical reference library</h2>
<ul>
<li><a href="/guide/flat-tax-2026/">Italy Flat Tax: Technical Briefing</a></li>
<li><a href="/guide/qrops-uk-pension-italy-2026/">QROPS &amp; UK Pensions in Italy</a></li>
<li><a href="/guide/pfic-rules-us-citizens-italy-2026/">PFIC Rules for US Citizens</a></li>
<li><a href="/guide/roth-ira-italy-tax-treatment-2026/">Roth IRA Italian Tax Treatment</a></li>
<li><a href="/guide/trusts-cfc-rules-italy-hnwi-2026/">Trusts &amp; CFC Rules</a></li>
<li><a href="/guide/polizza-vita-luxembourg-italy-wealth/">Polizza Vita Luxembourg</a></li>
<li><a href="/guide/italy-7-percent-retiree-flat-tax-south-2026/">7% Retiree Flat Tax</a></li>
<li><a href="/guide/eu-pension-transfer-italy-pepp-2026/">EU Pension Coordination</a></li>
<li><a href="/guide/italy-vs-portugal-vs-greece-tax-2026/">Italy vs Portugal vs Greece</a></li>
<li><a href="/guide/uk-millionaire-exodus-italy-2026/">UK Wealth Exodus Data</a></li>
</ul>
<p style="margin-top:32px">Contact: <a href="mailto:info@theitaliangateway.com">info@theitaliangateway.com</a></p>`;

writeFileSync(join(DIST, 'professionals', 'index.html'), page(
  'For Wealth Managers & Family Offices | The Italian Gateway',
  'Your client wants to move to Italy. We handle tax, property, banking, schools, healthcare. Reference library for advisors.',
  DOMAIN + '/professionals/',
  profBody
));
console.log('  + professionals/');

// ── Athletes page ───────────────────────────────────────────
ensureDir(join(DIST, 'athletes'));
const athBody = `
<h1>Player Landing Service</h1>
<p style="color:#9CA3AF;font-size:17px;margin-bottom:16px">Your player signs in Italy. We handle everything else — accommodation, banking, healthcare, schools, tax structuring, immigration. Within 48 hours of arrival. One fixed fee.</p>
<h2>What We Handle</h2>
<p>Home (furnished apartment within 72 hours), Banking (account, codice fiscale, SIM), Healthcare (SSN, private GP, club medical coordination), Schools (international school applications and waitlists), Tax (Impatriati regime — 50% income exemption), Immigration (residence permit, family visa, driving licence).</p>
<h2>The Spouse Factor</h2>
<p>When a player requests a transfer after one season, it is almost never about football. It is about the family not settling. We provide dedicated spouse support — neighbourhood orientation, community introduction, language, professional networking.</p>
<h2>For Agents &amp; Clubs</h2>
<p>Every call from a player's partner about a school or a bank account is time you're not spending on the next deal. One fixed fee, paid by the club or agent. The player settles. You move on.</p>
<p><a href="/guide/professional-athletes-italy-tax-relocation/">Read the full guide for athletes relocating to Italy</a></p>
<p style="margin-top:32px">Contact: <a href="mailto:info@theitaliangateway.com">info@theitaliangateway.com</a></p>`;

writeFileSync(join(DIST, 'athletes', 'index.html'), page(
  'Player Landing Service — Athletes Relocating to Italy | The Italian Gateway',
  'Athletes relocating to Italy: housing, banking, healthcare, schools, Impatriati tax. For agents and clubs. One fixed fee.',
  DOMAIN + '/athletes/',
  athBody
));
console.log('  + athletes/');

// ── About page ───────────────────────────────────────────
ensureDir(join(DIST, 'about'));
const aboutBody = `
<h1>About The Italian Gateway</h1>
<h2>Our Mission</h2>
<p>The Italian Gateway is a Milan-based advisory service that coordinates every dimension of a high-value relocation to Italy — from the EUR 300,000 flat tax election to school waiting lists, from private bank introductions to driving licence conversions. We serve internationally mobile individuals and families from London, Dubai, Geneva, New York, and Singapore who expect the same quality of service in Italy that they receive from their advisors at home.</p>
<h2>Our Team</h2>
<div style="background:#111827;border:1px solid #1F2937;padding:28px;margin-bottom:16px">
<h3 style="color:#C9A96E">Nicolò Bolla</h3>
<p style="color:#C9A96E;font-style:italic">Chartered Accountant — International Tax &amp; Immigration</p>
<p>Specialising in international tax structuring and immigration law. From flat tax applications and corporate structuring to residence permits and citizenship pathways. <a href="https://www.linkedin.com/in/accountingbolla" style="color:#C9A96E">LinkedIn Profile</a></p>
</div>
<div style="background:#111827;border:1px solid #1F2937;padding:28px;margin-bottom:16px">
<h3 style="color:#C9A96E">Dr. Gabriele Azzolini, M.D.</h3>
<p style="color:#C9A96E;font-style:italic">Medical Advisor — Doctor of Medicine and Surgery</p>
<p>Connects relocating families with the most qualified medical specialists across Italy. Confidential medical orientation and referrals. <a href="https://www.linkedin.com/in/gabriele-azzolini-b309651b7" style="color:#C9A96E">LinkedIn Profile</a></p>
</div>
<div style="background:#111827;border:1px solid #1F2937;padding:28px;margin-bottom:16px">
<h3 style="color:#C9A96E">Private Banking Team</h3>
<p style="color:#C9A96E;font-style:italic">Wealth Management &amp; Private Banking</p>
<p>Confidential introductions to Italy's leading private banks and international institutions. Introductions are made personally, matched to your specific profile and requirements.</p>
</div>
<h2>How We Produce Our Content</h2>
<p>Every guide published on The Italian Gateway is researched using primary sources: Italian legislation (TUIR, D.Lgs. 147/2015, D.Lgs. 209/2023), EU regulations (883/2004, 650/2012), bilateral tax treaties, and circulari from the Agenzia delle Entrate. Tax and legal content is reviewed by Nicolò Bolla, Chartered Accountant. Healthcare content is reviewed by Dr. Gabriele Azzolini, M.D.</p>
<h2>Contact</h2>
<p>The Italian Gateway — Premium Relocation Advisory<br>Milan, Italy<br>Email: <a href="mailto:info@theitaliangateway.com">info@theitaliangateway.com</a></p>`;

const aboutLd = [{
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "mainEntity": {
    "@type": "ProfessionalService",
    "name": "The Italian Gateway",
    "url": DOMAIN,
    "email": "info@theitaliangateway.com",
    "address": { "@type": "PostalAddress", "addressLocality": "Milan", "addressCountry": "IT" },
    "employee": [
      { "@type": "Person", "name": "Nicolò Bolla", "jobTitle": "Chartered Accountant — International Tax & Immigration", "url": "https://www.linkedin.com/in/accountingbolla" },
      { "@type": "Person", "name": "Dr. Gabriele Azzolini", "jobTitle": "Medical Advisor", "url": "https://www.linkedin.com/in/gabriele-azzolini-b309651b7" }
    ]
  }
}];

writeFileSync(join(DIST, 'about', 'index.html'), page(
  'About Us — The Italian Gateway | HNWI Relocation Advisory Milan',
  'About The Italian Gateway: our mission, team credentials, content methodology, and professional network. Milan-based advisory for HNWI relocating to Italy.',
  DOMAIN + '/about/',
  aboutBody,
  aboutLd
));
console.log('  + about/');

// ── Inject SEO content into homepage ────────────────────────
let homepage = readFileSync(join(DIST, 'index.html'), 'utf8');
const seo = `<div id="seo" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden" aria-hidden="true">
<h1>The Italian Gateway — Premium Relocation Advisory for HNWI Moving to Italy</h1>
<p>We guide high-net-worth individuals and families to their ideal life in Italy. Tax optimization, private banking, real estate, healthcare, education, yachting — all through a single, confidential point of contact in Milan.</p>
<h2>Services</h2>
<p>Private Banking introductions. Tax and Legal structuring including the 300,000 euro flat tax regime. Real Estate across Milan, Lake Como, Tuscany, and the Amalfi Coast. Healthcare coordination. Education consulting for international schools. Immigration management. Yachting and marina services.</p>
<h2>Guides</h2>
${ARTICLES.map(a => '<p><a href="/guide/' + a.id + '/">' + a.title + '</a> - ' + a.desc + '</p>').join('\n')}
<h2>Contact</h2>
<p>Email: info@theitaliangateway.com. Book a confidential 30-minute discovery call.</p>
</div>`;
homepage = homepage.replace('</body>', seo + '\n</body>');
writeFileSync(join(DIST, 'index.html'), homepage);
console.log('  + homepage SEO injected');

// ── Legal pages ─────────────────────────────────────────────
const legalPages = [
  { slug: 'privacy', title: 'Privacy Policy', desc: 'How The Italian Gateway collects, uses, and protects your personal data under GDPR.',
    body: `<h1>Privacy Policy</h1>
<p><strong>Last updated:</strong> March 2026</p>
<p>The Italian Gateway ("we", "us", "our") is committed to protecting your personal data. This Privacy Policy explains how we collect, use, and protect information when you visit theitaliangateway.com.</p>
<h2>1. Data Controller</h2>
<p>The data controller is The Italian Gateway, based in Milan, Italy. Contact: info@theitaliangateway.com</p>
<h2>2. Data We Collect</h2>
<p>We collect only data you voluntarily provide through our forms: name, email address, quiz results, and any information you include in messages. We do not use tracking or profiling cookies.</p>
<h2>3. Purpose and Legal Basis</h2>
<p>We process data under GDPR Article 6(1)(a) (consent, when you submit a form) and Article 6(1)(f) (legitimate interest, to improve our services).</p>
<h2>4. Data Sharing</h2>
<p>We do not sell or share your data for marketing. Data processors include: Formspree Inc. (form processing), Vercel Inc. (hosting), Cloudflare Inc. (DNS and email routing). All act as data processors under GDPR.</p>
<h2>5. Data Retention</h2>
<p>We retain personal data for up to 24 months. You may request deletion at any time.</p>
<h2>6. Your Rights (GDPR Articles 15-22)</h2>
<p>You have the right to: access, rectify, erase, restrict processing, data portability, object to processing, and withdraw consent. Contact info@theitaliangateway.com. We respond within 30 days.</p>
<h2>7. Data Security</h2>
<p>We use HTTPS/TLS encryption, secure hosting, and access controls to protect your data.</p>
<h2>8. International Transfers</h2>
<p>Some processors are US-based. Transfers are governed by Standard Contractual Clauses (SCCs).</p>
<h2>9. Supervisory Authority</h2>
<p>You may lodge a complaint with the Garante per la protezione dei dati personali at www.garanteprivacy.it.</p>
<h2>10. Changes</h2>
<p>We may update this policy. The latest version is always available on this page.</p>` },

  { slug: 'cookies', title: 'Cookie Policy', desc: 'How The Italian Gateway uses cookies. Only essential technical cookies are used.',
    body: `<h1>Cookie Policy</h1>
<p><strong>Last updated:</strong> March 2026</p>
<p>This Cookie Policy explains how The Italian Gateway uses cookies on theitaliangateway.com.</p>
<h2>1. What Are Cookies</h2>
<p>Cookies are small text files stored on your device when you visit a website.</p>
<h2>2. Cookies We Use</h2>
<p>We use only essential technical cookies. No analytics, advertising, or profiling cookies are used.</p>
<table><thead><tr><th>Cookie</th><th>Type</th><th>Purpose</th><th>Duration</th></tr></thead>
<tbody><tr><td>cookie_ok</td><td>Technical</td><td>Remembers cookie banner acknowledgment</td><td>Session</td></tr>
<tr><td>__cf_bm</td><td>Technical (Cloudflare)</td><td>Bot management and security</td><td>30 min</td></tr></tbody></table>
<h2>3. Third-Party Cookies</h2>
<p>We do not embed third-party tracking services. If added in the future, explicit consent will be required.</p>
<h2>4. How to Manage Cookies</h2>
<p>You can control cookies through your browser settings. Blocking essential cookies may affect functionality.</p>
<h2>5. Legal Framework</h2>
<p>This policy complies with GDPR, the Italian Privacy Code (Legislative Decree 196/2003), and the ePrivacy Directive as implemented by the Garante (Guidelines on cookies, June 2021).</p>` },

  { slug: 'terms', title: 'Terms of Service', desc: 'Terms governing the use of The Italian Gateway website and services.',
    body: `<h1>Terms of Service</h1>
<p><strong>Last updated:</strong> March 2026</p>
<p>By using theitaliangateway.com, you agree to these Terms.</p>
<h2>1. About Us</h2>
<p>The Italian Gateway provides relocation advisory and coordination services, connecting clients with qualified professionals.</p>
<h2>2. No Professional Advice</h2>
<p>Content on this website does not constitute financial, legal, tax, medical, or investment advice. All information is for general purposes only. Always consult qualified professionals.</p>
<h2>3. Intermediary Role</h2>
<p>We introduce clients to third-party professionals. We do not provide regulated professional services directly.</p>
<h2>4. No Guarantees</h2>
<p>We do not guarantee eligibility for any tax regime, visa, or benefit. Eligibility depends on individual circumstances.</p>
<h2>5. Intellectual Property</h2>
<p>All content is property of The Italian Gateway, protected by copyright. Reproduction without permission is prohibited.</p>
<h2>6. Accuracy</h2>
<p>Figures (tax rates, prices, fees) are indicative and subject to change. We accept no liability for decisions based on this information.</p>
<h2>7. Limitation of Liability</h2>
<p>To the maximum extent permitted by Italian law, The Italian Gateway shall not be liable for damages arising from use of this website.</p>
<h2>8. Governing Law</h2>
<p>These Terms are governed by Italian law. Disputes are subject to the courts of Milan, Italy.</p>
<h2>9. Contact</h2>
<p>Questions: info@theitaliangateway.com</p>` },
];

for (const lp of legalPages) {
  const dir = join(DIST, lp.slug);
  ensureDir(dir);
  writeFileSync(join(dir, 'index.html'), page(
    lp.title + ' | The Italian Gateway',
    lp.desc,
    DOMAIN + '/' + lp.slug + '/',
    '<a href="/" style="color:#C9A96E;font-size:13px">&larr; Home</a>\n' + lp.body
  ));
  console.log('  + ' + lp.slug + '/');
}

// ── Sitemap ─────────────────────────────────────────────────
const urls = [
  { loc: '/', p: '1.0' },
  { loc: '/guides/', p: '0.9' },
  { loc: '/advisors/', p: '0.8' },
  { loc: '/professionals/', p: '0.9' },
  { loc: '/athletes/', p: '0.8' },
  { loc: '/about/', p: '0.9' },
  ...ARTICLES.map(a => ({ loc: '/guide/' + a.id + '/', p: '0.8' })),
  { loc: '/privacy/', p: '0.3' },
  { loc: '/cookies/', p: '0.3' },
  { loc: '/terms/', p: '0.3' },
];
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${DOMAIN}${u.loc}</loc><lastmod>2026-03-23</lastmod><priority>${u.p}</priority></url>`).join('\n')}
</urlset>`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
console.log('  + sitemap.xml (' + urls.length + ' URLs)');

// ── Robots.txt ──────────────────────────────────────────────
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);
console.log('  + robots.txt');

// ── IndexNow: ping Bing/Yandex with all URLs ────────────────
const INDEXNOW_KEY = 'mdpubx9i7zjdmqnsr0d23kdqldypimfl';
const allUrls = [
  ...ARTICLES.map(a => DOMAIN + '/guide/' + a.id + '/'),
  ...urls.map(u => DOMAIN + u.loc),
];

async function pingIndexNow() {
  try {
    const res = await fetch('https://api.indexnow.org/IndexNow', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify({
        host: 'theitaliangateway.com',
        key: INDEXNOW_KEY,
        keyLocation: DOMAIN + '/' + INDEXNOW_KEY + '.txt',
        urlList: allUrls,
      }),
    });
    console.log('  + IndexNow ping: ' + res.status + ' (' + allUrls.length + ' URLs submitted)');
  } catch (e) {
    console.log('  ! IndexNow ping failed (non-blocking):', e.message);
  }
}

// Fire the ping — don't await, it's non-critical
pingIndexNow();

console.log('[seo] Done!');
