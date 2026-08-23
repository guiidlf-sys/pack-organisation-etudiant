/* Planche contact pour contrôle qualité visuel. */
import { chromium } from 'playwright';
import { readdirSync, writeFileSync, unlinkSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
const PAGES = path.resolve('dist/images/pages');
const files = readdirSync(PAGES).filter(f => f.endsWith('.png')).sort();
const groups = [files.slice(0, 6), files.slice(6, 12), files.slice(12)];
const b = await chromium.launch();
for (let g = 0; g < groups.length; g++) {
  const html = `<html><body style="margin:0;background:#fff;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:14px;width:2040px">
  ${groups[g].map(f => `<div style="position:relative"><img src="file://${path.join(PAGES, f)}" style="width:100%;display:block;border:1px solid #ccc">
  <div style="position:absolute;top:4px;left:4px;background:#111;color:#fff;font:700 20px sans-serif;padding:2px 8px">${f.replace('page-', '').replace('.png', '')}</div></div>`).join('')}
  </body></html>`;
  const tmp = path.join(PAGES, `_sheet-${g + 1}.html`);
  writeFileSync(tmp, html);
  const p = await b.newPage({ viewport: { width: 2040, height: 100 } });
  await p.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await p.screenshot({ path: `/tmp/claude-0/-home-user-pack-organisation-etudiant/6d282854-2080-5794-8a89-1b723562c43f/scratchpad/sheet-${g + 1}.png`, fullPage: true });
  await p.close();
  unlinkSync(tmp);
}
await b.close();
console.log('planches OK');
