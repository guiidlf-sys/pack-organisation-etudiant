/* Aperçu des couvertures des trois éditions (contrôle visuel). */
import { chromium } from 'playwright';
import { writeFileSync, unlinkSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
const B = path.resolve('build'), IMG = path.resolve('dist/images');
const b = await chromium.launch();
const ctx = await b.newContext({ deviceScaleFactor: 1.4, viewport: { width: 900, height: 1300 } });
const p = await ctx.newPage();
const out = [];
for (const ed of ['basic', 'complete', 'ultimate']) {
  const f = path.join(B, `planner-${ed}-print.html`);
  await p.goto(pathToFileURL(f).href, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(250);
  const dst = path.join(IMG, `_cover-${ed}.png`);
  await p.locator('.page').first().screenshot({ path: dst });
  out.push([ed, dst]);
}
const html = `<html><body style="margin:0;background:#fff;display:grid;grid-template-columns:repeat(3,1fr);gap:14px;padding:14px;width:1900px">
${out.map(([ed, f]) => `<div style="position:relative"><img src="file://${f}" style="width:100%;display:block;border:1px solid #ccc">
<div style="position:absolute;top:4px;left:4px;background:#111;color:#fff;font:700 20px sans-serif;padding:2px 8px">${ed.toUpperCase()}</div></div>`).join('')}
</body></html>`;
const tmp = path.join(IMG, '_covers.html');
writeFileSync(tmp, html);
const p2 = await ctx.newPage();
await p2.setViewportSize({ width: 1900, height: 100 });
await p2.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
await p2.screenshot({ path: '/tmp/claude-0/-home-user-pack-organisation-etudiant/6d282854-2080-5794-8a89-1b723562c43f/scratchpad/covers.png', fullPage: true });
unlinkSync(tmp);
out.forEach(([, f]) => unlinkSync(f));
await b.close();
console.log('couvertures OK');
