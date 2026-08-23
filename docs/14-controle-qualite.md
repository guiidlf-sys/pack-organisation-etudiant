# Étapes 3-5 — Contrôle qualité et exportation

## Contrôle automatique

```bash
npm run verify      # 137 contrôles, sortie en erreur si un seul échoue
```

Résultat de la dernière exécution : **137 contrôles réussis, 0 problème.**
Les contrôles tournent sur **les trois éditions** (BASIC 7 p., COMPLETE 15 p., ULTIMATE 20 p.).

Ce que le script vérifie (`build/verify.mjs`) :

| Contrôle | Résultat |
|---|---|
| Les **6 PDF** (3 formules × impression + tablette) sont générés et non vides | ✅ |
| Les 20 aperçus de page + 10 images boutique + 3 visuels de marque existent | ✅ |
| Chaque édition contient **exactement** le nombre de pages attendu (7 / 15 / 20) | ✅ |
| La numérotation des ancres est continue dans chaque édition | ✅ |
| Les **13 émojis du cahier des charges** sont présents | ✅ |
| Toutes les pages ont **le même format** (794 × 1123 px @96 dpi = A4) | ✅ |
| **Aucun bloc ne déborde** de la zone imprimable | ✅ |
| **Deux polices seulement** sur tout le document (Inter, Outfit) | ✅ |
| Aucun texte de démonstration (`lorem`, `todo`, `xxx`, `placeholder`…) | ✅ |
| Aucun filigrane | ✅ |
| Apostrophes typographiques françaises (’) | ✅ |
| Les 15 titres de page attendus sont présents | ✅ |

## Contrôle visuel

Chaque page a été rendue en PNG et relue en planche contact
(`node build/sheet.mjs`), à deux reprises : une première relecture a détecté six
défauts, tous corrigés, puis une seconde relecture a validé le résultat.

### Défauts trouvés et corrigés

| # | Page(s) | Problème | Correction |
|---|---|---|---|
| 1 | 6, 7 | Les cases à cocher des tableaux s'affichaient comme un simple trait vertical | `.ck` passé en `inline-block` (un `<span>` en `display:inline` ignore largeur et hauteur) |
| 2 | 11 | Même défaut sur les 217 cases du habit tracker | `.cell` passé en `display:block` |
| 3 | 1 | Deux grandes zones vides sur la couverture | Bandeau réduit à 152 mm et ajout de l'index « Ce que contient le pack » |
| 4 | 2-14 | Blocs tassés en bas des cartes avec un vide au-dessus | Utilitaire `.fill` : les lignes d'écriture se répartissent sur toute la hauteur |
| 5 | 4 | Quart de page vide sous les blocs de jours | Grille en `grid-auto-rows:1fr` étirée sur la hauteur restante |
| 6 | 5, 7 | Case à cocher flottant au milieu de la ligne | `.task` aligné en bas (`align-items:flex-end`) |
| 7 | 2, 10, 14 | Deux pictogrammes illisibles à 6 mm (fusée, bras) | Redessinés ; ajout de `trend`, `heartO`, `calCheck`, `more` |
| 8 | tout | Apostrophes droites (') au lieu des apostrophes françaises (’) | Correction typographique sur l'ensemble du document |

## Conformité au cahier des charges

Une première version remplaçait les émojis des titres (📅 ✅ 📚 🧠…) par des pictogrammes
SVG, pour des raisons d'homogénéité visuelle. **Cette substitution a été annulée** : le
cahier des charges plaçait des émojis précis à des endroits précis, et ils sont désormais
repris **à l'identique**, aux 13 titres de page comme aux intitulés de section
(⭐ 🔑 💡 ❓ 🎯 📚 💪 🚀 📌 🔴 🟡 🟢 🎉 ⚠️ 💜).

Le script `verify` contrôle explicitement leur présence : la substitution ne peut plus
réapparaître sans être signalée.

Les pictogrammes SVG maison ne servent plus que sur la couverture, là où le cahier des
charges demande « des icônes : livres, calendrier, crayon et objectif » sans préciser
d'émoji.

## Fichiers exportés

| Fichier | Contenu |
|---|---|
| `..._2026_2027_BASIC.pdf` / `_BASIC_TABLETTE.pdf` | Formule BASIC — 7 pages |
| `..._2026_2027.pdf` / `_TABLETTE.pdf` | Formule COMPLETE — 15 pages |
| `..._2026_2027_ULTIMATE.pdf` / `_ULTIMATE_TABLETTE.pdf` | Formule ULTIMATE — 20 pages |
| `dist/images/pages/page-01…15.png` | Aperçus haute définition (1588 × 2248 px ≈ 190 dpi) |
| `dist/images/pages-bonus/page-15…19.png` | Aperçus des 5 pages bonus |
| `dist/images/covers/cover-*.png` | Couverture de chaque formule |
| `dist/images/boutique/*.png` | 10 images commerciales 2000 × 2000 |
| `dist/images/marque/*.png` | Logo carré, logo horizontal, bannière |

**Format vérifié :** 595 × 842 pt = 210 × 297 mm sur les **84 pages** des six fichiers.
**Texte sélectionnable** dans le PDF (utile pour la recherche et l'accessibilité).

## Différence entre les deux PDF

| | Impression | Tablette |
|---|---|---|
| Format | A4 | A4 |
| Fond coloré | oui | oui |
| Barre de navigation | non | **oui** — 15 onglets cliquables en bas de page |
| Liens internes | 0 | **49** (Basic) · **225** (Complete) · **400** (Ultimate) |
| Usage | imprimante | GoodNotes, Notability, Xodo, Samsung Notes |

## Refaire le produit après une modification

```bash
npm run build      # régénère les 6 PDF + les aperçus
npm run mockups    # régénère les 10 images boutique
npm run brand      # régénère logo et bannière
npm run verify     # relance les 137 contrôles
npm run all        # tout d'un coup
```

Le produit est **entièrement reproductible depuis le code** : modifier une page ne demande
pas de refaire la mise en page à la main, et les corrections ne peuvent pas casser les
autres pages sans que `verify` le signale.
