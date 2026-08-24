# -*- coding: utf-8 -*-
"""Génère la page de vente (fragment HTML destiné à être publié en Artifact)."""
import json, pathlib

A = json.load(open('build/_assets.json'))

PAGES = [
    (2, 'Moi & mes objectifs', 'Poser ses bases pour l’année'),
    (3, 'Mon emploi du temps', 'La semaine type, de 8 h à 17 h'),
    (4, 'Ma semaine', 'Les 7 jours et la priorité de la semaine'),
    (5, 'Ma to-do list', 'Trois niveaux de priorité'),
    (6, 'Mes devoirs', 'Matière, devoir, date, priorité, fait'),
    (7, 'Mon plan de révision', 'Découper un contrôle en étapes'),
    (8, 'Fiche de révision', 'L’essentiel d’un chapitre sur une page'),
    (9, 'Mon suivi des notes', 'Voir sa progression matière par matière'),
    (10, 'Mes objectifs', 'École, personnel, et les 3 étapes'),
    (11, 'Habit tracker', '31 jours, 5 habitudes + 2 lignes libres'),
    (12, 'Mon mois', 'Calendrier mensuel et dates importantes'),
    (13, 'Brain dump', 'Vider sa tête en 4 zones'),
    (14, 'Bilan de ma semaine', 'Cinq minutes le dimanche soir'),
]
BONUS = [
    (15, 'Mon suivi de lecture', '14 livres, avec dates et note'),
    (16, 'Mon budget étudiant', 'Ce qui rentre, ce qui sort, ce qu’il reste'),
    (17, 'Mon rétroplanning d’examen', 'Les 8 semaines avant le jour J'),
    (18, 'Ma checklist de rentrée', 'Fournitures, administratif, organisation'),
    (19, 'Mon bilan du mois', 'Ce qui a marché, ce que je change'),
]
FAQ = [
    ('C’est un fichier ou un carnet papier ?',
     'Un fichier. Tu reçois deux PDF à télécharger : la version impression et la version '
     'tablette. Rien n’est expédié par la poste.'),
    ('Je peux l’imprimer plusieurs fois ?',
     'Autant de fois que tu veux, toute l’année. C’est même prévu pour : les pages semaine, '
     'to-do et devoirs se réimpriment chaque semaine.'),
    ('Et si je n’ai pas d’imprimante ?',
     'La version tablette est incluse. Tu l’ouvres dans GoodNotes, Notability, Xodo ou '
     'Samsung Notes et tu écris dessus au stylet. Une barre de navigation permet de sauter '
     'd’une page à l’autre.'),
    ('Je peux modifier le texte des pages ?',
     'Non. Le PDF n’est pas éditable : il se remplit à la main, ou au stylet sur tablette.'),
    ('Comment imprimer sans que ce soit trop petit ?',
     'Choisis A4 et « taille réelle » ou 100 %. Surtout pas « ajuster à la page », qui réduit '
     'les marges et rétrécit les cases.'),
    ('Ça marche pour le collège, le lycée ou le supérieur ?',
     'Les trois. L’emploi du temps va de 8 h à 17 h, le suivi des notes est sur 20, et rien '
     'n’est lié à un programme précis.'),
]

def img(key, alt, cls=''):
    return f'<img src="{A[key]}" alt="{alt}" class="{cls}" decoding="async">'

def card(num, name, desc, key):
    return f'''<figure class="page-card">
        {img(key, f'Page {num} — {name}')}
        <figcaption><span class="pnum">{num:02d}</span><span class="pname">{name}</span><span class="pdesc">{desc}</span></figcaption>
      </figure>'''

gallery = '\n      '.join(card(n, t, d, f'p{n}') for n, t, d in PAGES)
gallery_bonus = '\n      '.join(card(n, t, d, f'b{n}') for n, t, d in BONUS)
faq = '\n      '.join(
    f'<details><summary>{q}</summary><p>{a}</p></details>' for q, a in FAQ)
index = '\n        '.join(
    f'<li><span class="n">{n:02d}</span>{t}</li>' for n, t, _ in PAGES)

