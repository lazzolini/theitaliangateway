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

// ── Assicura che dist esista (difensivo) ────────────────────
if (!existsSync(DIST)) {
  mkdirSync(DIST, { recursive: true });
  console.log('[seo] Created dist/ (was missing)');
}

// ── Sitemap ─────────────────────────────────────────────────
const urls = [
  { loc: '/', p: '1.0' },
  { loc: '/guides/', p: '0.9' },
  { loc: '/advisors/', p: '0.8' },
  { loc: '/professionals/', p: '0.9' },
  { loc: '/athletes/', p: '0.8' },
  { loc: '/about/', p: '0.9' },
  { loc: '/orientation/', p: '0.9' },
  { loc: '/healthcare/', p: '0.9' },
  { loc: '/buying-agent/', p: '0.9' },
  ...ARTICLES.map(a => ({ loc: '/guide/' + a.id + '/', p: '0.8' })),
  { loc: '/privacy/', p: '0.3' },
  { loc: '/cookies/', p: '0.3' },
  { loc: '/terms/', p: '0.3' },
];
// lastmod: data reale dell'articolo dove disponibile, altrimenti data di build
const MONTHS = { January:'01', February:'02', March:'03', April:'04', May:'05', June:'06',
                 July:'07', August:'08', September:'09', October:'10', November:'11', December:'12' };
const BUILD_DATE = new Date().toISOString().slice(0, 10);

function lastmodFor(loc) {
  const m = loc.match(/^\/guide\/(.+)\/$/);
  if (m) {
    const art = ARTICLES.find(a => a.id === m[1]);
    if (art && art.date) {
      const parts = art.date.trim().split(/\s+/);
      if (parts.length === 2 && MONTHS[parts[0]]) {
        return parts[1] + '-' + MONTHS[parts[0]] + '-01';
      }
    }
  }
  return BUILD_DATE;
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url><loc>${DOMAIN}${u.loc}</loc><lastmod>${lastmodFor(u.loc)}</lastmod><priority>${u.p}</priority></url>`).join('\n')}
</urlset>`;
writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
console.log('  + sitemap.xml (' + urls.length + ' URLs)');

// ── Robots.txt ──────────────────────────────────────────────
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);
console.log('  + robots.txt');



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
<h2>Our positioning: complementary, not competing</h2>
<p>The Italian Gateway does not provide investment advisory, portfolio management, discretionary asset management, or financial planning services. We do not sell insurance products, securities, or tax preparation services in our own name. Our role is coordination and orchestration of independently qualified Italian professionals — tax advisors, lawyers, notaries, doctors, private banks — through a single point of contact. This structural choice is deliberate: it ensures we can never be perceived as competing for the client's investment relationship, and it protects the trust that makes referral partnerships work.</p>
<h2>Partner with us: two ways to work together</h2>
<p><strong>Fee-sharing:</strong> For established partners with recurring HNWI relocation referrals, we structure formal fee-sharing arrangements on successfully onboarded clients. Transparent terms, documented agreement, quarterly settlement.</p>
<p><strong>Reciprocal referral:</strong> For advisory firms with clients also needing services outside Italy, we operate a mutual referral network with vetted partners in complementary jurisdictions.</p>
<p>Both arrangements are structured formally, with written terms and clear economics.</p>
<h2>For investment migration firms</h2>
<p>Firms specialising in residence and citizenship by investment — Henley &amp; Partners, Latitude, Global Citizen Solutions, Astons, Arton, and others — deliver clients to the point of legal residency. What happens next often falls outside the scope of the migration mandate: the client arrives in Italy and needs a bank account, a home, a school, a doctor, a tax structure that works.</p>
<p>The Italian Gateway operates as the natural next partner for these clients. We start where your mandate ends. We do not process visa applications, structure investment programs, or manage the government relationship. We handle the practical and personal side of relocation — everything that turns a residence permit into a functioning life in Italy.</p>
<p>For established migration firms with recurring flow of clients to Italy, we structure a preferred partnership: dedicated single point of contact for your case managers, priority scheduling for referred clients, transparent fee arrangements or reciprocal referrals, and coordinated reporting.</p>
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

