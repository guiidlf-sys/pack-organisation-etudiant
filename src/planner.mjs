/* ==========================================================================
   PACK ORGANISATION ÉTUDIANT 2026-2027
   Générateur des 15 pages A4. Deux variantes :
     - impression (A4 papier)
     - tablette   (mêmes pages + navigation cliquable entre les pages)

   Les émojis des titres et des intitulés sont ceux du cahier des charges,
   repris à l’identique. Les pictogrammes SVG ne servent plus que sur la
   couverture (« livres, calendrier, crayon et objectif »).
   ========================================================================== */
import { icon } from './icons.mjs';
import { makeBonus, BONUS_META } from './bonus.mjs';

/* ------------------------------------------------------------- helpers --- */
const rep = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');
const lines = (n, cls = '') => rep(n, () => `<div class="wl ${cls}"></div>`);
const numLines = (n, cls = '') => rep(n, (i) => `<div class="wl num ${cls}" data-n="${i + 1}"></div>`);
const tasks = (n) => rep(n, () => `<div class="task"><span class="ck"></span><span class="ln"></span></div>`);
const field = (k) => `<div class="field"><span class="k">${k}</span><span class="v"></span></div>`;
const fill = (content) => `<div class="fill">${content}</div>`;
const lbl = (text, emo = '', cls = '') =>
  `<div class="lbl ${cls}">${emo ? `<span class="emo">${emo}</span>` : ''}<span>${text}</span></div>`;

const MODULES = [
  'Moi & mes objectifs', 'Mon emploi du temps', 'Ma semaine', 'Ma to-do list',
  'Mes devoirs', 'Mon plan de révision', 'Fiche de révision', 'Mon suivi des notes',
  'Mes objectifs', 'Habit tracker', 'Mon mois', 'Brain dump', 'Bilan de ma semaine',
];

/* Sommaire de l'édition en cours de génération (rempli par buildHTML). */
let META = [];

const nav = (cur) =>
  `<nav class="nav">${META.map((t, i) =>
    `<a href="#p${i + 1}" title="${t}" class="${i + 1 === cur ? 'on' : ''}">${i + 1}</a>`).join('')}</nav>`;

const page = ({ n, emo, title, sub, body, cls = '' }) => `
<section class="page ${cls}" id="p${n}">
  <div class="head">
    <div>
      <h2><span class="emo">${emo}</span>${title}</h2>
      ${sub ? `<div class="sub">${sub}</div>` : ''}
    </div>
  </div>
  <div class="body">${body}</div>
  ${nav(n)}
  <div class="foot"><span>Pack Organisation Étudiant · Édition 2026–2027</span><span class="num">${n}</span></div>
</section>`;

/* =============================================================== PAGE 1 === */
const p1 = (n, ed) => `
<section class="page cover" id="p${n}">
  <div class="cover-top">
    <div class="blob" style="width:120mm;height:120mm;right:-42mm;top:-48mm"></div>
    <div class="blob" style="width:66mm;height:66mm;left:-24mm;bottom:-18mm"></div>
    <div class="cover-eyebrow">Produit numérique · PDF imprimable</div>
    <div class="cover-title">
      <span>Pack</span>
      <span class="l2">Organisation Étudiant</span>
    </div>
    <div class="cover-tag">Ton kit pour mieux t’organiser, travailler efficacement et suivre tes progrès.</div>
    <div class="cover-icons">
      <div class="ci">${icon('books')}</div>
      <div class="ci">${icon('calendar')}</div>
      <div class="ci">${icon('pencil')}</div>
      <div class="ci">${icon('target')}</div>
    </div>
  </div>
  <div class="cover-bottom">
    <div class="cover-modules">
      ${ed.modules.map((m) => `<span>${m}</span>`).join('')}
    </div>
    <div class="cover-list-title">Ce que contient le pack</div>
    <div class="cover-list${ed.contents.length > 14 ? ' dense' : ''}">
      ${ed.contents.map(([num, name]) => `<div class="it"><span class="n">${String(num).padStart(2, '0')}</span>${name}</div>`).join('')}
    </div>
    ${ed.tip ? `<div class="cover-tip">
      <div class="cover-list-title" style="margin-top:0">Comment l’utiliser</div>
      ${ed.tip.map((t, i) => `<div class="it"><span class="n">${i + 1}</span>${t}</div>`).join('')}
    </div>` : ''}
    <div class="cover-meta">
      <div class="cover-edition"><small>Édition</small>2026 – 2027</div>
      <div class="cover-sig">
        ${ed.total} pages au format A4${ed.badge ? ` · <b>${ed.badge}</b>` : ''}<br>
        À imprimer ou à remplir sur tablette
      </div>
    </div>
    ${nav(n)}
  </div>
</section>`;

