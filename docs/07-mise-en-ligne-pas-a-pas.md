# Étapes 8 à 11 — Mettre la boutique en ligne (à faire par toi)

> C'est **la seule partie que je ne peux pas faire à ta place** : créer un compte
> demande une adresse e-mail, une identité et une vérification bancaire.
> Tout le contenu à coller est déjà écrit dans les autres documents.
> Compte **45 minutes** en tout.

## Avant de commencer — la checklist

- [ ] Ton adresse e-mail
- [ ] Un compte PayPal **ou** Stripe à ton nom (créé pendant l'inscription si tu n'en as pas)
- [ ] Une pièce d'identité à portée de main (vérification Stripe/PayPal)
- [ ] Les 6 PDF de `dist/` (3 formules × impression + tablette)
- [ ] Les 10 images : `dist/images/boutique/`
- [ ] Le logo : `dist/images/marque/logo-carre.png`
- [ ] Les textes : doc 03 (boutique) et doc 04 (fiche produit)

---

## 1. Créer le compte — 5 min

1. Aller sur **payhip.com** → *Sign up*.
2. E-mail + mot de passe. Offre **Free** (0 €/mois, 5 % par vente). Ne prends aucune
   offre payante : à ce stade elles coûtent plus cher qu'elles ne rapportent.
3. Confirmer l'adresse e-mail.

## 2. Régler la boutique — 10 min

*Settings → Store / Account*

| Champ | Quoi mettre |
|---|---|
| Store name | **Studio Récap** (ou l'alternative dispo, doc 03) |
| Store URL | `payhip.com/studiorecap` |
| Logo | `dist/images/marque/logo-carre.png` |
| Description | le texte du doc 03 |
| Devise | **EUR (€)** |
| Pays | France |

*Settings → Payments* : connecter **PayPal** ou **Stripe** (les deux si possible : certains
clients n'ont pas de PayPal, d'autres n'aiment pas payer par carte). La vérification
d'identité est demandée ici — c'est normal.

*Settings → Tax / VAT* : activer la collecte automatique de la **TVA UE**.

## 3. Créer les produits — 25 min

**Commence par COMPLETE** : c'est celui que tu mettras dans toutes les vidéos. Les deux
autres se dupliquent ensuite en trois minutes chacun.

*Products → Add new product → **Digital product***

| Champ | COMPLETE | BASIC | ULTIMATE |
|---|---|---|---|
| Product name | titre COMPLETE (doc 04) | titre BASIC | titre ULTIMATE |
| Price | **3.99** EUR | **2.99** EUR | **7.99** EUR |
| Description | doc 04 | doc 04 § BASIC | doc 04 § ULTIMATE |
| Files | `..._2027.pdf` + `..._TABLETTE.pdf` | `..._BASIC.pdf` + `..._BASIC_TABLETTE.pdf` | `..._ULTIMATE.pdf` + `..._ULTIMATE_TABLETTE.pdf` |
| Cover image | `01-miniature.png` | `09-trois-formules.png` | `10-pages-bonus.png` |
| Images suivantes | `02` → `09` | `07`, `08` | `07`, `09`, `08` |
| Tags | mots-clés du doc 04 | idem | idem |

⚠️ **Vérifie deux fois les fichiers attachés à chaque produit.** Livrer le mauvais PDF est
l'erreur la plus fréquente — et la plus coûteuse en confiance.

Réglages complémentaires :

- limite de téléchargements : **5** ;
- message post-achat : le texte du doc 06 ;
- **Publier**.

## 4. Créer le code promo — 2 min

*Coupons → Add coupon* : code `RENTREE`, **−20 %**, expiration dans 15 jours.

## 5. Tester la chaîne complète — 10 min ⚠️ à ne pas sauter

1. Créer un coupon temporaire **−100 %** (code `TESTMOI`).
2. Ouvrir ta page produit **dans une fenêtre de navigation privée**, comme un client.
3. Passer commande avec le coupon.
4. Vérifier : la page de confirmation affiche bien les liens ; l'e-mail arrive ; les
   **2 PDF** se téléchargent et s'ouvrent.
5. **Supprimer le coupon `TESTMOI`.**

Tant que ce test n'est pas passé, ne lance aucune vidéo. Envoyer du monde vers un tunnel
cassé, c'est perdre ses premiers clients — et on n'a qu'une seule première impression.

## 6. Préparer le lien - 3 min

L'adresse de la page produit ressemblera à `payhip.com/b/xxxxx`.
Elle va dans :

- la **bio TikTok** ;
- la **bio Instagram** ;
- la description de chaque épingle **Pinterest**.

## Quand c'est fait

Coche l'étape 3 dans `docs/00-ETAT-DU-PROJET.md` et passe au **jour 4** du calendrier
(doc 10) : la première vidéo.
