/* Rendu : HTML -> PDF (impression + tablette) + PNG d'aperçu, via Chromium/Playwright. */
import { chromium } from 'playwright';
import { buildHTML } from '../src/planner.mjs';
import { writeFileSync, mkdirSync } from 'fs';
import { fileURLToPath, pathToFileURL } from 'url';
import path from 'path';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BUILD = path.join(ROOT, 'build');
const DIST = path.join(ROOT, 'dist');
const IMG = path.join(DIST, 'images');
const PAGES = path.join(IMG, 'pages');

mkdirSync(BUILD, { recursive: true });
mkdirSync(PAGES, { recursive: true });

writeFileSync(path.join(BUILD, 'planner-print.html'), buildHTML({ tablet: false }));
writeFileSync(path.join(BUILD, 'planner-tablet.html'), buildHTML({ tablet: true }));

const ready = async (page, file) => {
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(400);
};

const browser = await chromium.launch();

/* ---------- PDF ---------- */
const pdfCtx = await browser.newContext();
const pdfPage = await pdfCtx.newPage();

await ready(pdfPage, path.join(BUILD, 'planner-print.html'));
await pdfPage.pdf({
  path: path.join(DIST, 'Pack_Organisation_Etudiant_2026_2027.pdf'),
  format: 'A4', printBackground: true, preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
console.log('PDF impression OK');

await ready(pdfPage, path.join(BUILD, 'planner-tablet.html'));
await pdfPage.pdf({
  path: path.join(DIST, 'Pack_Organisation_Etudiant_2026_2027_TABLETTE.pdf'),
  format: 'A4', printBackground: true, preferCSSPageSize: true,
  margin: { top: '0', right: '0', bottom: '0', left: '0' },
});
console.log('PDF tablette OK');
await pdfCtx.close();

/* ---------- PNG page par page (150 dpi ~ facteur 1.57 ; on prend 2x) ---------- */
const shotCtx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 900, height: 1300 } });
const shotPage = await shotCtx.newPage();
await ready(shotPage, path.join(BUILD, 'planner-print.html'));
const total = await shotPage.locator('.page').count();
for (let i = 0; i < total; i++) {
  const n = String(i + 1).padStart(2, '0');
  await shotPage.locator('.page').nth(i).screenshot({ path: path.join(PAGES, `page-${n}.png`) });
}
console.log(`PNG : ${total} pages`);
await shotCtx.close();

await browser.close();
