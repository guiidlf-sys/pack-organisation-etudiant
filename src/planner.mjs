/* ==========================================================================
   PACK ORGANISATION ÉTUDIANT 2026-2027
   Générateur des 15 pages A4. Deux variantes :
     - impression (A4 papier)
     - tablette   (mêmes pages + navigation cliquable entre les pages)
   ========================================================================== */
import { icon } from './icons.mjs';

/* ------------------------------------------------------------- helpers --- */
const rep = (n, fn) => Array.from({ length: n }, (_, i) => fn(i)).join('');
const lines = (n, cls = '') => rep(n, () => `<div class="wl ${cls}"></div>`);
const numLines = (n, cls = '') => rep(n, (i) => `<div class="wl num ${cls}" data-n="${i + 1}"></div>`);
const tasks = (n) => rep(n, () => `<div class="task"><span class="ck"></span><span class="ln"></span></div>`);
const field = (k) => `<div class="field"><span class="k">${k}</span><span class="v"></span></div>`;
const fill = (content) => `<div class="fill">${content}</div>`;
const lbl = (text, ic = '', cls = '') =>
  `<div class="lbl ${cls}">${ic ? icon(ic) : ''}<span>${text}</span></div>`;
const dotLbl = (text, color) =>
  `<div class="lbl"><span class="dot dot-${color}"></span><span>${text}</span></div>`;

const MODULES = [
  'Moi & mes objectifs', 'Mon emploi du temps', 'Ma semaine', 'Ma to-do list',
  'Mes devoirs', 'Mon plan de révision', 'Fiche de révision', 'Mon suivi des notes',
  'Mes objectifs', 'Habit tracker', 'Mon mois', 'Brain dump', 'Bilan de ma semaine',
];

const PAGES_META = [
  ['Couverture', 'p1'], ['Moi & mes objectifs', 'p2'], ['Emploi du temps', 'p3'],
  ['Ma semaine', 'p4'], ['To-do list', 'p5'], ['Mes devoirs', 'p6'],
  ['Plan de révision', 'p7'], ['Fiche de révision', 'p8'], ['Suivi des notes', 'p9'],
  ['Mes objectifs', 'p10'], ['Habit tracker', 'p11'], ['Mon mois', 'p12'],
  ['Brain dump', 'p13'], ['Bilan', 'p14'], ['Page finale', 'p15'],
];

const nav = (cur) =>
  `<nav class="nav">${PAGES_META.map(([t, id], i) =>
    `<a href="#${id}" title="${t}" class="${i + 1 === cur ? 'on' : ''}">${i + 1}</a>`).join('')}</nav>`;

const page = ({ n, ic, title, sub, body, cls = '' }) => `
<section class="page ${cls}" id="p${n}">
  <div class="head">
    <div class="ic">${icon(ic)}</div>
    <div>
      <h2>${title}</h2>
      ${sub ? `<div class="sub">${sub}</div>` : ''}
    </div>
  </div>
  <div class="body">${body}</div>
  ${nav(n)}
  <div class="foot"><span>Pack Organisation Étudiant · Édition 2026–2027</span><span class="num">${n}</span></div>
</section>`;

/* =============================================================== PAGE 1 === */
const p1 = () => `
<section class="page cover" id="p1">
  <div class="cover-top">
    <div class="blob" style="width:120mm;height:120mm;right:-42mm;top:-48mm"></div>
    <div class="blob" style="width:66mm;height:66mm;left:-24mm;bottom:-18mm"></div>
    <div class="cover-eyebrow">Produit numérique · PDF imprimable</div>
    <div class="cover-title">
      <span>Pack</span>
      <span class="l2">Organisation Étudiant</span>
    </div>
    <div class="cover-tag">Ton kit pour mieux t'organiser, travailler efficacement et suivre tes progrès.</div>
    <div class="cover-icons">
      <div class="ci">${icon('books')}</div>
      <div class="ci">${icon('calendar')}</div>
      <div class="ci">${icon('pencil')}</div>
      <div class="ci">${icon('target')}</div>
    </div>
  </div>
  <div class="cover-bottom">
    <div class="cover-modules">
      <span>Planning</span><span>Devoirs</span><span>Révisions</span><span>Objectifs</span><span>Notes</span>
    </div>
    <div class="cover-list-title">Ce que contient le pack</div>
    <div class="cover-list">
      ${MODULES.map((m, i) => `<div class="it"><span class="n">${String(i + 2).padStart(2, '0')}</span>${m}</div>`).join('')}
    </div>
    <div class="cover-meta">
      <div class="cover-edition"><small>Édition</small>2026 – 2027</div>
      <div class="cover-sig">
        15 pages au format A4<br>
        À imprimer ou à remplir sur tablette
      </div>
    </div>
    ${nav(1)}
  </div>
</section>`;

