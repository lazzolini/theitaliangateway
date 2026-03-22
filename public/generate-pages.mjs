// generate-pages.mjs — Runs after vite build to create static HTML pages
// This makes every article and page visible to Google without JavaScript

import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const DIST = join(__dirname, 'dist');
const DOMAIN = 'https://theitaliangateway.com';

// Read articles from source — parse using Function to avoid import issues
const artSrc = readFileSync(join(__dirname, 'src/articles.js'), 'utf8');
const cleanSrc = artSrc
  .replace('export default ARTICLES;', '')
  .replace(/^\/\/.*$/gm, '');
const ARTICLES = new Function(cleanSrc + '\nreturn ARTICLES;')();

// Read the built index.html as template
const template = readFileSync(join(DIST, 'index.html'), 'utf8');

// Extract the <head> content and script tags from template
const headMatch = template.match(/<head>([\s\S]*?)<\/head>/);
const scriptMatch = template.match(/<script[\s\S]*?<\/script>/g) || [];
const headContent = headMatch ? headMatch[1] : '';
// Get CSS link tags
const cssLinks = (headContent.match(/<link[^>]*stylesheet[^>]*>/g) || []).join('\n');
// Get module script tags  
const scripts = scriptMatch.join('\n');

const C = { bg: '#0A0E17', gold: '#C9A96E', text: '#E5E7EB', textDim: '#9CA3AF', white: '#FFFFFF', border: '#1F2937', card: '#111827' };

function makeStyle() {
  return `
    <style>
      *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
      body { background: ${C.bg}; color: ${C.text}; font-family: 'Segoe UI', -apple-system, sans-serif; -webkit-font-smoothing: antialiased; }
      ::selection { background: ${C.gold}; color: ${C.bg}; }
      a { color: ${C.gold}; text-decoration: none; }
      a:hover { text-decoration: underline; }
      .container { max-width: 780px; margin: 0 auto; padding: 80px 24px; }
      .nav { position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(10,14,23,0.97); border-bottom: 1px solid ${C.border}; }
      .nav-inner { max-width: 1200px; margin: 0 auto; padding: 16px 24px; display: flex; align-items: center; justify-content: space-between; }
      .logo { font-family: Georgia, serif; font-size: 22px; }
      .logo-gold { color: ${C.gold}; }
      .logo-white { color: ${C.white}; margin-left: 6px; }
      .nav-links a { color: ${C.textDim}; font-size: 14px; margin-left: 24px; letter-spacing: 1px; }
      .nav-links a:hover { color: ${C.gold}; text-decoration: none; }
      .btn-gold { background: ${C.gold}; color: ${C.bg}; padding: 10px 24px; border: none; font-size: 13px; font-weight: 600; letter-spacing: 1px; margin-left: 24px; text-decoration: none; }
      h1 { font-family: Georgia, serif; font-size: 36px; color: ${C.white}; font-weight: 400; line-height: 1.25; margin-bottom: 20px; margin-top: 60px; }
      h2 { font-family: Georgia, serif; font-size: 28px; color: ${C.white}; font-weight: 400; margin-top: 48px; margin-bottom: 16px; padding-bottom: 12px; border-bottom: 1px solid ${C.border}; }
      h3 { font-family: Georgia, serif; font-size: 21px; color: ${C.gold}; font-weight: 400; margin-top: 32px; margin-bottom: 12px; }
      p { font-size: 16px; line-height: 1.8; margin-bottom: 20px; }
      .meta { display: flex; gap: 16px; margin-bottom: 16px; flex-wrap: wrap; }
      .meta-cat { color: ${C.gold}; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; background: rgba(201,169,110,0.1); padding: 4px 12px; }
      .meta-read { color: ${C.textDim}; font-size: 12px; }
      .desc { color: ${C.textDim}; font-size: 17px; line-height: 1.7; }
      .divider { height: 2px; background: linear-gradient(to right, ${C.gold}, transparent); margin-top: 32px; margin-bottom: 32px; }
      ul { margin: 0 0 24px; padding-left: 0; list-style: none; }
      li { font-size: 15px; line-height: 1.7; margin-bottom: 10px; padding-left: 24px; position: relative; }
      li::before { content: '•'; position: absolute; left: 0; color: ${C.gold}; }
      table { width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 24px; }
      th { text-align: left; padding: 12px 16px; background: rgba(201,169,110,0.1); color: ${C.gold}; font-weight: 600; font-size: 12px; letter-spacing: 1px; text-transform: uppercase; border-bottom: 2px solid ${C.gold}; }
      td { padding: 12px 16px; border-bottom: 1px solid ${C.border}; line-height: 1.5; }
      .callout { background: rgba(201,169,110,0.08); border-left: 3px solid ${C.gold}; padding: 20px 24px; margin-bottom: 24px; }
      .faq-q { color: ${C.white}; font-size: 16px; font-weight: 600; margin-bottom: 8px; }
      .faq-a { color: ${C.textDim}; font-size: 15px; line-height: 1.7; margin-bottom: 24px; }
      .cta-box { background: ${C.card}; border: 1px solid ${C.gold}; padding: 48px; text-align: center; margin-top: 48px; }
      .cta-box h3 { color: ${C.white}; margin-top: 0; }
      .cta-box p { color: ${C.textDim}; font-size: 14px; max-width: 400px; margin: 0 auto 24px; }
      .footer { max-width: 1200px; margin: 60px auto 0; padding: 40px 24px; border-top: 1px solid ${C.border}; text-align: center; color: ${C.textDim}; font-size: 12px; }
      @media(max-width:768px) { h1 { font-size: 28px; } .nav-links { display: none; } .btn-gold { display: none; } }
    </style>`;
}

