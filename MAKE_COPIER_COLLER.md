# Make.com — scénario à recréer en 10 minutes

Créez un scénario avec **3 modules** dans cet ordre. Branchez Resend et Twilio **dans Make** (pas sur le site).

---

## Module 1 — Webhook

- **Webhooks** → **Custom webhook**
- Créer → copier l’URL → `lead-config.secret.js` → `webhookUrl`
- **Run once** (le scénario attend une donnée)

---

## Module 2 — Resend (HTTP)

- **HTTP** → **Make a request**

| Paramètre | Valeur |
|-----------|--------|
| URL | `https://api.resend.com/emails` |
| Method | POST |
| Headers | `Authorization` : `Bearer VOTRE_CLE_RE_SEND` |
| | `Content-Type` : `application/json` |
| Body type | Raw |
| Request content | JSON ci-dessous |

Cliquez dans les champs `{{...}}` pour choisir les données du **module 1** :

```json
{
  "from": "FlashImmobilier <onboarding@resend.dev>",
  "to": ["jennieleedesbiens@gmail.com"],
  "subject": "Nouveau lead {{1.intent}} — {{1.prenom}}",
  "text": "Projet: {{1.intent}}\nPrénom: {{1.prenom}}\nTél: {{1.telephone}}\nCourriel: {{1.email}}\nAdresse: {{1.adresse}}\nType: {{1.typePropriete}}\nHorizon vente: {{1.quandVendre}}\nSecteur: {{1.secteur}}\nBudget: {{1.budget}}\nDélai achat: {{1.quandAcheter}}\nPré-approbation: {{1.preapproval}}\nPage: {{1.page_url}}\nDate: {{1.submitted_at}}"
}
```

**Test Resend** : en `onboarding@resend.dev`, le destinataire `to` doit être l’email de votre compte Resend tant que le domaine n’est pas vérifié.

---

## Module 3 — Twilio (SMS)

- **Twilio** → **Create a Message**
- Connexion : Account SID + Auth Token
- **From** : votre numéro Twilio (`+1…`)
- **To** : `+18733535386`
- **Body** :

```
FlashImmobilier {{1.intent}}: {{1.prenom}} {{1.telephone}}
```

---

## Activer

1. **Save** le scénario
2. Interrupteur **ON**
3. Terminal : `./scripts/test-lead-webhook.sh "VOTRE_URL_WEBHOOK"`

---

## Ce qui ne va PAS dans le site Git

| Secret | Où le mettre |
|--------|----------------|
| Clé Resend `re_…` | Module HTTP Make uniquement |
| Twilio SID / Token | Connexion module Twilio Make |
| URL webhook | `lead-config.secret.js` (ok, semi-privé) |
