/* ==========================================================================
   Images commerciales pour la fiche produit (format carré 2000x2000).
   Elles montrent exactement ce que le client achète : pages réelles du PDF.
   ========================================================================== */
import { chromium } from 'playwright';
import { writeFileSync, mkdirSync, unlinkSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const ROOT = path.resolve('.');
const IMG = path.join(ROOT, 'dist/images');
const OUT = path.join(IMG, 'boutique');
mkdirSync(OUT, { recursive: true });

const pg = (n) => `pages/page-${String(n).padStart(2, '0')}.png`;
const bonus = (n) => `pages-bonus/page-${n}.png`;
const cover = (k) => `covers/cover-${k}.png`;

const CSS = `
@import url('../../assets/fonts/fonts.css');
*{margin:0;padding:0;box-sizing:border-box}
body{width:1000px;height:1000px;overflow:hidden;font-family:'Inter',sans-serif;
     -webkit-font-smoothing:antialiased;color:#14142B}
.stage{width:1000px;height:1000px;position:relative;display:flex;flex-direction:column;
       align-items:center;justify-content:center;padding:56px;overflow:hidden}
.bg-grad{background:linear-gradient(150deg,#3F55E0 0%,#6C4FE0 50%,#9061F0 100%)}
.bg-soft{background:#F4F2FF}
.bg-white{background:#fff}
.blob{position:absolute;border-radius:50%;background:rgba(255,255,255,.08)}
h1{font-family:'Outfit',sans-serif;font-weight:800;letter-spacing:-.02em;line-height:1.02}
h2{font-family:'Outfit',sans-serif;font-weight:700;letter-spacing:-.01em}
.eyebrow{font-family:'Outfit',sans-serif;font-weight:700;font-size:17px;letter-spacing:.2em;
         text-transform:uppercase}
.sheet{border-radius:10px;box-shadow:0 30px 70px rgba(20,20,43,.30);display:block;background:#fff}
.pill{display:inline-flex;align-items:center;gap:9px;border-radius:999px;padding:11px 22px;
      font-family:'Outfit',sans-serif;font-weight:700;font-size:16px;letter-spacing:.06em;
      text-transform:uppercase}
.pill-light{background:rgba(255,255,255,.16);border:1px solid rgba(255,255,255,.34);color:#fff}
.pill-violet{background:#EEEBFE;color:#4B34B0}
.row{display:flex;align-items:center;justify-content:center}
.badge{position:absolute;font-family:'Outfit',sans-serif;font-weight:800}
`;

const html = (body, cls = 'bg-soft') => `<!doctype html><html><head><meta charset="utf-8">
<style>${CSS}</style></head><body><div class="stage ${cls}">${body}</div></body></html>`;

/* -------------------------------------------------------- 01 miniature --- */
const miniature = html(`
  <div class="blob" style="width:620px;height:620px;right:-190px;top:-210px"></div>
  <div class="blob" style="width:380px;height:380px;left:-150px;bottom:-130px"></div>
  <div style="text-align:center;color:#fff;margin-bottom:34px">
    <div class="eyebrow" style="opacity:.85">Édition 2026 – 2027</div>
    <h1 style="font-size:72px;margin-top:14px;line-height:1.16">PACK ORGANISATION<br>ÉTUDIANT</h1>
    <div style="font-size:23px;opacity:.9;margin-top:16px">
      Planning · Devoirs · Révisions · Objectifs · Notes
    </div>
  </div>
  <div class="row" style="gap:-40px;position:relative;height:420px;width:100%">
    <img class="sheet" src="${pg(4)}" style="width:250px;position:absolute;left:190px;transform:rotate(-8deg)">
    <img class="sheet" src="${pg(9)}" style="width:250px;position:absolute;right:190px;transform:rotate(8deg)">
    <img class="sheet" src="${pg(1)}" style="width:290px;position:absolute;z-index:2;box-shadow:0 40px 80px rgba(20,20,43,.42)">
  </div>
  <div class="row" style="gap:14px;margin-top:34px">
    <span class="pill pill-light">15 pages A4</span>
    <span class="pill pill-light">PDF à imprimer</span>
    <span class="pill pill-light">Compatible tablette</span>
  </div>`, 'bg-grad');

/* ------------------------------------------------------- 02 couverture --- */
const couverture = html(`
  <div style="text-align:center;margin-bottom:34px">
    <div class="eyebrow" style="color:#6C4FE0">Ce que tu reçois</div>
    <h1 style="font-size:52px;margin-top:12px">Un planner complet,<br>prêt à imprimer</h1>
  </div>
  <img class="sheet" src="${pg(1)}" style="width:400px">
  <div class="row" style="gap:12px;margin-top:34px">
    <span class="pill pill-violet">Format A4</span>
    <span class="pill pill-violet">Téléchargement immédiat</span>
  </div>`);

/* ---------------------------------------------------------- 03 planning --- */
const planning = html(`
  <div style="text-align:center;margin-bottom:30px">
    <div class="eyebrow" style="color:#6C4FE0">Pages 3 & 4</div>
    <h1 style="font-size:50px;margin-top:12px">Ton planning,<br>d’un coup d'œil</h1>
    <div style="font-size:21px;color:#6E6B85;margin-top:14px">
      Emploi du temps de la semaine + vue jour par jour
    </div>
  </div>
  <div class="row" style="gap:34px">
    <img class="sheet" src="${pg(3)}" style="width:330px;transform:rotate(-3deg)">
    <img class="sheet" src="${pg(4)}" style="width:330px;transform:rotate(3deg)">
  </div>`);

/* ------------------------------------------------------------- 04 todo --- */
const todo = html(`
  <div style="text-align:center;margin-bottom:30px">
    <div class="eyebrow" style="color:#6C4FE0">Page 5</div>
    <h1 style="font-size:50px;margin-top:12px">Savoir par quoi<br>commencer</h1>
    <div style="font-size:21px;color:#6E6B85;margin-top:14px">
      To-do list à trois niveaux de priorité
    </div>
  </div>
  <img class="sheet" src="${pg(5)}" style="width:400px">`);

/* -------------------------------------------------------- 05 révisions --- */
const revision = html(`
  <div style="text-align:center;margin-bottom:30px">
    <div class="eyebrow" style="color:#6C4FE0">Pages 7 & 8</div>
    <h1 style="font-size:50px;margin-top:12px">Réviser sans<br>se noyer</h1>
    <div style="font-size:21px;color:#6E6B85;margin-top:14px">
      Plan de révision + fiche de révision à remplir
    </div>
  </div>
  <div class="row" style="gap:34px">
    <img class="sheet" src="${pg(7)}" style="width:330px;transform:rotate(-3deg)">
    <img class="sheet" src="${pg(8)}" style="width:330px;transform:rotate(3deg)">
  </div>`);

/* ------------------------------------------------------------ 06 notes --- */
const notes = html(`
  <div style="text-align:center;margin-bottom:30px">
    <div class="eyebrow" style="color:#6C4FE0">Pages 9 & 11</div>
    <h1 style="font-size:50px;margin-top:12px">Suivre tes<br>progrès</h1>
    <div style="font-size:21px;color:#6E6B85;margin-top:14px">
      Tableau de notes + tracker d’habitudes sur 31 jours
    </div>
  </div>
  <div class="row" style="gap:34px">
    <img class="sheet" src="${pg(9)}" style="width:330px;transform:rotate(-3deg)">
    <img class="sheet" src="${pg(11)}" style="width:330px;transform:rotate(3deg)">
  </div>`);

/* --------------------------------------------------------- 07 aperçu -----*/
const apercu = html(`
  <div style="text-align:center;margin-bottom:28px">
    <div class="eyebrow" style="color:#6C4FE0">Aperçu complet</div>
    <h1 style="font-size:48px;margin-top:10px">Les 15 pages du pack</h1>
  </div>
  <div style="display:grid;grid-template-columns:repeat(5,1fr);gap:16px;width:100%">
    ${Array.from({ length: 15 }, (_, i) => `
      <div style="position:relative">
        <img src="${pg(i + 1)}" style="width:100%;display:block;border-radius:5px;
             box-shadow:0 8px 20px rgba(20,20,43,.16);background:#fff">
        <div style="position:absolute;left:50%;transform:translateX(-50%);bottom:-9px;
             background:#6C4FE0;color:#fff;font-family:'Outfit',sans-serif;font-weight:700;
             font-size:11px;border-radius:999px;padding:3px 10px;
             box-shadow:0 3px 8px rgba(20,20,43,.2)">${i + 1}</div>
      </div>`).join('')}
  </div>
  <div class="row" style="gap:12px;margin-top:30px">
    <span class="pill pill-violet">A4 · 210 × 297 mm</span>
    <span class="pill pill-violet">Imprimable à l’infini</span>
  </div>`);

/* ------------------------------------------------- 08 comment ça marche --- */
const step = (n, t, d) => `
  <div style="display:flex;gap:20px;align-items:flex-start;text-align:left">
    <div style="flex:0 0 auto;width:52px;height:52px;border-radius:16px;background:#6C4FE0;color:#fff;
         font-family:'Outfit',sans-serif;font-weight:800;font-size:22px;
         display:flex;align-items:center;justify-content:center">${n}</div>
    <div>
      <h2 style="font-size:27px">${t}</h2>
      <div style="font-size:19px;color:#6E6B85;margin-top:6px;line-height:1.5">${d}</div>
    </div>
  </div>`;

const marche = html(`
  <div style="text-align:center;margin-bottom:44px">
    <div class="eyebrow" style="color:#6C4FE0">Produit numérique</div>
    <h1 style="font-size:50px;margin-top:12px">Comment ça marche</h1>
  </div>
  <div style="display:flex;flex-direction:column;gap:30px;width:100%;max-width:720px">
    ${step(1, 'Tu commandes', 'Le paiement est sécurisé par la plateforme.')}
    ${step(2, 'Tu télécharges tout de suite', 'Le lien de téléchargement arrive automatiquement, sans attendre.')}
    ${step(3, 'Tu imprimes ou tu remplis sur tablette', 'Deux fichiers PDF sont inclus : version impression et version tablette.')}
  </div>
  <div style="margin-top:44px;font-size:17px;color:#9C99B0;text-align:center;max-width:660px;line-height:1.6">
    Aucun article physique n’est expédié. Fichiers PDF à usage personnel.
  </div>`);

/* ------------------------------------------------- 09 trois formules ------ */
const offre = (titre, prix, pages, liste, k, mise = false) => `
  <div style="flex:1 1 0;background:${mise ? 'linear-gradient(160deg,#4B63E8,#8B5CF6)' : '#fff'};
       color:${mise ? '#fff' : '#14142B'};border-radius:24px;padding:26px 22px;
       border:${mise ? 'none' : '2px solid #E5E2F4'};text-align:center;
       box-shadow:${mise ? '0 20px 46px rgba(76,60,200,.34)' : '0 8px 22px rgba(20,20,43,.07)'}">
    <div class="eyebrow" style="font-size:13px;color:${mise ? 'rgba(255,255,255,.86)' : '#6C4FE0'}">${titre}</div>
    <img src="${cover(k)}" style="width:100%;max-width:150px;margin:16px auto 14px;display:block;
         border-radius:6px;box-shadow:0 10px 24px rgba(20,20,43,.24)">
    <h2 style="font-size:42px;letter-spacing:-.02em">${prix}</h2>
    <div style="font-size:16px;margin-top:6px;color:${mise ? 'rgba(255,255,255,.86)' : '#6E6B85'}">${pages}</div>
    <div style="height:1px;background:${mise ? 'rgba(255,255,255,.3)' : '#EEECFA'};margin:16px 0"></div>
    <div style="font-size:15px;line-height:1.75;color:${mise ? 'rgba(255,255,255,.94)' : '#3C3A57'}">${liste}</div>
  </div>`;

const formules = html(`
  <div style="text-align:center;margin-bottom:34px">
    <div class="eyebrow" style="color:#6C4FE0">Trois formules</div>
    <h1 style="font-size:48px;margin-top:10px">Choisis ce dont tu as besoin</h1>
  </div>
  <div style="display:flex;gap:18px;align-items:stretch;width:100%">
    ${offre('Basic', '2,99 €', '7 pages A4', 'Semaine<br>To-do list<br>Devoirs<br>Plan de révision<br>Suivi des notes', 'basic')}
    ${offre('Complete', '3,99 €', '15 pages A4', 'Tout le Basic<br>+ 10 pages<br>Objectifs, habitudes,<br>mois, brain dump,<br>bilan hebdo', 'complete', true)}
    ${offre('Ultimate', '7,99 €', '20 pages A4', 'Tout le Complete<br>+ 5 pages bonus<br>Lecture, budget,<br>rétroplanning,<br>rentrée, bilan mensuel', 'ultimate')}
  </div>
  <div style="margin-top:30px;font-size:17px;color:#9C99B0;text-align:center">
    Chaque formule inclut la version impression <b>et</b> la version tablette.
  </div>`);

/* --------------------------------------------------- 10 pages bonus ------- */
const bonusImg = html(`
  <div style="text-align:center;margin-bottom:30px">
    <div class="eyebrow" style="color:#6C4FE0">Formule Ultimate</div>
    <h1 style="font-size:48px;margin-top:10px">5 pages bonus</h1>
  </div>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:26px 18px;width:100%">
    ${[[15, 'Suivi de lecture'], [16, 'Budget étudiant'], [17, 'Rétroplanning d’examen'],
       [18, 'Checklist de rentrée'], [19, 'Bilan du mois']].map(([n, t]) => `
      <div style="text-align:center">
        <img src="${bonus(n)}" style="width:100%;display:block;border-radius:6px;
             box-shadow:0 10px 24px rgba(20,20,43,.16);background:#fff">
        <div style="font-family:'Outfit',sans-serif;font-weight:700;font-size:17px;margin-top:12px">${t}</div>
      </div>`).join('')}
  </div>`);

/* ------------------------------------------------------------- rendu ----- */
const SHOTS = [
  ['01-miniature', miniature], ['02-couverture', couverture], ['03-planning', planning],
  ['04-todo-list', todo], ['05-revisions', revision], ['06-suivi-notes', notes],
  ['07-apercu-15-pages', apercu], ['08-comment-ca-marche', marche],
  ['09-trois-formules', formules], ['10-pages-bonus', bonusImg],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({ deviceScaleFactor: 2, viewport: { width: 1000, height: 1000 } });
const page = await ctx.newPage();

for (const [name, content] of SHOTS) {
  const tmp = path.join(IMG, `_${name}.html`);
  writeFileSync(tmp, content);
  await page.goto(pathToFileURL(tmp).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(250);
  await page.locator('.stage').screenshot({ path: path.join(OUT, `${name}.png`) });
  unlinkSync(tmp);
  console.log('image :', name);
}
await browser.close();
