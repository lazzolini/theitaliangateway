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

function page(title, desc, canonical, body) {
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

  writeFileSync(join(dir, 'index.html'), page(
    art.title + ' | The Italian Gateway',
    art.desc,
    DOMAIN + '/guide/' + art.id + '/',
    body
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

console.log('[seo] Done!');