/* =============================================================== PAGE 2 === */
const p2 = (n) => page({
  n, emo: '👋', title: 'Moi &amp; mes objectifs',
  sub: 'Pose tes bases pour l’année : qui tu es, et où tu veux aller.',
  body: `
  <div class="card tinted">
    <div class="grid g3 gap-s">
      ${field('Prénom')}${field('Classe / formation')}${field('Année scolaire')}
    </div>
  </div>
  <div class="card" style="margin-top:4mm">
    ${lbl('Cette année, je veux…')}
    ${numLines(3, 'l')}
  </div>
  <div class="grid g2" style="margin-top:4mm">
    <div class="card fillcard">
      ${lbl('Mes matières préférées')}
      ${fill(lines(2))}
    </div>
    <div class="card fillcard">
      ${lbl('La matière que je veux améliorer')}
      ${fill(lines(1))}
      <div class="txt-s" style="margin-top:2mm">Pourquoi ? Qu’est-ce qui bloque aujourd’hui ?</div>
      ${fill(lines(1))}
    </div>
  </div>
  <div class="card accent fillcard" style="margin-top:4mm">
    ${lbl('Mon objectif principal')}
    ${fill(lines(5))}
  </div>`
});

/* =============================================================== PAGE 3 === */
const DAYS5 = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const HOURS = ['8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'];

const p3 = (n) => page({
  n, emo: '📅', title: 'Mon emploi du temps',
  sub: 'Ta semaine type, heure par heure.',
  body: `
  <table style="--rh:14.6mm">
    <thead>
      <tr>
        <th style="width:16mm" class="c">Heure</th>
        ${DAYS5.map((d) => `<th class="c">${d}</th>`).join('')}
      </tr>
    </thead>
    <tbody>
      ${HOURS.map((h, i) => `<tr class="${i % 2 ? 'alt' : ''}">
        <td class="h">${h}</td>${rep(5, () => '<td></td>')}
      </tr>`).join('')}
    </tbody>
  </table>
  <div class="card fillcard" style="margin-top:5mm">
    ${lbl('Mes activités en dehors des cours')}
    ${fill(lines(4))}
  </div>`
});

/* =============================================================== PAGE 4 === */
const DAYS7 = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];

const dayBlock = (d) => `
  <div class="card fillcard" style="padding:3.4mm 4mm">
    <div class="lbl ink" style="margin-bottom:1.6mm;font-size:9pt;letter-spacing:.04em">${d}</div>
    <div class="txt-s" style="font-size:6.6pt;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-l)">Cours / activités</div>
    ${fill(lines(1, 's'))}
    <div class="txt-s" style="font-size:6.6pt;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-l);margin-top:1.4mm">À faire</div>
    ${fill(tasks(2))}
  </div>`;

const p4 = (n) => page({
  n, emo: '🗓️', title: 'Ma semaine',
  sub: 'Une vue d’ensemble pour ne rien laisser passer.',
  body: `
  <div class="card tinted" style="padding:3mm 5mm">
    <div class="field"><span class="k">Semaine du</span><span class="v" style="max-width:38mm"></span><span class="k">au</span><span class="v" style="max-width:38mm"></span></div>
  </div>
  <div class="grid g2 gap-s fillgrid" style="margin-top:4mm">
    ${DAYS7.map(dayBlock).join('')}
    <div class="card accent fillcard" style="padding:3.4mm 4mm">
      ${lbl('Ma priorité de la semaine', '⭐')}
      ${fill(lines(3, 's'))}
    </div>
  </div>`
});