function makeNav() {
  return `
    <nav class="nav">
      <div class="nav-inner">
        <a href="/" class="logo"><span class="logo-gold">THE ITALIAN</span><span class="logo-white">GATEWAY</span></a>
        <div class="nav-links">
          <a href="/">Home</a>
          <a href="/guides/">Guides</a>
          <a href="/locations/">Locations</a>
          <a href="/quiz/">Quiz</a>
          <a href="/#contact">Contact</a>
          <a href="/#contact" class="btn-gold">BOOK A CALL</a>
        </div>
      </div>
    </nav>`;
}

function makeFooter() {
  return `
    <footer class="footer">
      <p>© 2026 The Italian Gateway. All rights reserved. This website does not constitute financial, legal, or tax advice.</p>
      <p style="margin-top:8px"><a href="/">Home</a> · <a href="/guides/">Guides</a> · <a href="/locations/">Locations</a> · <a href="mailto:info@theitaliangateway.com">info@theitaliangateway.com</a></p>
    </footer>`;
}

function renderBlock(b) {
  if (b.type === 'p') return `<p>${b.text}</p>`;
  if (b.type === 'h2') return `<h2>${b.text}</h2>`;
  if (b.type === 'h3') return `<h3>${b.text}</h3>`;
  if (b.type === 'list') return `<ul>${b.items.map(it => `<li>${it}</li>`).join('\n')}</ul>`;
  if (b.type === 'table') return `<div style="overflow-x:auto"><table><thead><tr>${b.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead><tbody>${b.rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('\n')}</tbody></table></div>`;
  if (b.type === 'callout') return `<div class="callout"><p>${b.text}</p></div>`;
  if (b.type === 'faq') return `<div class="faq-q">${b.q}</div><div class="faq-a">${b.a}</div>`;
  return '';
}