/* =============================================================== PAGE 2 === */
const p2 = () => page({
  n: 2, ic: 'user', title: 'Moi &amp; mes objectifs',
  sub: 'Pose tes bases pour l\'année : qui tu es, et où tu veux aller.',
  body: `
  <div class="card tinted">
    <div class="grid g3 gap-s">
      ${field('Prénom')}${field('Classe / formation')}${field('Année scolaire')}
    </div>
  </div>
  <div class="card" style="margin-top:4mm">
    ${lbl('Cette année, je veux…', 'rocket')}
    ${numLines(3, 'l')}
  </div>
  <div class="grid g2" style="margin-top:4mm">
    <div class="card fillcard">
      ${lbl('Mes matières préférées', 'star')}
      ${fill(lines(2))}
    </div>
    <div class="card fillcard">
      ${lbl('La matière que je veux améliorer', 'trend')}
      ${fill(lines(1))}
      <div class="txt-s" style="margin-top:2mm">Pourquoi ? Qu'est-ce qui bloque aujourd'hui ?</div>
      ${fill(lines(1))}
    </div>
  </div>
  <div class="card accent fillcard" style="margin-top:4mm">
    ${lbl('Mon objectif principal', 'target')}
    ${fill(lines(5))}
  </div>`
});

/* =============================================================== PAGE 3 === */
const DAYS5 = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi'];
const HOURS = ['8h', '9h', '10h', '11h', '12h', '13h', '14h', '15h', '16h', '17h'];

