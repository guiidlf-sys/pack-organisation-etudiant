/* ==========================================================================
   Épingles Pinterest — format 1000 x 1500 (2:3), le ratio que Pinterest pousse.
   Titre lisible en vignette, page réelle du produit, marque en pied.
   ========================================================================== */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const IMG = path.resolve('dist/images');
const OUT = path.join(IMG, 'pinterest');
mkdirSync(OUT, { recursive: true });

const pg = (n) => `pages/page-${String(n).padStart(2, '0')}.png`;
const bn = (n) => `pages-bonus/page-${n}.png`;

const CSS = `
@import url('../../assets/fonts/fonts.css');
*{margin:0;padding:0;box-sizing:border-box}
body{width:500px;height:750px;overflow:hidden;font-family:'Inter',sans-serif;-webkit-font-smoothing:antialiased}
.pin{width:500px;height:750px;background:#F5F3FF;display:flex;flex-direction:column;
     align-items:center;padding:38px 34px 0;position:relative;overflow:hidden;color:#14142B}
.eyebrow{font-family:'Outfit',sans-serif;font-weight:700;font-size:12px;letter-spacing:.2em;
         text-transform:uppercase;color:#6C4FE0;text-align:center}
h1{font-family:'Outfit',sans-serif;font-weight:800;letter-spacing:-.022em;line-height:1.04;
   text-align:center;margin-top:12px;font-size:38px;text-wrap:balance}
.sub{font-size:16px;color:#6E6B85;text-align:center;margin-top:12px;line-height:1.5;max-width:380px}
.shot{margin-top:24px;display:flex;justify-content:center;gap:14px;flex:1 1 auto;
      align-items:flex-start;width:100%;padding-bottom:92px;overflow:hidden}
.shot img{border-radius:6px;box-shadow:0 18px 40px rgba(20,20,43,.26);background:#fff}
.foot{position:absolute;left:0;right:0;bottom:0;height:74px;
      background:linear-gradient(90deg,#3F55E0,#6C4FE0 55%,#9061F0);
      display:flex;align-items:center;justify-content:space-between;padding:0 34px;color:#fff}
.foot .b{font-family:'Outfit',sans-serif;font-weight:800;font-size:19px;letter-spacing:-.01em}
.foot .m{font-family:'Outfit',sans-serif;font-weight:600;font-size:13px;letter-spacing:.09em;
         text-transform:uppercase;opacity:.9}
.blob{position:absolute;border-radius:50%;background:rgba(108,79,224,.07)}
`;

/* image(s) mises en avant, titre optimisé pour la recherche Pinterest */
const PINS = [
  ['01-planner-etudiant', 'Édition 2026 – 2027', 'Planner étudiant<br>à imprimer',
   '15 pages A4 : planning, devoirs, révisions, objectifs et notes.',
   [[pg(1), 215, -3], [pg(4), 168, 4]]],

  ['02-emploi-du-temps', 'Page 3 du pack', 'Emploi du temps<br>à imprimer',
   'La semaine type, de 8 h à 17 h, sur une seule page A4.',
   [[pg(3), 280, 0]]],

  ['03-to-do-list', 'Page 5 du pack', 'To-do list<br>à imprimer',
   'Trois niveaux de priorité pour savoir par quoi commencer.',
   [[pg(5), 280, 0]]],

  ['04-suivi-devoirs', 'Page 6 du pack', 'Suivi des devoirs<br>à imprimer',
   'Matière, devoir, date, priorité, case à cocher. Onze lignes.',
   [[pg(6), 280, 0]]],

  ['05-fiche-revision', 'Page 8 du pack', 'Fiche de révision<br>à imprimer',
   'Un chapitre par fiche : les 5 choses à retenir, les mots-clés, ce qui bloque.',
   [[pg(8), 280, 0]]],

  ['06-suivi-des-notes', 'Page 9 du pack', 'Suivi des notes<br>à imprimer',
   'Quinze lignes pour voir sa progression matière par matière.',
   [[pg(9), 280, 0]]],

  ['07-habit-tracker', 'Page 11 du pack', 'Habit tracker<br>31 jours',
   'Cinq habitudes, deux lignes libres, une case par jour.',
   [[pg(11), 280, 0]]],

  ['08-calendrier-mensuel', 'Page 12 du pack', 'Calendrier mensuel<br>à imprimer',
   'La vue d’ensemble : contrôles, rendus, dates à retenir.',
   [[pg(12), 280, 0]]],

  ['09-planner-tablette', 'Version tablette incluse', 'Planner GoodNotes<br>en français',
   'PDF avec navigation cliquable pour GoodNotes, Notability, Xodo et Samsung Notes.',
   [[pg(2), 168, -5], [pg(13), 215, 3]]],

  ['10-budget-etudiant', 'Formule Ultimate', 'Budget étudiant<br>à imprimer',
   'Ce qui rentre, ce qui sort, ce qu’il reste. Plus un rétroplanning d’examen.',
   [[bn(16), 168, -5], [bn(17), 215, 3]], '20 pages · PDF A4'],
];

const html = (eyebrow, title, sub, shots, meta = '15 pages · PDF A4') => `<!doctype html><html><head><meta charset="utf-8">
<style>${CSS}</style></head><body>
<div class="pin">
  <div class="blob" style="width:300px;height:300px;right:-120px;top:-110px"></div>
  <div class="blob" style="width:190px;height:190px;left:-80px;top:300px"></div>
  <div class="eyebrow">${eyebrow}</div>
  <h1>${title}</h1>
  <div class="sub">${sub}</div>
  <div class="shot">
    ${shots.map(([src, w, rot]) => `<img src="${src}" style="width:${w}px;transform:rotate(${rot}deg)">`).join('')}
  </div>
  <div class="foot"><span class="b">Studio Récap</span><span class="m">${meta}</span></div>
</div>
</body></html>`;

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 500, height: 750 } });
const page = await ctx.newPage();

for (const [name, eyebrow, title, sub, shots, meta] of PINS) {
  const tmp = path.join(IMG, `_pin-${name}.html`);
  writeFileSync(tmp, html(eyebrow, title, sub, shots, meta));
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map((i) => i.decode().catch(() => {}))));
  await page.locator('.pin').screenshot({ path: path.join(OUT, `${name}.png`) });
  unlinkSync(tmp);
  console.log('épingle :', name);
}
await browser.close();
