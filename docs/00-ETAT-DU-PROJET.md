# État du projet — Pack Organisation Étudiant 2026-2027

*Dernière mise à jour : 24 août 2026 — trois formules produites, émojis du cahier des charges rétablis*

## Où on en est

```
[■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■■□□□□□□□□□□]  ~75 %

PRODUIT ✅ FINI (×3)     BOUTIQUE ⏳ À CRÉER (toi)      PROMOTION 📦 PRÊTE
```

## Les 19 étapes

| # | Étape | État | Où |
|---|---|---|---|
| 1 | Choisir l'outil de création | ✅ Fait | HTML/CSS + Chromium — reproductible, 0 € |
| 2 | Créer le produit | ✅ Fait | **3 formules × 2 PDF** dans `dist/` |
| 3 | Vérifier le produit | ✅ Fait | doc 14 — **137 contrôles** sur les 3 éditions |
| 4 | Corriger les erreurs | ✅ Fait | doc 14 — 8 défauts corrigés + émojis rétablis |
| 5 | Exporter les fichiers | ✅ Fait | 6 PDF + 41 images |
| 6 | Choisir la plateforme | ✅ Fait | **Payhip** — doc 01 |
| 7 | Vérifier âge et paiement | ✅ Fait | doc 02 |
| 8 | Créer la boutique | ⏳ **À toi** | doc 07 §1-2 |
| 9 | Créer la fiche produit | ✅ Rédigées ×3 | doc 04 — à coller |
| 10 | Ajouter les fichiers numériques | ⏳ **À toi** | doc 07 §3 |
| 11 | Préparer les images | ✅ Fait | 10 images · `dist/images/boutique/` |
| 12 | Préparer le prix | ✅ Fait | **2,99 / 3,99 / 7,99 €** — doc 05 |
| 13 | Téléchargement automatique | ✅ Paramétrage prêt | doc 06 |
| 14 | Stratégie marketing | ✅ Fait | docs 08 et 09 |
| 15 | Vidéos TikTok | ✅ 10 scénarios écrits | doc 08 |
| 16 | Publier le produit | ⏳ **À toi** | doc 07 §5 (test d'achat) |
| 17 | Suivre les résultats | ✅ Outil prêt | doc 11 + `dist/suivi-ventes.csv` |
| 18 | Améliorer le produit | ✅ Méthode prête | doc 13 |
| 19 | Créer d'autres produits | ✅ Gamme planifiée | doc 13 — 9 produits |

## Décisions déjà prises (ne pas les refaire)

| Sujet | Décision | Pourquoi |
|---|---|---|
| Outil de création | HTML/CSS rendu par Chromium | 0 €, reproductible, aucune retouche manuelle |
| Plateforme | **Payhip** (offre gratuite, 5 %) | Le moins cher sur un produit à 3,99 € ; TVA UE gérée |
| Etsy | **Plus tard**, après 10 ventes | Frais de mise en ligne inutiles avant validation |
| Nom de boutique | **Studio Récap** ✅ confirmé | Court, extensible à toute la gamme |
| Prix | **BASIC 2,99 € · COMPLETE 3,99 € · ULTIMATE 7,99 €** | Trois offres réellement différentes, effet d'ancrage sur COMPLETE |
| Paliers 2,99/4,99/7,99 | ✅ **Produits** | Les 3 fichiers existent : 7, 15 et 20 pages |
| Émojis des titres | **Ceux du cahier des charges, à l'identique** | Conformité stricte au brief ; contrôlée par `verify` |
| Code promo | `RENTREE` −20 %, 15 jours | Donne une raison d'acheter maintenant |
| Publicité payante | Aucune avant 50 ventes | Pas d'argent brûlé sur une page non validée |

## Ce qui bloque, et pourquoi

**Une seule chose : la création du compte.**

Elle demande une adresse e-mail, une identité vérifiée et un compte Stripe ou PayPal.
Ce sont des actions personnelles — personne ne peut les faire à ta place.

👉 **Prochaine action : `docs/07-mise-en-ligne-pas-a-pas.md`, 45 minutes.**

✅ **Titulaire du compte confirmé : toi (majeur).** Aucune démarche préalable, aucun
statut à créer pour faire les premières ventes. Le point fiscal est traité au § 3 du
doc 02 : la micro-entreprise devient nécessaire quand l'activité devient régulière,
pas pour tester.

## Après la mise en ligne

1. Cocher les étapes 8, 10 et 16 dans ce tableau.
2. Suivre le calendrier du doc 10 à partir du **jour 4**.
3. Remplir `dist/suivi-ventes.csv` tous les jours.
4. Analyser chaque dimanche (doc 11).

## Informations qui manquent encore

| Information | Pourquoi elle est nécessaire | Quand |
|---|---|---|
| ~~Qui détient le compte~~ | ✅ **Réglé** — toi, tu es majeur | — |
| ~~Nom de boutique~~ | ✅ **Réglé** — Studio Récap | — |
| Disponibilité de `studiorecap` | Si le nom est pris sur Payhip ou TikTok, on bascule sur « Méthode Claire » | À l'inscription |
| L'URL de ta page produit | À mettre dans les bios TikTok / Instagram / Pinterest | Après l'étape 10 |
