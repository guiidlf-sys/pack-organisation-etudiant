/* Rendu : HTML -> PDF (impression + tablette) + PNG d'aperçu, via Chromium/Playwright.
   Trois éditions : BASIC (7 p.), COMPLETE (15 p.), ULTIMATE (20 p.). */
import { chromium } from 'playwright';
import { buildHTML, EDITIONS } from '../src/planner.mjs';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = path.join(ROOT, 'build');
const DIST = path.join(ROOT, 'dist');
const IMG = path.join(DIST, 'images');

mkdirSync(BUILD, { recursive: true });
mkdirSync(path.join(IMG, 'pages'), { recursive: true });
mkdirSync(path.join(IMG, 'pages-bonus'), { recursive: true });
mkdirSync(path.join(IMG, 'covers'), { recursive: true });

const ready = async (page, file) => {
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
};

const browser = await chromium.launch();
const pdfCtx = await browser.newContext();
const pdfPage = await pdfCtx.newPage();

const PDF_OPTS = {
  format: 'A4', printBackground: true, preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
};

/* ---------- PDF : 3 éditions x 2 variantes ---------- */
for (const ed of Object.values(EDITIONS)) {
  for (const tablet of [false, true]) {
    const html = buildHTML({ tablet, edition: ed.key });
    const src = path.join(BUILD, `planner-${ed.key}-${tablet ? 'tablet' : 'print'}.html`);
    writeFileSync(src, html);
    await ready(pdfPage, src);
    await pdfPage.pdf({ ...PDF_OPTS, path: path.join(DIST, `${ed.file}${tablet ? '_TABLETTE' : ''}.pdf`) });
  }
  console.log(`PDF ${ed.key.padEnd(9)} : impression + tablette`);
}
await pdfCtx.close();

/* ---------- PNG page par page ---------- */
const shotCtx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 900, height: 1300 } });
const shotPage = await shotCtx.newPage();

const shoot = async (file, dir, from = 0, to = Infinity) => {
  await ready(shotPage, file);
  const total = await shotPage.locator('.page').count();
  let done = 0;
  for (let i = from; i < Math.min(total, to); i++) {
    const n = String(i + 1).padStart(2, '0');
    await shotPage.locator('.page').nth(i).screenshot({ path: path.join(dir, `page-${n}.png`) });
    done++;
  }
  return done;
};

/* couverture de chaque édition, pour les visuels de boutique */
for (const ed of Object.values(EDITIONS)) {
  await ready(shotPage, path.join(BUILD, `planner-${ed.key}-print.html`));
  await shotPage.locator('.page').first().screenshot({ path: path.join(IMG, 'covers', `cover-${ed.key}.png`) });
}
console.log('PNG couvertures : 3 éditions');

const nCore = await shoot(path.join(BUILD, 'planner-complete-print.html'), path.join(IMG, 'pages'));
console.log(`PNG pack complet : ${nCore} pages`);
const nBonus = await shoot(path.join(BUILD, 'planner-ultimate-print.html'), path.join(IMG, 'pages-bonus'), 14, 19);
console.log(`PNG pages bonus  : ${nBonus} pages`);

await shotCtx.close();
await browser.close();