/* =============================================================== PAGE 5 === */
const p5 = (n) => page({
  n, emo: '✅', title: 'Ma to-do list',
  sub: 'Trois niveaux de priorité pour savoir par quoi commencer.',
  body: `
  <div class="card fillcard" style="border-left:1.2mm solid var(--red)">
    ${lbl('Urgent', '🔴')}
    ${fill(tasks(4))}
  </div>
  <div class="card fillcard" style="margin-top:4mm;border-left:1.2mm solid var(--amber)">
    ${lbl('À faire', '🟡')}
    ${fill(tasks(4))}
  </div>
  <div class="card fillcard" style="margin-top:4mm;border-left:1.2mm solid var(--green)">
    ${lbl('Si j’ai le temps', '🟢')}
    ${fill(tasks(3))}
  </div>
  <div class="card accent" style="margin-top:4mm;flex:0 0 auto">
    <div class="lbl" style="color:#fff"><span class="emo">🎉</span><span>Tout est fait !</span></div>
    <div class="txt-s" style="color:rgba(255,255,255,.85);margin-bottom:1.4mm">Aujourd’hui, je suis fier/fière de moi parce que :</div>
    ${lines(2)}
  </div>`
});

/* =============================================================== PAGE 6 === */
const p6 = (n) => page({
  n, emo: '📚', title: 'Mes devoirs',
  sub: 'Tout ce qui est à rendre, au même endroit.',
  body: `
  <table style="--rh:12.6mm">
    <thead>
      <tr>
        <th style="width:34mm">Matière</th>
        <th>Devoir</th>
        <th style="width:22mm" class="c">Date</th>
        <th style="width:22mm" class="c">Priorité</th>
        <th style="width:16mm" class="c">Fait</th>
      </tr>
    </thead>
    <tbody>
      ${rep(11, (i) => `<tr class="${i % 2 ? 'alt' : ''}">
        <td></td><td></td><td></td><td></td><td class="c"><span class="ck"></span></td>
      </tr>`)}
    </tbody>
  </table>
  <div class="card tinted fillcard" style="margin-top:5mm;border-left:1.2mm solid var(--amber)">
    <div class="lbl" style="color:#96620A"><span class="emo">⚠️</span><span>À ne pas oublier</span></div>
    ${fill(lines(4))}
  </div>`
});

/* =============================================================== PAGE 7 === */
const REV_DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Week-end'];

const p7 = (n) => page({
  n, emo: '🧠', title: 'Mon plan de révision',
  sub: 'Un contrôle à préparer ? Découpe-le en petites étapes.',
  body: `
  <div class="card tinted">
    <div class="grid g3 gap-s">
      ${field('Matière')}${field('Chapitre')}${field('Date du contrôle')}
    </div>
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Ce que je dois apprendre')}
    ${fill(tasks(5))}
  </div>
  <table style="margin-top:5mm;--rh:15mm">
    <thead>
      <tr>
        <th style="width:44mm">Jour</th>
        <th class="c">Temps prévu</th>
        <th style="width:24mm" class="c">Fait</th>
      </tr>
    </thead>
    <tbody>
      ${REV_DAYS.map((d, i) => `<tr class="${i % 2 ? 'alt' : ''}">
        <td class="h" style="text-align:left;padding-left:3mm">${d}</td>
        <td></td>
        <td class="c"><span class="ck"></span></td>
      </tr>`).join('')}
    </tbody>
  </table>
  <div class="card accent" style="margin-top:5mm;flex:0 0 auto">
    <div class="txt-s" style="color:rgba(255,255,255,.9);font-size:8pt">
      Astuce : mieux vaut 3 sessions de 25 minutes réparties sur la semaine qu’une seule longue veille de contrôle.
    </div>
  </div>`
});

