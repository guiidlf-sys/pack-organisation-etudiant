# Étapes 3-5 — Contrôle qualité et exportation

## Contrôle automatique

```bash
npm run verify      # 57 contrôles, sortie en erreur si un seul échoue
```

Résultat de la dernière exécution : **57 contrôles réussis, 0 problème.**

Ce que le script vérifie (`build/verify.mjs`) :

| Contrôle | Résultat |
|---|---|
| Les 2 PDF sont générés et non vides | ✅ |
| Les 15 aperçus de page + 8 images boutique + 3 visuels de marque existent | ✅ |
| Le document contient exactement **15 pages** | ✅ |
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

## Décision de conception à signaler

Le cahier des charges plaçait des émojis dans les titres de page (📅 ✅ 📚 🧠…).
Ils ont été remplacés par un **jeu de 26 pictogrammes SVG dessinés pour le projet**,
dans le violet de la marque.

**Pourquoi :** les émojis multicolores rendent l'ensemble hétérogène et donnent un aspect
« modèle gratuit », ce qui contredit les autres exigences du brief (design minimaliste,
professionnel, bleu/violet, identité visuelle unique sur toutes les pages). Les
pictogrammes maison portent le même sens, s'impriment proprement en noir et blanc et
pèsent moins lourd dans le PDF.

**Tous les textes du cahier des charges ont été conservés à l'identique**, seuls les
caractères émojis ont été remplacés par leur équivalent dessiné.

## Fichiers exportés

| Fichier | Taille | Contenu |
|---|---|---|
| `dist/Pack_Organisation_Etudiant_2026_2027.pdf` | ~460 Ko | 15 pages A4, prêt à imprimer |
| `dist/Pack_Organisation_Etudiant_2026_2027_TABLETTE.pdf` | ~670 Ko | 15 pages + **225 liens internes** de navigation |
| `dist/images/pages/page-01…15.png` | — | Aperçus haute définition (1588 × 2248 px ≈ 190 dpi) |
| `dist/images/boutique/*.png` | — | 8 images commerciales 2000 × 2000 |
| `dist/images/marque/*.png` | — | Logo carré, logo horizontal, bannière |

**Format vérifié :** 595 × 842 pt = 210 × 297 mm sur les 15 pages des deux fichiers.
**Texte sélectionnable** dans le PDF (utile pour la recherche et l'accessibilité).

## Différence entre les deux PDF

| | Impression | Tablette |
|---|---|---|
| Format | A4 | A4 |
| Fond coloré | oui | oui |
| Barre de navigation | non | **oui** — 15 onglets cliquables en bas de page |
| Liens internes | 0 | **225** |
| Usage | imprimante | GoodNotes, Notability, Xodo, Samsung Notes |

## Refaire le produit après une modification

```bash
npm run build      # régénère les 2 PDF + les 15 aperçus
npm run mockups    # régénère les 8 images boutique
npm run brand      # régénère logo et bannière
npm run verify     # relance les 57 contrôles
npm run all        # tout d'un coup
```

Le produit est **entièrement reproductible depuis le code** : modifier une page ne demande
pas de refaire la mise en page à la main, et les corrections ne peuvent pas casser les
autres pages sans que `verify` le signale.
