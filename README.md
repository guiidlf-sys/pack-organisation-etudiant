# Pack Organisation Étudiant 2026–2027

Produit numérique complet : un planner étudiant de 15 pages A4, ses fichiers de vente,
ses visuels de boutique et sa stratégie de lancement. Coût de production : **0 €**.

👉 **Tu reprends le projet ? Commence par [`docs/00-ETAT-DU-PROJET.md`](docs/00-ETAT-DU-PROJET.md).**
👉 **Prochaine action concrète : [`docs/07-mise-en-ligne-pas-a-pas.md`](docs/07-mise-en-ligne-pas-a-pas.md) (45 min).**

---

## Ce qui est prêt

| | |
|---|---|
| 📄 **Le produit** | 3 formules : **BASIC** 7 p. · **COMPLETE** 15 p. · **ULTIMATE** 20 p. |
| 📱 **Version tablette** | Incluse dans chaque formule, avec navigation cliquable |
| 🖼️ **Images boutique** | 10 visuels 2000 × 2000 · `dist/images/boutique/` |
| 🎨 **Marque** | Logo, bannière, charte · `dist/images/marque/` |
| 🏪 **Plateforme** | Payhip — comparatif chiffré dans [doc 01](docs/01-comparatif-plateformes.md) |
| 💶 **Prix** | 2,99 / 3,99 / 7,99 € — nets ~2,55 / 3,48 / 7,22 € ([doc 05](docs/05-prix-et-revenus.md)) |
| ✍️ **Fiches produit** | Les 3, prêtes à coller ([doc 04](docs/04-fiche-produit.md)) |
| 🎬 **TikTok** | 10 vidéos scénarisées ([doc 08](docs/08-tiktok-10-videos.md)) |
| 📅 **Lancement** | Calendrier jour par jour ([doc 10](docs/10-calendrier-lancement.md)) |
| 📊 **Suivi** | `dist/suivi-ventes.csv` + méthode d'analyse ([doc 11](docs/11-suivi-resultats.md)) |

## Les documents

| Doc | Sujet |
|---|---|
| [00](docs/00-ETAT-DU-PROJET.md) | **État du projet** — ce qui est fait, ce qui reste, décisions prises |
| [01](docs/01-comparatif-plateformes.md) | Comparatif Payhip / Gumroad / Etsy et choix motivé |
| [02](docs/02-conditions-age-et-cadre-legal.md) | Âge minimum, compte parental, cadre fiscal français |
| [03](docs/03-boutique-identite.md) | Nom, logo, description, charte de marque |
| [04](docs/04-fiche-produit.md) | Titre, description, mots-clés — prêts à coller |
| [05](docs/05-prix-et-revenus.md) | Prix, frais réels, revenus de 1 à 100 ventes |
| [06](docs/06-processus-achat-et-livraison.md) | Parcours d'achat et livraison automatique |
| [07](docs/07-mise-en-ligne-pas-a-pas.md) | **Mise en ligne pas à pas** ← à faire maintenant |
| [08](docs/08-tiktok-10-videos.md) | 10 vidéos TikTok complètes |
| [09](docs/09-autres-canaux.md) | Pinterest, Instagram, communautés |
| [10](docs/10-calendrier-lancement.md) | Calendrier de lancement sur 4 semaines |
| [11](docs/11-suivi-resultats.md) | Tableau de suivi et diagnostic des chiffres |
| [12](docs/12-premieres-ventes.md) | Stratégie palier par palier (1 → 100 ventes) |
| [13](docs/13-amelioration-et-gamme.md) | Version 2 et gamme de 9 produits |
| [14](docs/14-controle-qualite.md) | Contrôle qualité et exportation |

## Regénérer le produit

Le planner est **produit par du code** : aucune mise en page manuelle, donc aucune
régression silencieuse. Modifier une page se fait dans `src/planner.mjs`, puis :

```bash
npm install          # installe Playwright
npm run all          # PDF + aperçus + images boutique + marque + contrôles
```

| Commande | Effet |
|---|---|
| `npm run build` | Les 6 PDF et tous les aperçus PNG |
| `npm run mockups` | Les 10 images de boutique |
| `npm run brand` | Logo et bannière |
| `npm run verify` | **137 contrôles qualité** sur les 3 éditions (sort en erreur si un échoue) |
| `npm run sheet` | Planches contact pour la relecture visuelle |

## Organisation des fichiers

```
src/          planner.mjs (pages 1-15 + éditions) · bonus.mjs (5 pages Ultimate)
              styles.css (la charte) · icons.mjs (pictos de couverture)
build/        render.mjs · mockups.mjs · brand.mjs · verify.mjs · sheet.mjs · covers.mjs
assets/fonts/ Inter + Outfit en local (rendu identique partout, hors ligne)
dist/         LES FICHIERS À VENDRE ET À PUBLIER
docs/         Le plan de vente complet, du choix de plateforme au 100e client
```

## Deux règles de fond

1. **Aucune promesse de résultat scolaire.** Le produit aide à s'organiser ; il ne promet
   nulle part de meilleures notes. Une promesse intenable se paie en avis négatifs.
2. **Aucun contournement des règles des plateformes.** Le compte appartient à une personne
   majeure, point. Un compte fermé, c'est le travail *et* l'argent perdus.
3. **Le cahier des charges fait foi.** Les émojis, les intitulés et les contenus de page
   sont repris à l'identique ; `npm run verify` échoue si l'un d'eux disparaît.