/* =============================================================== PAGE 8 === */
const p8 = (n) => page({
  n, emo: '📝', title: 'Fiche de révision',
  sub: 'Une fiche = un chapitre. Va à l’essentiel.',
  body: `
  <div class="card tinted">
    <div class="grid g2 gap-s">${field('Matière')}${field('Chapitre')}</div>
  </div>
  <div class="card" style="margin-top:4mm;flex:0 0 auto">
    ${lbl('Les 5 choses à retenir', '⭐')}
    ${numLines(5, 'l')}
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Mots-clés', '🔑')}
    ${fill(lines(2))}
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Exemple important', '💡')}
    ${fill(lines(3))}
  </div>
  <div class="card tinted fillcard" style="margin-top:4mm;border-left:1.2mm solid var(--violet-l)">
    ${lbl('Ce que je ne comprends pas encore', '❓')}
    ${fill(lines(2))}
  </div>`
});

/* =============================================================== PAGE 9 === */
const p9 = (n) => page({
  n, emo: '📊', title: 'Mon suivi des notes',
  sub: 'Note après note, tu vois ta progression.',
  body: `
  <table style="--rh:12.4mm">
    <thead>
      <tr>
        <th style="width:44mm">Matière</th>
        <th style="width:22mm" class="c">Note</th>
        <th style="width:20mm" class="c">Sur</th>
        <th style="width:26mm" class="c">Date</th>
        <th class="c">Objectif</th>
      </tr>
    </thead>
    <tbody>
      ${rep(15, (i) => `<tr class="${i % 2 ? 'alt' : ''}">${rep(5, () => '<td></td>')}</tr>`)}
    </tbody>
  </table>
  <div class="card accent" style="margin-top:auto;flex:0 0 auto">
    ${lbl('Mon objectif', '🎯')}
    <div class="grid g2">
      <div class="field"><span class="k" style="color:#fff">Moyenne actuelle :</span><span class="v"></span><span class="k" style="color:#fff">/20</span></div>
      <div class="field"><span class="k" style="color:#fff">Objectif :</span><span class="v"></span><span class="k" style="color:#fff">/20</span></div>
    </div>
  </div>`
});

/* ============================================================== PAGE 10 === */
const goalBlock = (title, emo, color) => `
  <div class="card fillcard" style="border-left:1.2mm solid ${color}">
    ${lbl(title, emo)}
    <div class="txt-s" style="font-size:6.8pt;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-l)">Objectif</div>
    ${fill(lines(1, 'l'))}
    <div class="txt-s" style="font-size:6.8pt;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-l);margin-top:2mm">Comment vais-je y arriver ?</div>
    ${fill(lines(3))}
  </div>`;

const p10 = (n) => page({
  n, emo: '🎯', title: 'Mes objectifs',
  sub: 'Un objectif sans plan reste un souhait.',
  body: `
  ${goalBlock('École', '📚', 'var(--blue)')}
  <div style="height:4mm;flex:0 0 auto"></div>
  ${goalBlock('Personnel', '💪', 'var(--violet-l)')}
  <div class="card accent fillcard" style="margin-top:4mm">
    ${lbl('Mon grand objectif', '🚀')}
    ${lines(2, 'l')}
    <div class="txt-s" style="color:rgba(255,255,255,.85);margin:2.6mm 0 1mm;font-size:7pt;letter-spacing:.08em;text-transform:uppercase">Les 3 étapes pour y arriver</div>
    <div class="fill">
      ${['Étape 1', 'Étape 2', 'Étape 3'].map((s) => `
        <div class="field" style="flex:1 1 auto">
          <span class="k" style="color:rgba(255,255,255,.9);width:16mm">${s}</span>
          <span class="v" style="height:100%"></span>
        </div>`).join('')}
    </div>
  </div>`
});

/* ============================================================== PAGE 11 === */
const HABITS = ['Réviser', 'Lire', 'Faire mes devoirs', 'Préparer mon sac', 'Dormir à l’heure'];