// ── Orientation page ───────────────────────────────────────────
ensureDir(join(DIST, 'orientation'));
const orientBody = `
<h1>Multi-Advisory Orientation for HNWI Relocating to Italy</h1>
<p style="color:#9CA3AF;font-size:17px;margin-bottom:16px">Relocating to Italy involves separate decisions across medicine, finance, tax, and law. Most families make these decisions in isolation. We coordinate a single orientation session that brings together the specialists your specific situation requires.</p>
<h2>How it works</h2>
<p><strong>1. Scoping call.</strong> 60-minute confidential conversation. We map your situation across healthcare, finance, tax, immigration, education, and property.</p>
<p><strong>2. Curated professional consultations.</strong> You meet with the specific advisors your case needs — an M.D. for pre-existing medical conditions, a private banker for wealth structuring, a commercialista for cross-border tax, a notary for property, an immigration lawyer for permits.</p>
<p><strong>3. Coordination and synthesis report.</strong> We synthesise the input into a single actionable roadmap, delivered within 5 business days of your final consultation.</p>
<p><strong>4. 60 days of implementation support.</strong> Direct email access for questions and coordination as you execute the plan.</p>
<h2>Our positioning</h2>
<p>The Italian Gateway does not provide medical, financial, tax, legal, or insurance advice in its own name. We coordinate the work of independently qualified professionals, each regulated in their respective field. Our value is orchestration, synthesis, and single point of contact.</p>
<h2>Typical scenarios</h2>
<p>US citizens with pre-existing conditions (SSN + private GP + insurance strategy + US Medicare coordination).</p>
<p>UK families post non-dom (flat tax election + SIPP restructuring + property + schools + healthcare).</p>
<p>Foreign business owners establishing an Italian company (IRES/IRAP planning + legal structure + banking + immigration).</p>
<p>Retirees considering the 7% regime (Southern municipality selection + property + healthcare + pension coordination).</p>
<p>HNWI transitioning from Dubai, Singapore, Hong Kong (flat tax vs 7% + banking + real estate + international schools).</p>
<h2>Investment</h2>
<p>Essential Orientation: from €1,800. Standard Orientation: €3,500–€5,500. Comprehensive Onboarding: €8,000–€15,000. Full quote provided after the initial scoping call — no charge for the scoping conversation itself.</p>
<p style="margin-top:32px">Request scoping call: <a href="mailto:info@theitaliangateway.com">info@theitaliangateway.com</a></p>`;

writeFileSync(join(DIST, 'orientation', 'index.html'), page(
  'Multi-Advisory Orientation for HNWI Relocating to Italy | The Italian Gateway',
  'Coordinated orientation across medicine, finance, tax, law for families moving to Italy. Independent professionals, single point of contact, fixed fees.',
  DOMAIN + '/orientation/',
  orientBody
));
console.log('  + orientation/');