const p3 = () => page({
  n: 3, ic: 'grid', title: 'Mon emploi du temps',
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
    ${lbl('Mes activités en dehors des cours', 'clock')}
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

const p4 = () => page({
  n: 4, ic: 'week', title: 'Ma semaine',
  sub: 'Une vue d\'ensemble pour ne rien laisser passer.',
  body: `
  <div class="card tinted" style="padding:3mm 5mm">
    <div class="field"><span class="k">Semaine du</span><span class="v" style="max-width:38mm"></span><span class="k">au</span><span class="v" style="max-width:38mm"></span></div>
  </div>
  <div class="grid g2 gap-s fillgrid" style="margin-top:4mm">
    ${DAYS7.map(dayBlock).join('')}
    <div class="card accent fillcard" style="padding:3.4mm 4mm">
      ${lbl('Ma priorité de la semaine', 'star')}
      ${fill(lines(3, 's'))}
    </div>
  </div>`
});

/* =============================================================== PAGE 5 === */
const p5 = () => page({
  n: 5, ic: 'check', title: 'Ma to-do list',
  sub: 'Trois niveaux de priorité pour savoir par quoi commencer.',
  body: `
  <div class="card fillcard" style="border-left:1.2mm solid var(--red)">
    ${dotLbl('Urgent', 'red')}
    ${fill(tasks(4))}
  </div>
  <div class="card fillcard" style="margin-top:4mm;border-left:1.2mm solid var(--amber)">
    ${dotLbl('À faire', 'amber')}
    ${fill(tasks(4))}
  </div>
  <div class="card fillcard" style="margin-top:4mm;border-left:1.2mm solid var(--green)">
    ${dotLbl('Si j\'ai le temps', 'green')}
    ${fill(tasks(3))}
  </div>
  <div class="card accent" style="margin-top:4mm;flex:0 0 auto">
    <div class="lbl" style="color:#fff">${icon('party')}<span>Tout est fait !</span></div>
    <div class="txt-s" style="color:rgba(255,255,255,.85);margin-bottom:1.4mm">Aujourd'hui, je suis fier/fière de moi parce que :</div>
    ${lines(2)}
  </div>`
});

/* =============================================================== PAGE 6 === */
const p6 = () => page({
  n: 6, ic: 'bag', title: 'Mes devoirs',
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
    <div class="lbl" style="color:#96620A">${icon('alert')}<span>À ne pas oublier</span></div>
    ${fill(lines(4))}
  </div>`
});

/* =============================================================== PAGE 7 === */
const REV_DAYS = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Week-end'];

const p7 = () => page({
  n: 7, ic: 'calCheck', title: 'Mon plan de révision',
  sub: 'Un contrôle à préparer ? Découpe-le en petites étapes.',
  body: `
  <div class="card tinted">
    <div class="grid g3 gap-s">
      ${field('Matière')}${field('Chapitre')}${field('Date du contrôle')}
    </div>
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Ce que je dois apprendre', 'note')}
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
      Astuce : mieux vaut 3 sessions de 25 minutes réparties sur la semaine qu'une seule longue veille de contrôle.
    </div>
  </div>`
});

/* =============================================================== PAGE 8 === */
const p8 = () => page({
  n: 8, ic: 'note', title: 'Fiche de révision',
  sub: 'Une fiche = un chapitre. Va à l\'essentiel.',
  body: `
  <div class="card tinted">
    <div class="grid g2 gap-s">${field('Matière')}${field('Chapitre')}</div>
  </div>
  <div class="card" style="margin-top:4mm;flex:0 0 auto">
    ${lbl('Les 5 choses à retenir', 'star')}
    ${numLines(5, 'l')}
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Mots-clés', 'key')}
    ${fill(lines(2))}
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Exemple important', 'bulb')}
    ${fill(lines(3))}
  </div>
  <div class="card tinted fillcard" style="margin-top:4mm;border-left:1.2mm solid var(--violet-l)">
    ${lbl('Ce que je ne comprends pas encore', 'help')}
    ${fill(lines(2))}
  </div>`
});

/* =============================================================== PAGE 9 === */
const p9 = () => page({
  n: 9, ic: 'chart', title: 'Mon suivi des notes',
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
    ${lbl('Mon objectif', 'target')}
    <div class="grid g2">
      <div class="field"><span class="k" style="color:#fff">Moyenne actuelle :</span><span class="v"></span><span class="k" style="color:#fff">/20</span></div>
      <div class="field"><span class="k" style="color:#fff">Objectif :</span><span class="v"></span><span class="k" style="color:#fff">/20</span></div>
    </div>
  </div>`
});

/* ============================================================== PAGE 10 === */
const goalBlock = (title, ic, color) => `
  <div class="card fillcard" style="border-left:1.2mm solid ${color}">
    ${lbl(title, ic)}
    <div class="txt-s" style="font-size:6.8pt;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-l)">Objectif</div>
    ${fill(lines(1, 'l'))}
    <div class="txt-s" style="font-size:6.8pt;letter-spacing:.08em;text-transform:uppercase;color:var(--gray-l);margin-top:2mm">Comment vais-je y arriver ?</div>
    ${fill(lines(3))}
  </div>`;

const p10 = () => page({
  n: 10, ic: 'target', title: 'Mes objectifs',
  sub: 'Un objectif sans plan reste un souhait.',
  body: `
  ${goalBlock('École', 'books', 'var(--blue)')}
  <div style="height:4mm;flex:0 0 auto"></div>
  ${goalBlock('Personnel', 'heartO', 'var(--violet-l)')}
  <div class="card accent fillcard" style="margin-top:4mm">
    ${lbl('Mon grand objectif', 'rocket')}
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
const HABITS = ['Réviser', 'Lire', 'Faire mes devoirs', 'Préparer mon sac', 'Dormir à l\'heure'];

const p11 = () => page({
  n: 11, ic: 'flame', title: 'Habit tracker',
  sub: 'Coche chaque jour réussi. L\'objectif : ne pas casser la série.',
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
      ${lbl('Mon bilan du mois', 'search')}
      <div class="fill">
        ${['Ma plus longue série', 'Mon habitude la plus facile', 'Celle à travailler']
          .map((k) => `<div class="field" style="flex:1 1 auto"><span class="k">${k}</span><span class="v" style="height:100%"></span></div>`).join('')}
      </div>
    </div>
    <div class="card accent fillcard">
      ${lbl('Ce que ça m\'apporte', 'star')}
      ${fill(lines(3))}
    </div>
  </div>
  <div class="card accent" style="margin-top:5mm;flex:0 0 auto">
    <div class="txt-s" style="color:rgba(255,255,255,.9);font-size:8pt">
      Une case oubliée n'annule rien. Reprends simplement le lendemain.
    </div>
  </div>`
});

/* ============================================================== PAGE 12 === */
const p12 = () => page({
  n: 12, ic: 'calendar', title: 'Mon mois',
  sub: 'La vue d\'ensemble : contrôles, rendus, dates à retenir.',
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
      ${lbl('Dates importantes', 'pin')}
      ${fill(numLines(4))}
    </div>
    <div class="card accent fillcard">
      ${lbl('Objectif du mois', 'target')}
      ${fill(lines(3))}
    </div>
  </div>`
});

/* ============================================================== PAGE 13 === */
const dumpBlock = (title, ic, n) => `
  <div class="card fillcard">
    ${lbl(title, ic)}
    ${fill(lines(n))}
  </div>`;

const p13 = () => page({
  n: 13, ic: 'cloud', title: 'Brain dump',
  sub: 'Vide ta tête ici : tout ce qui traîne dans un coin de ton cerveau.',
  body: `
  <div class="grid g2 fillgrid">
    ${dumpBlock('Idées', 'bulb', 7)}
    ${dumpBlock('À ne pas oublier', 'pin', 7)}
    ${dumpBlock('École', 'books', 7)}
    ${dumpBlock('Autre', 'more', 7)}
  </div>`
});

/* ============================================================== PAGE 14 === */
const p14 = () => page({
  n: 14, ic: 'search', title: 'Bilan de ma semaine',
  sub: 'Cinq minutes le dimanche soir, et la semaine suivante démarre mieux.',
  body: `
  <div class="card fillcard">
    ${lbl('Ce que j\'ai réussi', 'party')}
    ${fill(lines(3))}
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Ce qui était difficile', 'alert')}
    ${fill(lines(3))}
  </div>
  <div class="card fillcard" style="margin-top:4mm">
    ${lbl('Ce que je peux améliorer', 'trend')}
    ${fill(lines(3))}
  </div>
  <div class="card accent" style="margin-top:4mm;flex:0 0 auto">
    ${lbl('Ma réussite de la semaine', 'star')}
    ${lines(2)}
    <div class="field" style="margin-top:3mm">
      <span class="k" style="color:#fff">Ma note de la semaine :</span>
      <span class="v" style="max-width:28mm"></span>
      <span class="k" style="color:#fff">/10</span>
    </div>
  </div>`
});

/* ============================================================== PAGE 15 === */
const p15 = () => `
<section class="page end" id="p15">
  <div class="heart">${icon('heart')}</div>
  <h2>Tu es capable.</h2>
  <div class="quote">Une journée à la fois.<br>Un objectif à la fois.</div>
  <div class="thanks">
    Merci d'avoir choisi ce planner !
    <div class="brand" style="margin-top:4mm">Pack Organisation Étudiant</div>
  </div>
  <div class="legal">Produit numérique — usage personnel uniquement.</div>
  ${nav(15)}
</section>`;

/* ---------------------------------------------------------------- build --- */
export const buildHTML = ({ tablet = false } = {}) => `<!doctype html>
<html lang="fr">
<head>
<meta charset="utf-8">
<title>Pack Organisation Étudiant 2026–2027</title>
<meta name="author" content="Pack Organisation Étudiant">
<meta name="description" content="Planner étudiant 2026-2027 : planning, devoirs, révisions, objectifs et suivi des notes. 15 pages A4 à imprimer ou à remplir sur tablette.">
<link rel="stylesheet" href="../src/styles.css">
</head>
<body class="${tablet ? 'tablet' : 'print'}">
${[p1(), p2(), p3(), p4(), p5(), p6(), p7(), p8(), p9(), p10(), p11(), p12(), p13(), p14(), p15()].join('\n')}
</body>
</html>`;
