/* Contrôle qualité automatique du produit. À relancer après chaque modification. */
import { chromium } from 'playwright';
import { existsSync, statSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';
import { EDITIONS } from '../src/planner.mjs';

const ok = [], ko = [];
const check = (cond, label, detail = '') => (cond ? ok : ko).push(`${label}${detail ? ' — ' + detail : ''}`);

/* --- fichiers livrés --- */
const FILES = [
  ...Object.values(EDITIONS).flatMap((e) => [`dist/${e.file}.pdf`, `dist/${e.file}_TABLETTE.pdf`]),
  ...Array.from({ length: 15 }, (_, i) => `dist/images/pages/page-${String(i + 1).padStart(2, '0')}.png`),
  ...Array.from({ length: 5 }, (_, i) => `dist/images/pages-bonus/page-${15 + i}.png`),
  ...['01-miniature', '02-couverture', '03-planning', '04-todo-list', '05-revisions',
      '06-suivi-notes', '07-apercu-15-pages', '08-comment-ca-marche', '09-trois-formules',
      '10-pages-bonus'].map((n) => `dist/images/boutique/${n}.png`),
  'dist/images/marque/logo-carre.png', 'dist/images/marque/logo-horizontal.png',
  'dist/images/marque/banniere.png', 'dist/suivi-ventes.csv',
];
FILES.forEach((f) => {
  const min = f.endsWith('.csv') ? 200 : 1000;
  check(existsSync(f) && statSync(f).size > min, `fichier présent : ${f}`);
});

/* --- contrôles dans le rendu, édition par édition --- */
const EXPECTED_CORE = [
  'MOI & MES OBJECTIFS', 'MON EMPLOI DU TEMPS', 'MA SEMAINE', 'MA TO-DO LIST',
  'MES DEVOIRS', 'MON PLAN DE RÉVISION', 'FICHE DE RÉVISION', 'MON SUIVI DES NOTES',
  'MES OBJECTIFS', 'HABIT TRACKER', 'MON MOIS', 'BRAIN DUMP', 'BILAN DE MA SEMAINE',
];
const EXPECTED_BONUS = [
  'MON SUIVI DE LECTURE', 'MON BUDGET ÉTUDIANT', 'MON RÉTROPLANNING D’EXAMEN',
  'MA CHECKLIST DE RENTRÉE', 'MON BILAN DU MOIS',
];
const EXPECTED_EMO = ['👋', '📅', '🗓️', '✅', '📚', '🧠', '📝', '📊', '🎯', '🔥', '💭', '🔎', '💜'];

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1300 } });

for (const ed of Object.values(EDITIONS)) {
  const file = path.resolve(`build/planner-${ed.key}-print.html`);
  await page.goto(pathToFileURL(file).href, { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  const r = await page.evaluate(() => {
    const pages = [...document.querySelectorAll('.page')];
    const boxes = pages.map((el) => {
      const pr = el.getBoundingClientRect();
      let out = 0;
      el.querySelectorAll('.card, table, .head, .foot, .body > *').forEach((c) => {
        const cr = c.getBoundingClientRect();
        if (cr.height > 0 && (cr.bottom > pr.bottom + 1 || cr.right > pr.right + 1 || cr.top < pr.top - 1)) out++;
      });
      return { h: Math.round(pr.height), w: Math.round(pr.width), out };
    });
    const fonts = new Set();
    document.querySelectorAll('h1,h2,.lbl,td,th,.txt-s,.field .k').forEach((e) =>
      fonts.add(getComputedStyle(e).fontFamily.split(',')[0].replace(/"/g, '')));
    return { boxes, fonts: [...fonts], text: document.body.innerText, ids: pages.map((p) => p.id) };
  });

  const E = ed.key.toUpperCase();
  const expected = ed.pages.length + 2;
  check(r.boxes.length === expected, `${E} : ${expected} pages`, `${r.boxes.length}`);
  check(r.boxes.every((b) => b.h === r.boxes[0].h && b.w === r.boxes[0].w),
        `${E} : format identique sur toutes les pages`, `${r.boxes[0].w}×${r.boxes[0].h} px @96dpi = A4`);
  check(r.boxes.every((b) => b.out === 0), `${E} : aucun bloc ne déborde`,
        `${r.boxes.reduce((s, b) => s + b.out, 0)} débordement(s)`);
  check(r.fonts.every((f) => ['Inter', 'Outfit'].includes(f)), `${E} : polices cohérentes`, r.fonts.join(', '));
  check(r.ids.every((id, i) => id === `p${i + 1}`), `${E} : numérotation des ancres continue`);

  const low = r.text.toLowerCase();
  ['lorem', 'ipsum', 'todo', 'xxx', 'placeholder', 'filigrane', 'watermark']
    .forEach((w) => check(!low.includes(w), `${E} : pas de texte de démonstration « ${w} »`));
  check(!r.text.includes("'"), `${E} : apostrophes typographiques (’) partout`);

  if (ed.key === 'complete' || ed.key === 'ultimate') {
    EXPECTED_CORE.forEach((t) => check(r.text.includes(t), `${E} : page « ${t} »`));
    EXPECTED_EMO.forEach((e) => check(r.text.includes(e), `${E} : émoji du cahier des charges « ${e} »`));
  }
  if (ed.key === 'ultimate') EXPECTED_BONUS.forEach((t) => check(r.text.includes(t), `${E} : page bonus « ${t} »`));
  if (ed.key === 'basic') check(r.boxes.length === 7, 'BASIC : 5 pages utiles + couverture + page finale');
}

await browser.close();

console.log(`\n✅ ${ok.length} contrôles réussis`);
if (ko.length) {
  console.log(`\n❌ ${ko.length} PROBLÈME(S) :`);
  ko.forEach((k) => console.log('   -', k));
  process.exit(1);
}
console.log('   Aucun problème détecté.\n');