const p11 = (n) => page({
  n, emo: '🔥', title: 'Habit tracker',
  sub: 'Coche chaque jour réussi. L’objectif : ne pas casser la série.',
  body: `
  <div class="card" style="padding:4mm;flex:0 0 auto">
    <table class="tracker">
      <thead>
        <tr>
          <th class="hab">Habitude</th>
          ${rep(31, (i) => `<th>${i + 1}</th>`)}
        </tr>
      </thead>
      <tbody>
        ${HABITS.map((h) => `<tr>
          <td class="hab">${h}</td>
          ${rep(31, () => '<td><span class="cell"></span></td>')}
        </tr>`).join('')}
        ${rep(2, () => `<tr>
          <td class="hab" style="color:var(--gray-l);font-weight:400">. . . . . . . . . . . . . .</td>
          ${rep(31, () => '<td><span class="cell"></span></td>')}
        </tr>`)}
      </tbody>
    </table>
    <div class="txt-s" style="margin-top:3mm">Les deux dernières lignes sont libres : ajoute les habitudes qui comptent pour toi.</div>
  </div>
  <div class="grid g2 fillgrid" style="margin-top:5mm">
    <div class="card fillcard">
      ${lbl('Mon bilan du mois')}
      <div class="fill">
        ${['Ma plus longue série', 'Mon habitude la plus facile', 'Celle à travailler']
          .map((k) => `<div class="field" style="flex:1 1 auto"><span class="k">${k}</span><span class="v" style="height:100%"></span></div>`).join('')}
      </div>
    </div>
    <div class="card accent fillcard">
      ${lbl('Ce que ça m’apporte')}
      ${fill(lines(3))}
    </div>
  </div>
  <div class="card accent" style="margin-top:5mm;flex:0 0 auto">
    <div class="txt-s" style="color:rgba(255,255,255,.9);font-size:8pt">
      Une case oubliée n’annule rien. Reprends simplement le lendemain.
    </div>
  </div>`
});

/* ============================================================== PAGE 12 === */
const p12 = (n) => page({
  n, emo: '🗓️', title: 'Mon mois',
  sub: 'La vue d’ensemble : contrôles, rendus, dates à retenir.',
  body: `
  <div class="card tinted" style="padding:3mm 5mm;flex:0 0 auto">
    <div class="field"><span class="k">Mois</span><span class="v"></span></div>
  </div>
  <table class="cal" style="margin-top:4mm">
    <thead><tr>${DAYS7.map((d) => `<th>${d}</th>`).join('')}</tr></thead>
    <tbody>${rep(6, () => `<tr>${rep(7, () => '<td></td>')}</tr>`)}</tbody>
  </table>
  <div class="grid g2 fillgrid" style="margin-top:5mm">
    <div class="card fillcard">
      ${lbl('Dates importantes', '📌')}
      ${fill(numLines(4))}
    </div>
    <div class="card accent fillcard">
      ${lbl('Objectif du mois', '🎯')}
      ${fill(lines(3))}
    </div>
  </div>`
});

/* ============================================================== PAGE 13 === */
const dumpBlock = (title, emo, n) => `
  <div class="card fillcard">
    ${lbl(title, emo)}
    ${fill(lines(n))}
  </div>`;

const p13 = (n) => page({
  n, emo: '💭', title: 'Brain dump',
  sub: 'Vide ta tête ici : tout ce qui traîne dans un coin de ton cerveau.',
  body: `
  <div class="grid g2 fillgrid">
    ${dumpBlock('Idées', '💡', 7)}
    ${dumpBlock('À ne pas oublier', '📌', 7)}
    ${dumpBlock('École', '📚', 7)}
    ${dumpBlock('Autre', '🧠', 7)}
  </div>`
});

/* ============================================================== PAGE 14 === */
const p14 = (n) => page({
  n, emo: '🔎', title: 'Bilan de ma semaine',
  sub: 'Cinq minutes le dimanche soir, et la semaine suivante démarre mieux.',
  body: `
  <div class="card fillcard">
    ${lbl('Ce que j’ai réussi')}
    ${fill(lines(3))}
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Ce qui était difficile')}
    ${fill(lines(3))}
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Ce que je peux améliorer')}
    ${fill(lines(3))}
  </div>
  <div class="card accent" style="margin-top:4mm;flex:0 0 auto">
    ${lbl('Ma réussite de la semaine', '⭐')}
    ${lines(2)}
    <div class="field" style="margin-top:3mm">
      <span class="k" style="color:#fff">Ma note de la semaine :</span>
      <span class="v" style="max-width:28mm"></span>
      <span class="k" style="color:#fff">/10</span>
    </div>
  </div>`
});

