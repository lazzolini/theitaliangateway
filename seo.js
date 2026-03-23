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

// ── Inject SEO content into homepage ────────────────────────
let homepage = readFileSync(join(DIST, 'index.html'), 'utf8');
const seo = `<div id="seo" style="position:absolute;left:-9999px;width:1px;height:1px;overflow:hidden" aria-hidden="true">
<h1>The Italian Gateway — Premium Relocation Advisory for HNWI Moving to Italy</h1>
<p>We guide high-net-worth individuals and families to their ideal life in Italy. Tax optimization, private banking, real estate, healthcare, education, yachting — all through a single, confidential point of contact in Milan.</p>
<h2>Services</h2>
<p>Private Banking introductions. Tax and Legal structuring including the 200,000 euro flat tax regime. Real Estate across Milan, Lake Como, Tuscany, and the Amalfi Coast. Healthcare coordination. Education consulting for international schools. Immigration management. Yachting and marina services.</p>
<h2>Guides</h2>
${ARTICLES.map(a => '<p><a href="/guide/' + a.id + '/">' + a.title + '</a> - ' + a.desc + '</p>').join('\n')}
<h2>Contact</h2>
<p>Email: info@theitaliangateway.com. Book a confidential 30-minute discovery call.</p>
</div>`;
homepage = homepage.replace('</body>', seo + '\n</body>');
writeFileSync(join(DIST, 'index.html'), homepage);
console.log('  + homepage SEO injected');

// ── Sitemap ─────────────────────────────────────────────────
const urls = [
  { loc: '/', p: '1.0' },
  { loc: '/guides/', p: '0.9' },
  ...ARTICLES.map(a => ({ loc: '/guide/' + a.id + '/', p: '0.8' }))
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