// ── Healthcare service page ────────────────────────────────
ensureDir(join(DIST, 'healthcare'));
const healthBody = `
<h1>Healthcare Setup Service for International Families in Italy</h1>
<p style="color:#9CA3AF;font-size:17px;margin-bottom:16px">Most international families arriving in Italy either overpay for coverage they will never use, or discover a gap at the worst possible moment. We coordinate a doctor and an independent broker to produce a written recommendation for your specific situation.</p>
<h2>Four configurations, four costs</h2>
<p><strong>Public only</strong> — SSN registration alone. Free. For families with straightforward medical needs, comfortable with waiting lists for non-urgent care.</p>
<p><strong>Public plus access</strong> — SSN plus a private GP on retainer. €1,500 to €2,500 per year. The configuration we recommend most often: public system for hospitals and emergencies, private doctor for continuity and English.</p>
<p><strong>Public plus Italian cover</strong> — SSN, private GP and an Italian private policy. €5,500 to €9,000 per year. For families based in Italy wanting private rooms and fast specialist access without paying for worldwide coverage.</p>
<p><strong>International</strong> — SSN, private GP and an international policy such as Bupa, Cigna or Allianz Care. €12,000 to €25,000 per year. For genuinely mobile families or complex conditions requiring cross-border treatment.</p>
<p>One point worth knowing: the SSN covers pre-existing conditions from day one, with no exclusions and no waiting period. Private policies almost always apply a twelve to twenty-four month wait.</p>
<h2>How the service works</h2>
<p>A sixty-minute scoping conversation at no charge. Then a consultation with an internal medicine specialist, briefed on your case in advance. Then a review with an independent insurance broker, fee-based with no product commissions. Finally a written report setting out what to do, in what order, at what cost, followed by a period of email support.</p>
<h2>Fees</h2>
<p><strong>Healthcare Orientation — €1,200 (VAT included).</strong> Medical consultation, broker review, written summaries and final report, 30 days of email support.</p>
<p><strong>Healthcare Orientation Extended — €1,800 (VAT included).</strong> Everything above, plus identification and introduction to an English-speaking GP, within the SSN at no cost to you or privately on retainer, and 60 days of support.</p>
<p>Every professional you speak with is an independent third party. We receive no commission, referral fee or other payment from any of them.</p>
<h2>Common questions</h2>
<p><strong>Is SSN registration enough on its own?</strong> For many families, yes. The SSN covers emergencies, hospital treatment, specialists and prescriptions, including pre-existing conditions. The genuine weaknesses are waiting times for non-urgent care and the fact that the system operates in Italian.</p>
<p><strong>How are pre-existing conditions treated?</strong> The SSN treats them like any other condition, covered from registration with no underwriting. Private insurers apply a waiting period of twelve to twenty-four months, exclude the condition permanently, or load the premium.</p>
<p><strong>Should I cancel the policy from my home country?</strong> It depends on where you spend time and what you would be giving up. For US citizens approaching Medicare eligibility, cancelling early can create both a coverage gap and permanent enrolment penalties.</p>
<p><strong>What does a private GP provide?</strong> A doctor who follows a small number of patients, speaks English, is reachable directly, knows your history and coordinates specialists. Typically €1,500 to €2,500 per year for a couple.</p>
<p><strong>Do you sell insurance?</strong> No. We are not insurance intermediaries and we do not recommend specific policies. We coordinate independent regulated professionals and synthesise their input into a plan.</p>
<p style="margin-top:32px">Request a scoping conversation: <a href="mailto:info@theitaliangateway.com">info@theitaliangateway.com</a></p>
<p><a href="/guide/private-health-insurance-italy-expats-2026/">Read our full guide to health insurance in Italy</a></p>`;

writeFileSync(join(DIST, 'healthcare', 'index.html'), page(
  'Healthcare Setup Service for Expats in Italy | The Italian Gateway',
  'SSN, private GP or international insurance? We coordinate a doctor and an independent broker to produce a written recommendation. Fixed fee from EUR 1,200.',
  DOMAIN + '/healthcare/',
  healthBody
));
console.log('  + healthcare/');

// ── Buying agent page ──────────────────────────────────────
ensureDir(join(DIST, 'buying-agent'));
const agentBody = `
<h1>Property Buying Agent Italy: Lake Como, Milan and Tuscany</h1>
<p style="color:#9CA3AF;font-size:17px;margin-bottom:16px">In Italy the estate agent is paid by both sides and represents neither. For an international buyer, that structural conflict is the single largest source of overpayment and of problems discovered after completion. We act for the buyer only.</p>
<h2>What goes wrong without representation</h2>
<p>Asking prices on lake and prime rural property are frequently set for foreign buyers rather than for the market. Historic properties carry restrictions that make planned renovation impossible, and these are not disclosed unless asked for specifically. Cadastral records routinely disagree with the building as it stands, which becomes the buyer's problem at resale. Off-market stock, often the best of it, never reaches the portals at all.</p>
<h2>How we work</h2>
<p><strong>Brief.</strong> We define what you are actually looking for: location, budget, use, timeline, appetite for renovation.</p>
<p><strong>Search.</strong> Listed stock, agency networks and off-market. We view on your behalf and report honestly, including on properties we think you should not pursue.</p>
<p><strong>Diagnostics.</strong> Before any offer: cadastral conformity, planning and heritage restrictions, condominium position, structural condition. Coordinated with a surveyor and a lawyer acting for you.</p>
<p><strong>Negotiation and completion.</strong> Price and terms negotiated on your behalf, then coordination through compromesso and rogito with a notary and lawyer of your choosing.</p>
<h2>Where we operate</h2>
<p><strong>Lake Como.</strong> Bellagio, Menaggio, Tremezzina, Como and the Argegno side. Waterfront and historic villas, where asking prices diverge most sharply from achievable prices and heritage restrictions are most common.</p>
<p><strong>Milan.</strong> Brera, Quadrilatero, Porta Venezia, Cinque Giornate, CityLife. Apartments and penthouses, where the material risks are condominium liabilities and cadastral discrepancies.</p>
<p><strong>Tuscany.</strong> Florence city centre, Chianti, Val d'Orcia. Historic apartments and rural estates, where planning restrictions, agricultural preemption rights and water rights require checking before an offer.</p>
<h2>Fees</h2>
<p>A retainer to begin the search, credited in full against the completion fee. The completion fee is a percentage of the purchase price, agreed in writing at the outset and payable only on completion. We are paid by you and by nobody else: no commission from selling agents, no share of the seller's fee. Surveyor, lawyer and notary are engaged directly by you at their own rates.</p>
<h2>Common questions</h2>
<p><strong>How is a buying agent different from an estate agent?</strong> An Italian estate agent is instructed by the seller and by custom takes commission from both parties. Their duty is to complete a sale. A buying agent is instructed and paid by the buyer alone.</p>
<p><strong>Do I need a lawyer if the notary is involved?</strong> The notary verifies legality and registers the transfer. They do not represent your interests specifically and will not advise on whether the price is sensible or the renovation permitted. Above roughly EUR 300,000 an independent lawyer is money well spent.</p>
<p><strong>What are the total costs on top of the price?</strong> Broadly eight to twelve per cent for a second home: registration tax, notary, agency commission, legal fees and survey.</p>
<p><strong>Can you help if I have already found the property?</strong> Yes, and this is often where we add the most value. Diagnostics, valuation and negotiation on a property you identified yourself is a defined piece of work with a fixed fee.</p>
<p style="margin-top:32px">Discuss a purchase: <a href="mailto:info@theitaliangateway.com">info@theitaliangateway.com</a></p>
<p><a href="/guide/lake-como-property/">Read our Lake Como property guide</a> · <a href="/guide/buying-property-italy-foreigner-step-by-step-2026/">Step-by-step buying guide</a></p>`;

