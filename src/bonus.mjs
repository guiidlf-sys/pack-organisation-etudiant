/* ==========================================================================
   Pages bonus — réservées à la formule ULTIMATE (7,99 €).
   Même charte, mêmes composants que les 15 pages du pack COMPLETE.
   ========================================================================== */

export const makeBonus = (kit) => {
  const { rep, lines, numLines, tasks, field, fill, lbl, page } = kit;

  /* ---------------------------------------------- 📖 SUIVI DE LECTURE --- */
  const lecture = (n) => page({
    n, emo: '📖', title: 'Mon suivi de lecture',
    sub: 'Les livres lus pour les cours… et les autres.',
    body: `
    <table style="--rh:13.2mm">
      <thead>
        <tr>
          <th>Titre</th>
          <th style="width:34mm">Auteur</th>
          <th style="width:18mm" class="c">Pages</th>
          <th style="width:24mm" class="c">Commencé</th>
          <th style="width:24mm" class="c">Terminé</th>
          <th style="width:18mm" class="c">Note</th>
        </tr>
      </thead>
      <tbody>
        ${rep(14, (i) => `<tr class="${i % 2 ? 'alt' : ''}">${rep(6, () => '<td></td>')}</tr>`)}
      </tbody>
    </table>
    <div class="card fillcard" style="margin-top:5mm">
      ${lbl('Ce que j’ai retenu', '💡')}
      ${fill(lines(3))}
    </div>`
  });

  /* --------------------------------------------- 💰 BUDGET ÉTUDIANT ----- */
  const budget = (n) => page({
    n, emo: '💰', title: 'Mon budget étudiant',
    sub: 'Savoir où part l’argent, sans se prendre la tête.',
    body: `
    <div class="card tinted" style="padding:3mm 5mm;flex:0 0 auto">
      <div class="field"><span class="k">Mois</span><span class="v"></span></div>
    </div>
    <div class="grid g2" style="margin-top:4mm;flex:0 0 auto">
      <div class="card">
        ${lbl('Ce qui rentre', '🟢')}
        <table style="--rh:11.6mm;margin-top:1mm">
          <thead><tr><th>Source</th><th style="width:26mm" class="c">Montant</th></tr></thead>
          <tbody>${rep(8, (i) => `<tr class="${i % 2 ? 'alt' : ''}"><td></td><td></td></tr>`)}</tbody>
        </table>
      </div>
      <div class="card">
        ${lbl('Ce qui sort', '🔴')}
        <table style="--rh:11.6mm;margin-top:1mm">
          <thead><tr><th>Poste</th><th style="width:22mm" class="c">Prévu</th><th style="width:22mm" class="c">Réel</th></tr></thead>
          <tbody>${rep(8, (i) => `<tr class="${i % 2 ? 'alt' : ''}"><td></td><td></td><td></td></tr>`)}</tbody>
        </table>
      </div>
    </div>
    <div class="grid g2 fillgrid" style="margin-top:4mm">
      <div class="card fillcard">
        ${lbl('Ce que je veux mettre de côté', '🎯')}
        ${fill(lines(4))}
      </div>
      <div class="card fillcard">
        ${lbl('Les dépenses que je pourrais éviter', '💡')}
        ${fill(lines(4))}
      </div>
    </div>
    <div class="card accent" style="margin-top:4mm;flex:0 0 auto">
      <div class="grid g3">
        <div class="field"><span class="k" style="color:#fff">Total entrées</span><span class="v"></span></div>
        <div class="field"><span class="k" style="color:#fff">Total dépenses</span><span class="v"></span></div>
        <div class="field"><span class="k" style="color:#fff">Il me reste</span><span class="v"></span></div>
      </div>
    </div>`
  });

  /* ------------------------------------------------- 🗂️ RÉTROPLANNING --- */
  const WEEKS = ['S-8', 'S-7', 'S-6', 'S-5', 'S-4', 'S-3', 'S-2', 'S-1'];

  const retro = (n) => page({
    n, emo: '🗂️', title: 'Mon rétroplanning d’examen',
    sub: 'Huit semaines avant l’examen, on part de la fin et on remonte.',
    body: `
    <div class="card tinted">
      <div class="grid g3 gap-s">
        ${field('Examen')}${field('Date de l’examen')}${field('Semaines restantes')}
      </div>
    </div>
    <table style="margin-top:4mm;--rh:17mm">
      <thead>
        <tr>
          <th style="width:22mm" class="c">Semaine</th>
          <th>Ce que je révise</th>
          <th style="width:24mm" class="c">Temps prévu</th>
          <th style="width:18mm" class="c">Fait</th>
        </tr>
      </thead>
      <tbody>
        ${WEEKS.map((w, i) => `<tr class="${i % 2 ? 'alt' : ''}">
          <td class="h">${w}</td><td></td><td></td>
          <td class="c"><span class="ck"></span></td>
        </tr>`).join('')}
      </tbody>
    </table>
    <div class="card fillcard" style="margin-top:5mm;border-left:1.2mm solid var(--amber)">
      ${lbl('Mes points faibles à travailler en priorité', '⚠️')}
      ${fill(lines(4))}
    </div>`
  });

  /* -------------------------------------------- 🎒 CHECKLIST RENTRÉE ---- */
  const ckItem = (t) => `<div class="task"><span class="ck"></span><span class="ln" style="font-size:8pt;color:var(--ink-2);display:flex;align-items:flex-end">${t}</span></div>`;

  const rentree = (n) => page({
    n, emo: '🎒', title: 'Ma checklist de rentrée',
    sub: 'Tout cocher une fois, et ne plus y penser de l’année.',
    body: `
    <div class="grid g2 fillgrid">
      <div class="card fillcard">
        ${lbl('Fournitures', '✏️')}
        <div class="fill">
          ${['Cahiers / classeurs', 'Copies simples et doubles', 'Trousse complète', 'Calculatrice', 'Agenda ou planner']
            .map(ckItem).join('')}
          ${tasks(2)}
        </div>
      </div>
      <div class="card fillcard">
        ${lbl('Administratif', '📄')}
        <div class="fill">
          ${['Certificat de scolarité', 'Assurance scolaire', 'Photos d’identité', 'Bourse / dossier social', 'Carte de transport']
            .map(ckItem).join('')}
          ${tasks(2)}
        </div>
      </div>
      <div class="card fillcard">
        ${lbl('Organisation', '📅')}
        <div class="fill">
          ${['Emploi du temps recopié', 'Planner imprimé', 'Dates des contrôles notées', 'Espace de travail rangé']
            .map(ckItem).join('')}
          ${tasks(2)}
        </div>
      </div>
      <div class="card accent fillcard">
        ${lbl('À acheter / à demander', '📌')}
        ${fill(lines(6))}
      </div>
    </div>`
  });

  /* ------------------------------------------------ 📈 BILAN DU MOIS ---- */
  const bilanMois = (n) => page({
    n, emo: '📈', title: 'Mon bilan du mois',
    sub: 'Une fois par mois, on prend dix minutes et on regarde en arrière.',
    body: `
    <div class="card tinted" style="padding:3mm 5mm;flex:0 0 auto">
      <div class="field"><span class="k">Mois</span><span class="v"></span></div>
    </div>
    <div class="grid g2 fillgrid" style="margin-top:4mm">
      <div class="card fillcard">
        ${lbl('Ce qui a bien marché', '🎉')}
        ${fill(lines(4))}
      </div>
      <div class="card fillcard">
        ${lbl('Ce qui a moins bien marché', '⚠️')}
        ${fill(lines(4))}
      </div>
      <div class="card fillcard">
        ${lbl('Ce que je change le mois prochain', '🔁')}
        ${fill(numLines(3))}
      </div>
      <div class="card accent fillcard">
        ${lbl('Ma réussite du mois', '⭐')}
        ${fill(lines(3))}
        <div class="field" style="margin-top:2mm;flex:0 0 auto">
          <span class="k" style="color:#fff">Ma note du mois :</span>
          <span class="v" style="max-width:24mm"></span>
          <span class="k" style="color:#fff">/10</span>
        </div>
      </div>
    </div>`
  });

  return [lecture, budget, retro, rentree, bilanMois];
};

export const BONUS_META = [
  ['Suivi de lecture', '📖'], ['Budget étudiant', '💰'], ['Rétroplanning d’examen', '🗂️'],
  ['Checklist de rentrée', '🎒'], ['Bilan du mois', '📈'],
];