HTML = f'''<title>Pack Organisation Étudiant</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Outfit:wght@500;700;800&family=Inter:wght@400;500;600&family=IBM+Plex+Mono:wght@400;500;600&display=swap">

<style>
:root{{
  --paper:#FBFAFE; --surface:#FFFFFF; --ink:#14121F; --ink-2:#413D5A; --ink-3:#75718C;
  --violet:#5B3FD6; --violet-soft:#EEEAFD; --blue:#3F55E0; --green:#15805A;
  --rule:rgba(20,18,31,.07); --edge:rgba(20,18,31,.11); --shadow:rgba(20,18,31,.16);
  --max:1120px;
}}
@media (prefers-color-scheme:dark){{
  :root:not([data-theme="light"]){{
    --paper:#100F18; --surface:#191725; --ink:#EEECF8; --ink-2:#B9B5CE; --ink-3:#8B87A3;
    --violet:#A78BFA; --violet-soft:#241F3D; --blue:#8AA0FF; --green:#4FCFA1;
    --rule:rgba(238,236,248,.07); --edge:rgba(238,236,248,.14); --shadow:rgba(0,0,0,.5);
  }}
}}
:root[data-theme="dark"]{{
  --paper:#100F18; --surface:#191725; --ink:#EEECF8; --ink-2:#B9B5CE; --ink-3:#8B87A3;
  --violet:#A78BFA; --violet-soft:#241F3D; --blue:#8AA0FF; --green:#4FCFA1;
  --rule:rgba(238,236,248,.07); --edge:rgba(238,236,248,.14); --shadow:rgba(0,0,0,.5);
}}

*{{box-sizing:border-box}}
body{{
  margin:0; background:var(--paper); color:var(--ink);
  font-family:'Inter',system-ui,-apple-system,'Segoe UI',sans-serif;
  font-size:17px; line-height:1.65; -webkit-font-smoothing:antialiased;
  /* papier réglé : la matière du sujet */
  background-image:repeating-linear-gradient(to bottom,transparent 0 33px,var(--rule) 33px 34px);
  background-attachment:fixed;
}}
img{{max-width:100%;display:block}}
a{{color:inherit}}
:focus-visible{{outline:2.5px solid var(--violet);outline-offset:3px;border-radius:3px}}

.wrap{{max-width:var(--max);margin:0 auto;padding:0 24px}}
section{{padding:76px 0;border-top:1px solid var(--edge)}}
section:first-of-type{{border-top:none}}

h1,h2,h3{{font-family:'Outfit',sans-serif;letter-spacing:-.022em;text-wrap:balance;margin:0}}
h1{{font-size:clamp(2.6rem,6.2vw,4.15rem);font-weight:800;line-height:.99;text-transform:uppercase}}
h2{{font-size:clamp(1.65rem,3.4vw,2.3rem);font-weight:800;line-height:1.08}}
h3{{font-size:1.08rem;font-weight:700}}
p{{margin:0;max-width:64ch}}

.lab{{
  font-family:'IBM Plex Mono',ui-monospace,monospace;font-size:.72rem;font-weight:500;
  letter-spacing:.17em;text-transform:uppercase;color:var(--violet);
}}
.lead{{font-size:1.18rem;color:var(--ink-2);margin-top:18px}}
.muted{{color:var(--ink-3);font-size:.94rem}}
.stack{{display:flex;flex-direction:column;gap:18px}}
.head{{display:flex;flex-direction:column;gap:12px;margin-bottom:38px}}

/* ------------------------------------------------------------------ hero */
.hero{{padding:64px 0 76px;display:grid;grid-template-columns:minmax(0,1.05fr) minmax(0,.95fr);gap:56px;align-items:center}}
.brandline{{display:flex;align-items:center;gap:12px;margin-bottom:26px}}
.brandline img{{width:38px;height:38px;border-radius:11px}}
.brandline b{{font-family:'Outfit',sans-serif;font-size:1rem;letter-spacing:.01em}}
.hero-shot{{position:relative}}
.hero-shot img{{
  border-radius:10px;box-shadow:0 28px 64px var(--shadow),0 0 0 1px var(--edge);
  transform:rotate(-1.6deg);
}}
.price-row{{display:flex;align-items:baseline;gap:14px;margin-top:34px;flex-wrap:wrap}}
.price{{font-family:'Outfit',sans-serif;font-size:2.9rem;font-weight:800;letter-spacing:-.03em;line-height:1}}
.price-note{{font-family:'IBM Plex Mono',monospace;font-size:.82rem;color:var(--ink-3)}}
.cta-row{{display:flex;gap:14px;flex-wrap:wrap;margin-top:26px;align-items:center}}
.btn{{
  font-family:'Outfit',sans-serif;font-weight:700;font-size:1.02rem;letter-spacing:.005em;
  padding:15px 30px;border-radius:8px;border:none;text-decoration:none;
  display:inline-flex;align-items:center;gap:10px;cursor:pointer;
  background:var(--ink);color:var(--paper);transition:transform .16s ease,opacity .16s ease;
}}
.btn:hover{{transform:translateY(-2px)}}
.btn[aria-disabled="true"]{{background:var(--violet-soft);color:var(--ink-3);cursor:default;transform:none}}
.btn-ghost{{background:transparent;color:var(--ink);box-shadow:inset 0 0 0 1.5px var(--edge)}}

/* --------------------------------------------------------------- specs */
.specs{{display:grid;grid-template-columns:repeat(4,1fr);gap:0;margin-top:44px;border-top:1px solid var(--edge)}}
.specs div{{padding:16px 18px 0 0}}
.specs dt{{font-family:'IBM Plex Mono',monospace;font-size:.68rem;letter-spacing:.15em;text-transform:uppercase;color:var(--ink-3)}}
.specs dd{{margin:5px 0 0;font-family:'Outfit',sans-serif;font-weight:700;font-size:1.02rem}}

/* -------------------------------------------------------------- index */
.index-grid{{display:grid;grid-template-columns:1fr 1fr;gap:6px 40px;margin:0;padding:0;list-style:none}}
.index-grid li{{display:flex;gap:14px;align-items:baseline;padding:9px 0;border-bottom:1px solid var(--rule);font-size:1rem}}
.index-grid .n{{font-family:'IBM Plex Mono',monospace;font-size:.78rem;color:var(--violet);font-weight:600}}

/* ------------------------------------------------------------ galerie */
.strip{{display:flex;gap:20px;overflow-x:auto;scroll-snap-type:x mandatory;padding:6px 24px 22px;margin:0 -24px;-webkit-overflow-scrolling:touch}}
.page-card{{margin:0;flex:0 0 232px;scroll-snap-align:start}}
.page-card img{{border-radius:6px;box-shadow:0 10px 26px var(--shadow),0 0 0 1px var(--edge);background:#fff}}
.page-card figcaption{{display:flex;flex-direction:column;gap:2px;margin-top:13px}}
.pnum{{font-family:'IBM Plex Mono',monospace;font-size:.7rem;color:var(--violet);font-weight:600;letter-spacing:.08em}}
.pname{{font-family:'Outfit',sans-serif;font-weight:700;font-size:.98rem}}
.pdesc{{font-size:.85rem;color:var(--ink-3);line-height:1.45}}

/* ----------------------------------------------------------- formules */
.tablewrap{{overflow-x:auto}}
table{{width:100%;border-collapse:collapse;min-width:600px}}
th,td{{text-align:left;padding:15px 18px;border-bottom:1px solid var(--edge);vertical-align:middle}}
thead th{{font-family:'IBM Plex Mono',monospace;font-size:.72rem;letter-spacing:.14em;text-transform:uppercase;color:var(--ink-3);font-weight:500;border-bottom-width:1.5px}}
tbody th{{font-weight:500;color:var(--ink-2);font-family:'Inter',sans-serif;font-size:.97rem}}
td{{font-family:'IBM Plex Mono',monospace;font-size:.92rem;font-variant-numeric:tabular-nums}}
.col-hi{{background:var(--violet-soft)}}
thead .col-hi{{color:var(--violet);font-weight:600}}
.tprice{{font-family:'Outfit',sans-serif;font-weight:800;font-size:1.45rem;letter-spacing:-.02em}}
.yes{{color:var(--green);font-weight:600}}
.no{{color:var(--ink-3)}}

/* -------------------------------------------------------------- étapes */
.steps{{display:grid;grid-template-columns:repeat(3,1fr);gap:36px;counter-reset:s}}
.step{{position:relative;padding-top:22px;border-top:2px solid var(--violet)}}
.step::before{{
  counter-increment:s;content:counter(s,decimal-leading-zero);
  font-family:'IBM Plex Mono',monospace;font-size:.72rem;font-weight:600;color:var(--violet);
  position:absolute;top:-22px;left:0;letter-spacing:.1em;
}}
.step p{{margin-top:8px;color:var(--ink-2);font-size:.97rem}}

/* ----------------------------------------------------------------- faq */
details{{border-bottom:1px solid var(--edge);padding:18px 0}}
summary{{font-family:'Outfit',sans-serif;font-weight:700;font-size:1.05rem;cursor:pointer;list-style:none;display:flex;justify-content:space-between;gap:20px;align-items:center}}
summary::-webkit-details-marker{{display:none}}
summary::after{{content:'+';font-family:'IBM Plex Mono',monospace;color:var(--violet);font-size:1.3rem;transition:transform .2s ease}}
details[open] summary::after{{transform:rotate(45deg)}}
details p{{margin-top:12px;color:var(--ink-2);font-size:.98rem}}

/* --------------------------------------------------------------- pied */
footer{{padding:56px 0 72px;border-top:1px solid var(--edge)}}
.legal{{font-size:.87rem;color:var(--ink-3);max-width:70ch}}
.legal b{{color:var(--ink-2)}}

@media (prefers-reduced-motion:reduce){{*{{transition:none!important;animation:none!important}}}}
@media (max-width:880px){{
  .hero{{grid-template-columns:1fr;gap:38px;padding-top:44px}}
  .hero-shot{{order:-1;max-width:400px}}
  .specs{{grid-template-columns:1fr 1fr}}
  .index-grid{{grid-template-columns:1fr}}
  .steps{{grid-template-columns:1fr;gap:30px}}
  section{{padding:56px 0}}
}}
</style>

<div class="wrap">

  <div class="hero">
    <div>
      <div class="brandline">{img('logo','Studio Récap')}<b>Studio Récap</b></div>
      <div class="lab">Édition 2026 – 2027</div>
      <h1>Pack Organisation Étudiant</h1>
      <p class="lead">Ton kit pour mieux t’organiser, travailler efficacement et suivre tes
      progrès. Quinze pages A4 à imprimer autant de fois que tu veux — ou à remplir au
      stylet sur tablette.</p>

      <div class="price-row">
        <span class="price">3,99 €</span>
        <span class="price-note">paiement unique · téléchargement immédiat</span>
      </div>

      <div class="cta-row" id="cta"></div>

      <dl class="specs">
        <div><dt>Format</dt><dd>A4 · 210 × 297 mm</dd></div>
        <div><dt>Pages</dt><dd>15</dd></div>
        <div><dt>Fichiers</dt><dd>2 PDF</dd></div>
        <div><dt>Langue</dt><dd>Français</dd></div>
      </dl>
    </div>
    <div class="hero-shot">{img('cover-complete','Couverture du Pack Organisation Étudiant 2026-2027')}</div>
  </div>

  <section>
    <div class="head">
      <div class="lab">Le contenu</div>
      <h2>Treize pages de travail,<br>plus la couverture et la page finale</h2>
      <p class="muted">Chaque page fait un seul travail. C’est ce qui fait qu’on s’en sert
      encore en novembre.</p>
    </div>
    <ol class="index-grid">
        {index}
    </ol>
  </section>

  <section>
    <div class="head">
      <div class="lab">Aperçu</div>
      <h2>Toutes les pages, sans filigrane</h2>
      <p class="muted">Fais défiler horizontalement. Ce sont les pages réelles du fichier,
      pas des maquettes.</p>
    </div>
    <div class="strip">
      {gallery}
    </div>
  </section>

  <section>
    <div class="head">
      <div class="lab">Trois formules</div>
      <h2>Prends ce dont tu as besoin</h2>
    </div>
    <div class="tablewrap">
      <table>
        <thead>
          <tr>
            <th scope="col"></th>
            <th scope="col">Basic</th>
            <th scope="col" class="col-hi">Complete</th>
            <th scope="col">Ultimate</th>
          </tr>
        </thead>
        <tbody>
          <tr><th scope="row">Prix</th>
            <td class="tprice">2,99 €</td><td class="tprice col-hi">3,99 €</td><td class="tprice">7,99 €</td></tr>
          <tr><th scope="row">Pages A4</th><td>7</td><td class="col-hi">15</td><td>20</td></tr>
          <tr><th scope="row">Semaine, to-do, devoirs</th>
            <td class="yes">inclus</td><td class="yes col-hi">inclus</td><td class="yes">inclus</td></tr>
          <tr><th scope="row">Plan et fiche de révision</th>
            <td class="yes">inclus</td><td class="yes col-hi">inclus</td><td class="yes">inclus</td></tr>
          <tr><th scope="row">Suivi des notes</th>
            <td class="yes">inclus</td><td class="yes col-hi">inclus</td><td class="yes">inclus</td></tr>
          <tr><th scope="row">Objectifs, habit tracker, mois, brain dump, bilan</th>
            <td class="no">—</td><td class="yes col-hi">inclus</td><td class="yes">inclus</td></tr>
          <tr><th scope="row">Lecture, budget, rétroplanning, rentrée, bilan mensuel</th>
            <td class="no">—</td><td class="no col-hi">—</td><td class="yes">5 pages bonus</td></tr>
          <tr><th scope="row">Version impression + version tablette</th>
            <td class="yes">incluses</td><td class="yes col-hi">incluses</td><td class="yes">incluses</td></tr>
        </tbody>
      </table>
    </div>
  </section>

  <section>
    <div class="head">
      <div class="lab">Formule Ultimate</div>
      <h2>Les cinq pages bonus</h2>
    </div>
    <div class="strip">
      {gallery_bonus}
    </div>
  </section>

  <section>
    <div class="head">
      <div class="lab">Après l’achat</div>
      <h2>Comment ça marche</h2>
    </div>
    <div class="steps">
      <div class="step">
        <h3>Tu commandes</h3>
        <p>Paiement sécurisé par carte ou PayPal, en une fois. Pas d’abonnement, pas de compte à créer.</p>
      </div>
      <div class="step">
        <h3>Tu télécharges tout de suite</h3>
        <p>Le lien apparaît immédiatement après le paiement, et part aussi par e-mail. Rien à attendre.</p>
      </div>
      <div class="step">
        <h3>Tu imprimes, ou pas</h3>
        <p>Version impression pour le papier, version tablette avec navigation cliquable pour GoodNotes, Notability, Xodo ou Samsung Notes.</p>
      </div>
    </div>
  </section>

  <section>
    <div class="head">
      <div class="lab">Questions</div>
      <h2>Avant d’acheter</h2>
    </div>
    <div>
      {faq}
    </div>
  </section>

  <footer>
    <p class="legal">
      <b>Produit numérique.</b> Aucun article physique n’est expédié : la commande donne
      accès à des fichiers PDF à télécharger. Il faut une imprimante, ou une tablette avec
      une application de prise de notes. Les fichiers sont destinés à un
      <b>usage personnel</b> — ni revente, ni partage, ni redistribution. Les couleurs
      peuvent varier légèrement d’une imprimante à l’autre. Le téléchargement étant
      immédiat, la commande n’est pas remboursable une fois le fichier téléchargé.
    </p>
    <p class="legal" style="margin-top:18px">
      Ce planner aide à s’organiser et à suivre son travail. Il ne promet pas de meilleures
      notes : aucun outil ne peut garantir un résultat scolaire.
    </p>
    <p class="legal" style="margin-top:26px;font-family:'IBM Plex Mono',monospace;font-size:.78rem;letter-spacing:.06em">
      STUDIO RÉCAP · ÉDITION 2026–2027
    </p>
  </footer>
</div>

<script>
/* Liens de commande. Dès que la boutique Payhip est en ligne, remplacer les chaînes
   vides par les URL des produits : les boutons s'activent tout seuls. */
const CHECKOUT = {{
  complete: '',
  ultimate: '',
}};

const cta = document.getElementById('cta');
const mk = (href, label, cls) => {{
  if (href) {{
    const a = document.createElement('a');
    a.className = 'btn ' + cls; a.href = href; a.target = '_blank'; a.rel = 'noopener';
    a.textContent = label;
    return a;
  }}
  const s = document.createElement('span');
  s.className = 'btn ' + cls; s.setAttribute('aria-disabled', 'true');
  s.textContent = label;
  return s;
}};

if (CHECKOUT.complete) {{
  cta.append(mk(CHECKOUT.complete, 'Acheter — 3,99 €', ''));
  if (CHECKOUT.ultimate) cta.append(mk(CHECKOUT.ultimate, 'Formule Ultimate — 7,99 €', 'btn-ghost'));
}} else {{
  cta.append(mk('', 'Mise en vente imminente', ''));
  const n = document.createElement('span');
  n.className = 'price-note';
  n.textContent = 'La boutique ouvre dans quelques jours.';
  cta.append(n);
}}
</script>
'''

pathlib.Path('dist/page-produit.html').write_text(HTML, encoding='utf-8')
print('dist/page-produit.html :', round(len(HTML.encode())/1024/1024, 2), 'Mo')