writeFileSync(join(DIST, 'buying-agent', 'index.html'), page(
  'Property Buying Agent Italy: Lake Como, Milan, Tuscany | The Italian Gateway',
  'Independent buying agent acting for the buyer only. Lake Como, Milan and Tuscany. Search, diagnostics, negotiation and completion. Paid by you, not the seller.',
  DOMAIN + '/buying-agent/',
  agentBody
));
console.log('  + buying-agent/');

// ── Inject SEO content into homepage ────────────────────────
let homepage = readFileSync(join(DIST, 'index.html'), 'utf8');
const seo = `<noscript>
<h1>The Italian Gateway — Premium Relocation Advisory for HNWI Moving to Italy</h1>
<p>We guide high-net-worth individuals and families to their ideal life in Italy. Tax optimization, private banking, real estate, healthcare, education, yachting — all through a single, confidential point of contact in Milan.</p>
<h2>Services</h2>
<p>Private Banking introductions. Tax and Legal structuring including the 300,000 euro flat tax regime. Real Estate across Milan, Lake Como, Tuscany, and the Amalfi Coast. Healthcare coordination. Education consulting for international schools. Immigration management. Yachting and marina services.</p>
<h2>Services</h2>
<ul>
<li><a href="/orientation/">Multi-Advisory Orientation</a> — coordinated advice across medicine, finance, tax and law</li>
<li><a href="/healthcare/">Healthcare Setup Service</a> — SSN, private GP and insurance decided properly</li>
<li><a href="/buying-agent/">Property Buying Agent</a> — Lake Como, Milan and Tuscany, acting for the buyer only</li>
<li><a href="/professionals/">For Wealth Managers and Family Offices</a></li>
<li><a href="/athletes/">Athlete and Sports Relocation</a></li>
<li><a href="/advisors/">Our Advisory Network</a></li>
<li><a href="/about/">About The Italian Gateway</a></li>
</ul>
<h2>Guides</h2>
<ul>
${ARTICLES.map(a => '<li><a href="/guide/' + a.id + '/">' + a.title + '</a></li>').join('\n')}
</ul>
<h2>Contact</h2>
<p>Email: info@theitaliangateway.com</p>
</noscript>`;
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

// ── Verifica finale: i file critici esistono? ───────────────
const critical = ['sitemap.xml', 'robots.txt', 'index.html'];
let allOk = true;
for (const f of critical) {
  if (existsSync(join(DIST, f))) {
    console.log('  \u2713 ' + f + ' present');
  } else {
    console.error('  \u2717 MISSING: ' + f);
    allOk = false;
  }
}
if (!allOk) {
  console.error('[seo] CRITICAL FILES MISSING - build should be investigated');
  process.exit(1);
}

console.log('[seo] Done!');
