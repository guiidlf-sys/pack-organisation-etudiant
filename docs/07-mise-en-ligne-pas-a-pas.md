# Étapes 8 à 11 — Mettre la boutique en ligne (à faire par toi)

> C'est **la seule partie que je ne peux pas faire à ta place** : créer un compte
> demande une adresse e-mail, une identité et une vérification bancaire.
> Tout le contenu à coller est déjà écrit dans les autres documents.
> Compte **45 minutes** en tout.

## Avant de commencer — la checklist

- [ ] Une adresse e-mail (celle du parent/tuteur si tu es mineur — voir doc 02)
- [ ] Un compte PayPal **ou** Stripe au nom de la personne majeure titulaire
- [ ] Les 2 PDF : `dist/Pack_Organisation_Etudiant_2026_2027.pdf` et `..._TABLETTE.pdf`
- [ ] Les 8 images : `dist/images/boutique/`
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

## 3. Créer le produit — 15 min

*Products → Add new product → **Digital product***

| Champ | Quoi mettre |
|---|---|
| Product name | le titre du doc 04 |
| Price | **3.99** EUR |
| Description | la description détaillée du doc 04 (Payhip accepte la mise en forme) |
| Files | **les 2 PDF** |
| Cover image | `01-miniature.png` |
| Images supplémentaires | `02` à `08`, dans l'ordre |
| Tags | les mots-clés du doc 04 |

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