/* ================================================================ FIN ===== */
const pFin = (n) => `
<section class="page end" id="p${n}">
  <h2>Tu es capable. <span class="emo">💜</span></h2>
  <div class="quote">Une journée à la fois.<br>Un objectif à la fois.</div>
  <div class="thanks">
    Merci d’avoir choisi ce planner !
    <div class="brand" style="margin-top:4mm">Pack Organisation Étudiant</div>
  </div>
  <div class="legal">Produit numérique — usage personnel uniquement.</div>
  ${nav(n)}
</section>`;

/* --------------------------------------------------------------- kit ------ */
/* Primitives partagées avec les pages bonus. */
const kit = { rep, lines, numLines, tasks, field, fill, lbl, page };
const BONUS = makeBonus(kit);

/* ------------------------------------------------------------ éditions --- */
/* Partie 10 du cahier des charges : trois formules à tester. */
const CORE = [p2, p3, p4, p5, p6, p7, p8, p9, p10, p11, p12, p13, p14];
const CORE_META = [
  'Moi & mes objectifs', 'Mon emploi du temps', 'Ma semaine', 'Ma to-do list',
  'Mes devoirs', 'Mon plan de révision', 'Fiche de révision', 'Mon suivi des notes',
  'Mes objectifs', 'Habit tracker', 'Mon mois', 'Brain dump', 'Bilan de ma semaine',
];

/* BASIC : les 5 pages qu'on utilise vraiment toutes les semaines. */
const BASIC_IDX = [2, 3, 4, 5, 7]; // semaine, to-do, devoirs, plan de révision, suivi des notes

export const EDITIONS = {
  basic: {
    key: 'basic', badge: 'Formule BASIC', price: '2,99 €',
    file: 'Pack_Organisation_Etudiant_2026_2027_BASIC',
    pages: BASIC_IDX.map((i) => CORE[i]),
    meta: BASIC_IDX.map((i) => CORE_META[i]),
    modules: ['Planning', 'Devoirs', 'Révisions', 'Notes'],
    tip: [
      'Imprime les pages dont tu as besoin, autant de fois que tu veux.',
      'Remplis « Ma semaine » le dimanche soir, en cinq minutes.',
      'Coche au fur et à mesure — c’est tout.',
    ],
  },
  complete: {
    key: 'complete', badge: '', price: '3,99 €',
    file: 'Pack_Organisation_Etudiant_2026_2027',
    pages: CORE,
    meta: CORE_META,
    modules: ['Planning', 'Devoirs', 'Révisions', 'Objectifs', 'Notes'],
  },
  ultimate: {
    key: 'ultimate', badge: 'Formule ULTIMATE', price: '7,99 €',
    file: 'Pack_Organisation_Etudiant_2026_2027_ULTIMATE',
    pages: [...CORE, ...BONUS],
    meta: [...CORE_META, ...BONUS_META.map(([t]) => t)],
    modules: ['Planning', 'Devoirs', 'Révisions', 'Objectifs', 'Notes', 'Budget', 'Examens'],
  },
};

/* ---------------------------------------------------------------- build --- */
export const buildHTML = ({ tablet = false, edition = 'complete' } = {}) => {
  const ed = EDITIONS[edition];
  const total = ed.pages.length + 2;                       // couverture + pages + page finale
  META = ['Couverture', ...ed.meta, 'Page finale'];
  const ctx = {
    ...ed,
    total,
    contents: ed.meta.map((name, i) => [i + 2, name]),
  };
  const body = [
    p1(1, ctx),
    ...ed.pages.map((f, i) => f(i + 2)),
    pFin(total),
  ].join('\n');

  return `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Pack Organisation Étudiant 2026–2027${ed.badge ? ' — ' + ed.badge : ''}</title>
<meta name="author" content="Pack Organisation Étudiant">
<meta name="description" content="Planner étudiant 2026-2027 : planning, devoirs, révisions, objectifs et suivi des notes. ${total} pages A4 à imprimer ou à remplir sur tablette.">
<link rel="stylesheet" href="../src/styles.css">
</head>
<body class="${tablet ? 'tablet' : 'print'}">
${body}
</body>
</html>`;
};
