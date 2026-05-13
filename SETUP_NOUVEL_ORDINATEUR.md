# Guide complet — Nouveau PC : projet, accès, Cursor, CLI

Document unique pour **réinstaller tout** : dépendances, **authentifications**, MCP, skills et CLI.  
**Ne commitez jamais** de clés, jetons ou `mcp.json` contenant des secrets.

---

## Accès — tableau récapitulatif

| Service | À quoi ça sert | Où créer / récupérer l’accès | Où c’est stocké sur la machine (après config) |
|--------|----------------|------------------------------|-----------------------------------------------|
| **Compte Cursor** | IDE + agent | [cursor.com](https://cursor.com) — connexion (email / SSO / etc.) | Session Cursor (pas dans ce repo) |
| **21st.dev Magic** | MCP : génération / suggestions de composants UI (`/ui`, etc.) | [21st.dev Magic Console](https://21st.dev/magic/console) — créer une **API key** | `~/.cursor/mcp.json` (entrée `@21st-dev/magic`) |
| **Google AI Studio (Gemini)** | MCP **Nano Banana Pro** : génération / édition / analyse d’images via Gemini | [aistudio.google.com/apikey](https://aistudio.google.com/apikey) — clé **GEMINI_API_KEY** | `~/.cursor/mcp.json` (`env.GEMINI_API_KEY` pour `nano-banana-pro`) |
| **Higgsfield (compte web)** | Produits Higgsfield + CLI alignée sur votre compte | [higgsfield.ai](https://higgsfield.ai) — inscription / connexion | Après `higgsfield auth login` : jetons gérés **localement** par la CLI (répertoire utilisateur ; pas dans le projet — voir doc CLI `higgsfield auth --help`) |
| **npm / nexus public** | Installer paquets (`gsap`, `vite`, etc.) | Aucun compte pour les paquets publics | Cache npm (`~/.npm`) |
| **Git (si dépôt privé)** | Cloner / pousser le projet | Clés SSH (`~/.ssh`) ou **Personal Access Token** (GitHub/GitLab, etc.) | `~/.ssh` ou gestionnaire d’identifiants Git |

**Pas de clé API pour :** installation des **skills** GSAP (`greensock/gsap-skills`) et **Higgsfield** (`higgsfield-ai/skills`) — dépôts publics ; en revanche **utiliser** certaines capacités Higgsfield peut nécessiter un **compte + CLI authentifiée**.

---

## Ordre recommandé sur un nouveau PC

1. Installer **Node.js LTS** → vérifier `node -v`, `npm -v`.
2. Installer **Cursor** → se connecter avec votre **compte Cursor**.
3. Cloner ou copier le **dossier du projet** → `npm install` → `npm run dev`.
4. Créer les **clés** (21st, Gemini si besoin) sur les sites ci-dessus.
5. Configurer **`~/.cursor/mcp.json`** (CLI 21st **ou** édition manuelle — § suivant).
6. **Redémarrer Cursor** ; vérifier **Paramètres → MCP** : serveurs au vert.
7. (Optionnel) `npx skills add` pour **GSAP** global et **Higgsfield** dans le projet ; réparer les liens `.cursor/skills` (§ Fichiers projet).
8. (Optionnel) `npm install -g @higgsfield/cli` puis **`higgsfield auth login`** (navigateur ou URL `device`).

---

## 1. Prérequis

| Outil | Rôle |
|--------|------|
| **Node.js** LTS (v20 ou v22) | [nodejs.org](https://nodejs.org) ou `nvm` / `fnm` / Homebrew |
| **Git** | Clone / sauvegarde du repo |
| **Cursor** | Éditeur + agent + MCP |

```bash
node -v
npm -v
```

---

## 2. Projet — dépendances et scripts

```bash
cd /chemin/vers/alex-rizk-landing   # adaptez
npm install
npm run build    # vérifie TypeScript + Vite
npm run dev      # http://localhost:5173 en général
```

**Paquets utiles (déjà dans `package.json`) :** `react`, `vite`, `typescript`, `framer-motion`, `gsap`, `@gsap/react`.

---

## 3. Fichiers qui voyagent **avec le projet**

| Chemin | Rôle |
|--------|------|
| `.cursor/rules/landing-project.mdc` | Règle Cursor (stack landing) |
| `AGENTS.md` | Mémo projet |
| `.agents/skills/higgsfield-*` | Sources des skills Higgsfield |
| `.cursor/skills/` | Liens vers `.agents/skills/` (macOS/Linux) |

**Après copie sous Windows :** recréer les liens ou copier les dossiers — voir § 7 du présent fichier (historique). Commandes équivalentes :

```bash
mkdir -p .cursor/skills
ln -sfn ../../.agents/skills/higgsfield-generate .cursor/skills/higgsfield-generate
ln -sfn ../../.agents/skills/higgsfield-marketplace-cards .cursor/skills/higgsfield-marketplace-cards
ln -sfn ../../.agents/skills/higgsfield-product-photoshoot .cursor/skills/higgsfield-product-photoshoot
ln -sfn ../../.agents/skills/higgsfield-soul-id .cursor/skills/higgsfield-soul-id
```

---

## 4. Cursor MCP — fichier global `~/.cursor/mcp.json`

Emplacement courant :

- **macOS / Linux :** `~/.cursor/mcp.json`
- **Windows :** dossier utilisateur Cursor (voir [documentation Cursor — MCP](https://cursor.com/docs))

Ce fichier **ne doit pas** être commité avec de vraies clés.

### 4.1 — 21st.dev Magic (accès composants UI)

1. Connectez-vous sur **21st.dev** si nécessaire.
2. **Console :** [21st.dev/magic/console](https://21st.dev/magic/console) → générer une **API key**.
3. Installer la config Cursor :

```bash
npx @21st-dev/cli@latest install cursor --api-key VOTRE_CLE_ICI
```

Cela écrit / fusionne **`~/.cursor/mcp.json`**. En cas de **nouvelle clé**, refaire cette commande ou remplacer la valeur dans le JSON.

### 4.2 — Nano Banana Pro (images Gemini)

1. **Google AI Studio :** [aistudio.google.com/apikey](https://aistudio.google.com/apikey) → créer **`GEMINI_API_KEY`**.
2. Ajouter dans **`mcpServers`** (sans supprimer `@21st-dev/magic`) :

```json
"nano-banana-pro": {
  "command": "npx",
  "args": ["-y", "@easyuseai/nano-banana-pro-mcp"],
  "env": {
    "GEMINI_API_KEY": "COLLEZ_VOTRE_CLE_GEMINI"
  }
}
```

Documentation du package : [easy-to-use-ai/nano-banana-pro-mcp](https://github.com/easy-to-use-ai/nano-banana-pro-mcp).

### 4.3 — Exemple de `mcp.json` combinant les deux

Adaptez ; la ligne exacte pour 21st peut être celle produite par le **CLI** (préférable) :

```json
{
  "mcpServers": {
    "@21st-dev/magic": {
      "command": "npx",
      "args": [
        "-y",
        "@21st-dev/magic@latest",
        "API_KEY=\"REMPLACEZ_PAR_VOTRE_CLE_21ST\""
      ]
    },
    "nano-banana-pro": {
      "command": "npx",
      "args": ["-y", "@easyuseai/nano-banana-pro-mcp"],
      "env": {
        "GEMINI_API_KEY": "REMPLACEZ_PAR_VOTRE_CLE_GEMINI"
      }
    }
  }
}
```

Puis **redémarrer Cursor** et vérifier **Réglages → Fonctionnalités → MCP** (noms peuvent varier selon la version).

---

## 5. Skills GSAP (tous projets, sans clé API)

```bash
npx skills add https://github.com/greensock/gsap-skills
```

Alternative : cloner [greensock/gsap-skills](https://github.com/greensock/gsap-skills) et copier chaque sous-dossier de `skills/` dans **`~/.cursor/skills/`**.

---

## 6. Skills Higgsfield (ce repo)

À la racine du projet :

```bash
npx skills add higgsfield-ai/skills
```

Puis liens **`.cursor/skills`** → **`.agents/skills`** comme au §3.

**Évaluation risque :** [skills.sh/higgsfield-ai/skills](https://skills.sh/higgsfield-ai/skills) — lire avant usage.

---

## 7. CLI Higgsfield — installation et **accès compte**

```bash
npm install -g @higgsfield/cli
higgsfield auth login
```

- Ouvre le navigateur ou affiche une URL du type **`https://higgsfield.ai/device?code=...`** → valider avec votre **compte Higgsfield**.
- L’état « connecté » est stocké **hors du dépôt Git** (machine locale).

Vérifications utiles (selon version de la CLI) :

```bash
higgsfield --help
higgsfield auth --help
```

---

## 8. Checklist « autre PC » (avec accès)

- [ ] Compte **Cursor** actif
- [ ] **Node** + `npm install` + `npm run dev` OK dans le projet
- [ ] Clé **21st** créée sur la console → `npx @21st-dev/cli ... install cursor --api-key ...` **ou** `mcp.json` édité à la main
- [ ] (Optionnel) Clé **Gemini** → entrée `nano-banana-pro` dans `mcp.json`
- [ ] **Redémarrage Cursor** ; MCP **connectés**
- [ ] (Optionnel) Skills **GSAP** + **Higgsfield** + liens `.cursor/skills`
- [ ] (Optionnel) **`higgsfield auth login`** sur cette machine
- [ ] (Si repo privé) **SSH** ou **token Git** configuré

---

## 9. Sauvegarde avant changement de PC (accès)

- **À copier chiffré ou à régénérer :** clés **21st**, **Gemini**, compte **Higgsfield** (plutôt **refaire `auth login`** que copier des jetons à la main si vous n’êtes pas sûr).
- **À versionner sans secrets :** projet + `SETUP_NOUVEL_ORDINATEUR.md` + `.cursor/rules` + `AGENTS.md` + `.agents/skills` si vous acceptez le contenu des skills dans le dépôt.
- **Ne pas** pousser sur Git : **`~/.cursor/mcp.json`** avec clés en clair.

---

## 10. Sécurité

- Toute clé montrée dans un chat, une capture ou un dépôt public doit être **révoquée / régénérée**.
- Préférer **regénérer** les clés 21st et Gemini sur la nouvelle machine plutôt que les envoyer par messagerie en clair.

---

## 11. Fichiers de référence dans ce repo

| Fichier | Rôle |
|---------|------|
| **`AGENTS.md`** | Résumé technique court |
| **`.cursor/rules/landing-project.mdc`** | Règle Cursor du workspace |
| **`SETUP_NOUVEL_ORDINATEUR.md`** | Ce guide (accès + installation) |

Mettre à jour ce guide quand vous ajoutez un nouveau service (nouveau MCP, nouveau compte).
