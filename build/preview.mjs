/* Prévisualisation locale de la page de vente (clair + sombre). */
import { chromium } from 'playwright';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
const frag = readFileSync('dist/page-produit.html', 'utf8');
const tmp = path.resolve('dist/_preview.html');
writeFileSync(tmp, `<!doctype html><html lang="fr"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head><body>${frag}</body></html>`);
const b = await chromium.launch();
for (const [theme, name] of [['light', 'clair'], ['dark', 'sombre']]) {
  const ctx = await b.newContext({ viewport: { width: 1280, height: 1000 }, colorScheme: theme });
  const p = await ctx.newPage();
  await p.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  // les data-URI ne déclenchent aucun trafic réseau : networkidle ne les attend pas
  await p.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  await p.waitForTimeout(400);
  await p.screenshot({ path: `/tmp/claude-0/-home-user-pack-organisation-etudiant/6d282854-2080-5794-8a89-1b723562c43f/scratchpad/vente-${name}.png`, fullPage: true });
  const err = await p.evaluate(() => {
    const b = document.body;
    return { hScroll: b.scrollWidth > window.innerWidth + 2, ctaKids: document.getElementById('cta').childElementCount };
  });
  console.log(theme, JSON.stringify(err));
  await ctx.close();
}
unlinkSync(tmp);
await b.close();
