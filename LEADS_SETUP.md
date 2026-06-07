# Formulaires → courriel + SMS avec Make.com

Les pages `evaluation-montreal.html` et `index.html` envoient chaque soumission en **JSON** vers un **webhook Make**. Make se charge d’envoyer le **courriel** et le **SMS** — sans Vercel ni code serveur.

---

## 1. Créer le scénario Make

1. [make.com](https://www.make.com) → **Create a new scenario**.
2. **Module 1 — Webhooks → Custom webhook**
   - Cliquez **Add** pour créer le webhook.
   - Copiez l’**URL** (ex. `https://hook.eu2.make.com/…`).
   - Collez-la dans **`lead-config.js`** :

```javascript
window.LEAD_CONFIG = {
  webhookUrl: "https://hook.eu2.make.com/VOTRE_URL",
};
```

3. **Déterminez la structure** : dans Make, cliquez **Run once**, puis sur le site remplissez un formulaire test (ou utilisez le curl ci-dessous). Make affichera les champs reçus.

```bash
curl -X POST "https://hook.eu2.make.com/VOTRE_URL" \
  -H "Content-Type: application/json" \
  -d '{"intent":"sell","prenom":"Test","telephone":"8195551234","adresse":"123 rue Test, Gatineau","typePropriete":"Maison","quandVendre":"Moins de 3 mois","page_url":"https://example.com"}'
```

---

## 2. Préparer Resend (courriel)

1. [resend.com](https://resend.com) → **API Keys** → **Create API Key** → copiez `re_…` (une seule fois visible).
2. **En test** : expéditeur `onboarding@resend.dev` — les courriels partent **uniquement** vers l’adresse de votre compte Resend.
3. **En production** : **Domains** → ajoutez votre domaine → enregistrez les DNS → utilisez  
   `FlashImmobilier <notifications@votredomaine.com>`.

Gardez la clé API pour le module Make (étape 4b).

---

## 3. Préparer Twilio (SMS)

1. [console.twilio.com](https://console.twilio.com) → **Phone Numbers** → **Buy a number** (Canada, capacité **SMS**).
2. Notez :
   - **Account SID** et **Auth Token** (page d’accueil console)
   - Le numéro acheté au format `+1…` (ex. `+16135551234`)
3. Ajoutez un peu de crédit si demandé (carte).
4. **To** pour vous notifier : `+18733535386` (votre cellulaire).

---

## 4. Module courriel dans Make

### Option A — Resend (recommandé si vous avez déjà un compte)

**Module 2 — HTTP → Make a request**

| Champ | Valeur |
|--------|--------|
| URL | `https://api.resend.com/emails` |
| Method | `POST` |
| Headers | `Authorization` = `Bearer re_VOTRE_CLE` |
| | `Content-Type` = `application/json` |
| Body type | Raw / JSON |

Corps JSON (mappez les `{{1.xxx}}` depuis le module Webhook) :

```json
{
  "from": "FlashImmobilier <onboarding@resend.dev>",
  "to": ["jennieleedesbiens@gmail.com"],
  "subject": "Nouveau lead {{1.intent}} — {{1.prenom}}",
  "text": "Projet: {{1.intent}}\nPrénom: {{1.prenom}}\nTél: {{1.telephone}}\nCourriel: {{1.email}}\nAdresse: {{1.adresse}}\nType: {{1.typePropriete}}\nHorizon: {{1.quandVendre}}\nSecteur: {{1.secteur}}\nBudget: {{1.budget}}\nPage: {{1.page_url}}"
}
```

*(Remplacez `from` par votre domaine vérifié en production.)*

### Option B — Gmail (plus simple, sans Resend)

**Module 2 — Gmail → Send an email** (ou Outlook, etc.)

| Champ | Valeur suggérée |
|--------|------------------|
| **To** | `jennieleedesbiens@gmail.com` |
| **Subject** | `Nouveau lead {{1.intent}} — {{1.prenom}}` |
| **Content** | Texte avec les champs du webhook (voir ci-dessous) |

**Corps du message (exemple)** — mappez les champs depuis le module Webhook :

```
Projet : {{1.intent}}
Prénom : {{1.prenom}}
Téléphone : {{1.telephone}}
Courriel : {{1.email}}

{{if(1.intent = "sell"; "
Adresse : " & 1.adresse & "
Type : " & 1.typePropriete & "
Horizon : " & 1.quandVendre; "
Secteur : " & 1.secteur & "
Budget : " & 1.budget & "
Délai : " & 1.quandAcheter & "
Pré-approbation : " & 1.preapproval)}}

Page : {{1.page_url}}
```

*(Adaptez la formule selon l’interface Make — vous pouvez aussi tout mettre en lignes simples sans `if`.)*

---

## 5. Module SMS (Twilio dans Make)

**Module 3 — Twilio → Create a Message**

1. Connectez votre compte **Twilio** (numéro canadien + crédits).
2. **To** : `+18733535386` (votre cellulaire, format international).
3. **From** : votre numéro Twilio.
4. **Body** (court) :

```
FlashImmobilier {{1.intent}}: {{1.prenom}} {{1.telephone}}
```

Pour **Vente**, ajoutez l’adresse ; pour **Achat**, le secteur — selon vos modules Make (filtre ou texte combiné).

---

## 6. Activer et publier le site

1. Make : **ON** sur le scénario (interrupteur en bas).
2. Git : commitez `lead-config.js` avec la vraie URL webhook.
3. GitHub Pages : les formulaires enverront vers Make à chaque clic.

---

## Champs JSON envoyés par le site

| Champ | Vente | Achat |
|--------|:-----:|:-----:|
| `intent` | `sell` | `buy` |
| `prenom` | ✓ | ✓ |
| `telephone` | ✓ | ✓ |
| `email` | optionnel | optionnel |
| `adresse` | ✓ | — |
| `typePropriete` | ✓ | ✓ |
| `quandVendre` | ✓ | — |
| `secteur` | — | ✓ |
| `budget` | — | ✓ |
| `quandAcheter` | — | ✓ |
| `preapproval` | — | optionnel |
| `page_url`, `utm_*`, `referrer`, `submitted_at` | meta | meta |

`index.html` envoie aussi : `nom`, `adresse`, `typePropriete`, `quandVendre`, `intent`.

---

## Dépannage

| Problème | Solution |
|----------|----------|
| « Configuration en cours » | `webhookUrl` vide dans `lead-config.js` |
| Make ne reçoit rien | Scénario **activé** ; URL exacte ; test avec `curl` |
| Erreur CORS dans la console | Mettez à jour Make ; testez en navigation privée ; contactez Make si le webhook bloque le navigateur — dans ce cas rare, ajoutez un module **Router** ou utilisez le proxy Make « Gateway » |
| Pas de SMS | Vérifiez Twilio dans Make (solde, numéro `From`, `To` en +1…) |
| Spam | Champ piège `website` (doit rester vide) — ignorez-le dans Make |

---

## Coûts indicatifs

- **Make** : plan gratuit limité (opérations/mois) ; souvent suffisant au début.
- **Twilio** (SMS) : ~1–2 $/mois + quelques centimes par SMS.
- **Gmail** dans Make : gratuit si vous utilisez votre compte Google.

Aucun compte Vercel requis.