function makePage(title, description, canonical, bodyHtml) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <meta name="description" content="${description.replace(/"/g, '&quot;')}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${canonical}">
  <meta property="og:type" content="article">
  <meta property="og:url" content="${canonical}">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description.replace(/"/g, '&quot;')}">
  <meta property="og:site_name" content="The Italian Gateway">
  <meta name="twitter:card" content="summary">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description.replace(/"/g, '&quot;')}">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  ${makeStyle()}
</head>
<body>
  ${makeNav()}
  <main class="container">
    ${bodyHtml}
  </main>
  ${makeFooter()}
</body>
</html>`;
}

function ensureDir(dir) {
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
}

// ============================================================
// GENERATE ARTICLE PAGES
// ============================================================
console.log('Generating static pages...');

ensureDir(join(DIST, 'guide'));

for (const art of ARTICLES) {
  const slug = art.id;
  const dir = join(DIST, 'guide', slug);
  ensureDir(dir);

  const bodyHtml = `
    <a href="/guides/" style="color:${C.gold};font-size:13px;display:inline-block;margin-bottom:24px">← Back to Guides</a>
    <div class="meta">
      <span class="meta-cat">${art.cat}</span>
      <span class="meta-read">${art.read} read</span>
    </div>
    <h1>${art.title}</h1>
    <p class="desc">${art.desc}</p>
    <div class="divider"></div>
    ${art.content.map(renderBlock).join('\n')}
    <div class="cta-box">
      <h3 style="font-family:Georgia,serif;font-size:24px;font-weight:400">Want personalized guidance?</h3>
      <p>Confidential 30-minute call to discuss your situation.</p>
      <a href="/#contact" class="btn-gold" style="display:inline-block;padding:14px 36px">BOOK A CALL</a>
    </div>`;

  const html = makePage(
    `${art.title} | The Italian Gateway`,
    art.desc,
    `${DOMAIN}/guide/${slug}/`,
    bodyHtml
  );
  writeFileSync(join(dir, 'index.html'), html);
  console.log(`  ✓ /guide/${slug}/`);
}

// ============================================================
// GENERATE GUIDES LISTING PAGE
// ============================================================
ensureDir(join(DIST, 'guides'));

const guidesBody = `
  <h1>Guides for Relocating to Italy</h1>
  <p class="desc">Comprehensive, data-driven guides for HNWI and families considering Italy. Tax optimization, real estate, healthcare, banking, education, immigration, and yachting.</p>
  <div class="divider"></div>
  ${ARTICLES.map(a => `
    <a href="/guide/${a.id}/" style="display:block;background:${C.card};border:1px solid ${C.border};padding:32px;margin-bottom:16px;text-decoration:none">
      <div class="meta"><span class="meta-cat">${a.cat}</span><span class="meta-read">${a.read} read</span></div>
      <h3 style="color:${C.white};font-size:20px;margin:8px 0;font-family:Georgia,serif;font-weight:400">${a.title}</h3>
      <p style="color:${C.textDim};font-size:14px;margin:0">${a.desc}</p>
    </a>
  `).join('\n')}`;

writeFileSync(join(DIST, 'guides', 'index.html'), makePage(
  'Relocation Guides for HNWI Moving to Italy | The Italian Gateway',
  'Comprehensive guides on Italian flat tax, real estate, private banking, healthcare, education, immigration, and yachting for high-net-worth individuals relocating to Italy.',
  `${DOMAIN}/guides/`,
  guidesBody
));
console.log('  ✓ /guides/');

// ============================================================
// GENERATE LOCATIONS PAGE
// ============================================================
ensureDir(join(DIST, 'locations'));

const LOCS = [
  { title: "Lake Como", sub: "Lombardy — 50 min from Milan Malpensa", desc: "The most discreet luxury destination in Europe. Lakefront villas €3M–50M+. Hillside homes €800K–8M. Privacy, natural beauty, easy access to Milan and Switzerland." },
  { title: "Milan", sub: "Italy's financial and fashion capital", desc: "Where Italy meets the world. Porta Nuova penthouses €10,000–15,000/sqm. Brera historic apartments €6,000–12,000/sqm. 3 airports, 6+ international schools, top hospitals." },
  { title: "Tuscany — Chianti & Val d'Orcia", sub: "Between Florence and Siena", desc: "Rolling hills, wine estates, UNESCO landscapes. Restored farmhouses €1.5M–10M. Wine estates with vineyards €3M–25M. 7% retiree flat tax eligible in qualifying municipalities." },
  { title: "Amalfi Coast", sub: "Positano, Ravello, Amalfi", desc: "The most dramatic coastline in the Mediterranean. Cliffside villas €3M–20M+. Year-round warmth, Capri by boat, 7% retiree flat tax eligible." },
  { title: "Sardinia — Costa Smeralda", sub: "Porto Cervo, Porto Rotondo", desc: "Italy's most exclusive summer destination. Villas near Yacht Club Costa Smeralda from €5M. World-class marinas, crystal beaches, peak social season June–September." },
  { title: "Italian Riviera — Portofino", sub: "Between Genoa and La Spezia", desc: "The most photographed harbor in Italy. Portofino properties rarely come to market, starting €5M. Santa Margherita €4,000–10,000/sqm. Cinque Terre nearby, best microclimate in Northern Italy." },
];

const locsBody = `
  <h1>Italy's Most Desirable Locations for HNWI</h1>
  <p class="desc">Each region offers a distinct lifestyle, property market, and community. We help you find the right one — and the right property within it.</p>
  <div class="divider"></div>
  ${LOCS.map(l => `
    <div style="background:${C.card};border:1px solid ${C.border};padding:32px;margin-bottom:24px">
      <h2 style="border:none;padding:0;margin:0 0 4px">${l.title}</h2>
      <p style="color:${C.gold};font-size:13px;font-style:italic;margin-bottom:16px">${l.sub}</p>
      <p style="margin:0">${l.desc}</p>
    </div>
  `).join('\n')}
  <div class="cta-box">
    <h3 style="font-family:Georgia,serif;font-size:22px;font-weight:400">Not sure which location is right for you?</h3>
    <p>Book a confidential call to discuss your priorities.</p>
    <a href="/#contact" class="btn-gold" style="display:inline-block;padding:14px 36px">BOOK A CALL</a>
  </div>`;

writeFileSync(join(DIST, 'locations', 'index.html'), makePage(
  "Where to Live in Italy — Best Locations for HNWI | The Italian Gateway",
  "Lake Como, Milan, Tuscany, Amalfi Coast, Sardinia, Portofino: property prices, lifestyle, and climate for high-net-worth individuals relocating to Italy.",
  `${DOMAIN}/locations/`,
  locsBody
));
console.log('  ✓ /locations/');

// ============================================================
// INJECT CONTENT INTO HOMEPAGE
// ============================================================
// Add hidden SEO content to the main index.html so Google sees text
const seoContent = `
  <div id="seo-content" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden" aria-hidden="true">
    <h1>The Italian Gateway — Premium Relocation Advisory for HNWI Moving to Italy</h1>
    <p>We guide high-net-worth individuals and families to their ideal life in Italy. Tax optimization, private banking, real estate, healthcare, education, yachting — all through a single, confidential point of contact in Milan.</p>
    <h2>Our Services</h2>
    <p>Private Banking introductions to Italy's top institutions. Tax and Legal structuring including the €200,000 flat tax regime. Real Estate search across Milan, Lake Como, Tuscany, and the Amalfi Coast. Healthcare coordination with English-speaking private GPs and VIP hospital access. Education consulting for international schools in Milan. Immigration management for residence permits, golden visa, and citizenship. Yachting and marina services across the Mediterranean.</p>
    <h2>Guides</h2>
    ${ARTICLES.map(a => `<p><a href="/guide/${a.id}/">${a.title}</a> — ${a.desc}</p>`).join('\n')}
    <h2>Locations</h2>
    ${LOCS.map(l => `<p>${l.title} (${l.sub}): ${l.desc}</p>`).join('\n')}
    <h2>Contact</h2>
    <p>Email: info@theitaliangateway.com. Book a confidential 30-minute discovery call to discuss your relocation to Italy.</p>
  </div>`;

let homepage = readFileSync(join(DIST, 'index.html'), 'utf8');
homepage = homepage.replace('<div id="root"></div>', `<div id="root"></div>\n${seoContent}`);
writeFileSync(join(DIST, 'index.html'), homepage);
console.log('  ✓ / (homepage SEO content injected)');

// ============================================================
// UPDATE SITEMAP
// ============================================================
const urls = [
  { loc: '/', priority: '1.0', freq: 'weekly' },
  { loc: '/guides/', priority: '0.9', freq: 'weekly' },
  { loc: '/locations/', priority: '0.8', freq: 'monthly' },
];
for (const a of ARTICLES) {
  urls.push({ loc: `/guide/${a.id}/`, priority: '0.8', freq: 'monthly' });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${DOMAIN}${u.loc}</loc>
    <lastmod>2026-03-22</lastmod>
    <changefreq>${u.freq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

writeFileSync(join(DIST, 'sitemap.xml'), sitemap);
console.log('  ✓ /sitemap.xml');

// Robots.txt
writeFileSync(join(DIST, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${DOMAIN}/sitemap.xml\n`);
console.log('  ✓ /robots.txt');

console.log(`\nDone! Generated ${ARTICLES.length} article pages + guides + locations + sitemap`);
