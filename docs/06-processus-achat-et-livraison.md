# Étape 13 — Processus d'achat et livraison automatique

## Le parcours du client, de bout en bout

```
1. Le client voit une vidéo TikTok
        ↓  lien dans la bio
2. Il arrive sur la page produit Payhip
        ↓  images + description
3. Il clique sur « Acheter »
        ↓
4. Il paie (carte via Stripe, ou PayPal)
        ↓  Payhip confirme le paiement
5. La page de confirmation affiche le lien de téléchargement  ← immédiat
        ↓  ET un e-mail automatique part avec le même lien
6. Il télécharge les 2 PDF
        ↓
7. Il imprime, ou ouvre le fichier tablette dans son appli de notes
```

**Tu n'as rien à faire entre l'étape 3 et l'étape 7.** C'est le point le plus important
de ce montage : la vente fonctionne pendant que tu dors, pendant les cours, pendant les
vacances. Aucun fichier n'est envoyé à la main.

## Ce que ça implique côté réglages

| Réglage Payhip | Valeur | Pourquoi |
|---|---|---|
| Type de produit | Digital download | Active la livraison automatique |
| Fichiers attachés | les **2** PDF | Le client reçoit l'impression **et** la tablette |
| Limite de téléchargements | 5 (ou illimité) | Évite qu'un lien partagé serve à 200 personnes, sans bloquer un client qui change de téléphone |
| E-mail de confirmation | activé | Le client retrouve son lien même s'il ferme la page |
| TVA UE | activée | Payhip collecte et reverse la TVA à ta place |
| Devise | EUR | Public français |

## Le message après achat (à coller dans Payhip)

> **Merci pour ta commande ! 💜**
>
> Tes 2 fichiers sont juste en dessous :
> — la version **impression** (A4, à imprimer) ;
> — la version **tablette** (avec navigation cliquable).
>
> **Pour imprimer :** choisis A4, « taille réelle » ou 100 % — pas « ajuster à la page ».
> **Sur tablette :** ouvre le fichier TABLETTE dans GoodNotes, Notability, Xodo ou
> Samsung Notes, puis écris dessus au stylet.
>
> Un souci pour télécharger ? Réponds à cet e-mail, je m'en occupe.
>
> Bonne organisation !
> **Studio Récap**

## Ce qui peut mal se passer (et quoi répondre)

| Problème du client | Réponse |
|---|---|
| « Je n'ai pas reçu l'e-mail » | Vérifier les spams, puis renvoyer le lien depuis le tableau de bord Payhip |
| « Le PDF s'imprime trop petit » | Décocher « ajuster à la page », choisir 100 % / taille réelle |
| « Je n'ai pas d'imprimante » | La version tablette est incluse, elle se remplit au stylet |
| « Je peux le modifier ? » | Non : le PDF n'est pas éditable, il se remplit à la main ou au stylet. C'est écrit sur la fiche produit. |
| Demande de remboursement | Le produit est numérique et téléchargé. Rester poli, proposer d'abord de résoudre le problème technique. Rembourser sur un vrai souci : un avis négatif coûte plus cher que 3,99 €. |

Prépare ces réponses maintenant : quand le premier message arrive, tu réponds en deux
minutes au lieu de paniquer.
