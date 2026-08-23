/* Contrôle qualité automatique du produit. À relancer après chaque modification. */
import { chromium } from 'playwright';
import { readFileSync, existsSync, statSync } from 'fs';
import { pathToFileURL } from 'url';
import path from 'path';

const ok = [], ko = [];
const check = (cond, label, detail = '') => (cond ? ok : ko).push(`${label}${detail ? ' — ' + detail : ''}`);

/* --- fichiers livrés --- */
const FILES = [
  'dist/Pack_Organisation_Etudiant_2026_2027.pdf',
  'dist/Pack_Organisation_Etudiant_2026_2027_TABLETTE.pdf',
  ...Array.from({ length: 15 }, (_, i) => `dist/images/pages/page-${String(i + 1).padStart(2, '0')}.png`),
  ...['01-miniature', '02-couverture', '03-planning', '04-todo-list', '05-revisions',
      '06-suivi-notes', '07-apercu-15-pages', '08-comment-ca-marche'].map((n) => `dist/images/boutique/${n}.png`),
  'dist/images/marque/logo-carre.png', 'dist/images/marque/logo-horizontal.png',
  'dist/images/marque/banniere.png', 'dist/suivi-ventes.csv',
];
FILES.forEach((f) => {
  const min = f.endsWith('.csv') ? 200 : 1000;
  check(existsSync(f) && statSync(f).size > min, `fichier présent : ${f}`);
});

/* --- contrôles dans le rendu --- */
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 900, height: 1300 } });
await page.goto(pathToFileURL(path.resolve('build/planner-print.html')).href, { waitUntil: 'networkidle' });
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
  return { boxes, fonts: [...fonts], text: document.body.innerText };
});

check(r.boxes.length === 15, 'nombre de pages = 15', `${r.boxes.length}`);
check(r.boxes.every((b) => b.h === r.boxes[0].h && b.w === r.boxes[0].w),
      'toutes les pages ont le même format', `${r.boxes[0].w}×${r.boxes[0].h} px @96dpi = A4`);
check(r.boxes.every((b) => b.out === 0), 'aucun bloc ne dépasse de la page',
      `${r.boxes.reduce((s, b) => s + b.out, 0)} débordement(s)`);
check(r.fonts.every((f) => ['Inter', 'Outfit'].includes(f)),
      'polices cohérentes sur tout le document', r.fonts.join(', '));

const forbidden = ['lorem', 'ipsum', 'todo', 'xxx', 'placeholder', 'exemple de texte', 'filigrane', 'watermark'];
const low = r.text.toLowerCase();
forbidden.forEach((w) => check(!low.includes(w), `pas de texte de démonstration « ${w} »`));
check(!/\bl'|d'|qu'|n'|j'/.test(r.text.replace(/[’]/g, '')) || !r.text.includes("'"),
      'apostrophes typographiques (’) partout');

/* --- présence du contenu attendu, page par page --- */
const EXPECTED = [
  'PACK', 'MOI & MES OBJECTIFS', 'MON EMPLOI DU TEMPS', 'MA SEMAINE', 'MA TO-DO LIST',
  'MES DEVOIRS', 'MON PLAN DE RÉVISION', 'FICHE DE RÉVISION', 'MON SUIVI DES NOTES',
  'MES OBJECTIFS', 'HABIT TRACKER', 'MON MOIS', 'BRAIN DUMP', 'BILAN DE MA SEMAINE',
  'TU ES CAPABLE.',
];
EXPECTED.forEach((t) => check(r.text.includes(t), `titre présent : ${t}`));

await browser.close();

/* --- rapport --- */
console.log(`\n✅ ${ok.length} contrôles réussis`);
if (ko.length) {
  console.log(`\n❌ ${ko.length} PROBLÈME(S) :`);
  ko.forEach((k) => console.log('   -', k));
  process.exit(1);
}
console.log('   Aucun problème détecté.\n');
