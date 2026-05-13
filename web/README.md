# Landing Next.js — Jennie Lee (Flash Immobilier)

Application **Next.js 14 (App Router)**, **TailwindCSS**, **TypeScript**, formulaire d’estimation avec tracking (GTM, Meta Pixel, CAPI, GA4).

## Bibliothèques d’animation (dossier `web/`)

| Paquet | Usage |
|--------|--------|
| **framer-motion** | Déjà présent — animations dans les composants React client (`"use client"`). |
| **gsap** | Installé — animations impératives (timelines, ScrollTrigger si tu l’ajoutes). |
| **@gsap/react** | Hook **`useGSAP`** pour intégrer GSAP dans React avec cleanup correct au démontage. |

Les **skills GSAP** dans Cursor (`gsap-core`, `gsap-scrolltrigger`, `gsap-react`, etc.) s’appliquent quand tu écris ou demandes du code d’animation : l’agent les lit automatiquement si la tâche correspond.

### 21st.dev (Magic MCP dans Cursor)

Le serveur **@21st-dev/magic** sert à proposer ou raffiner des **composants React / UI**. Pour l’activer : **Cursor → Settings → MCP** et renseigner la clé créée sur [21st.dev Magic Console](https://21st.dev/magic/console) (souvent dans `~/.cursor/mcp.json` sous la forme documentée par 21st). Sans clé, les outils Magic ne peuvent pas appeler l’API.

## Prérequis

- Node.js 20+
- npm

## Installation

```bash
cd web
npm install
cp .env.example .env.local
```

Renseignez `.env.local` (voir ci-dessous). Remplacez `/public/jennie-lee-hero.jpg` par la **photo professionnelle** réelle (et `logo-flash.svg` par le logo officiel si disponible).

## Variables d’environnement

| Variable | Rôle |
|----------|------|
| `NEXT_PUBLIC_SITE_URL` | URL canonique du site (SEO / Open Graph), ex. `https://votre-domaine.vercel.app` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager (`GTM-XXXX`) |
| `NEXT_PUBLIC_GA4_ID` | Google Analytics 4 (`G-XXXX`) — charge `gtag` côté client |
| `NEXT_PUBLIC_META_PIXEL_ID` | Meta Pixel |
| `META_CAPI_ACCESS_TOKEN` | Jeton **serveur** Conversion API Meta (ne jamais exposer en `NEXT_PUBLIC_`) |
| `META_PIXEL_ID` | (Optionnel) ID Pixel côté serveur ; sinon réutilisation de `NEXT_PUBLIC_META_PIXEL_ID` |
| `NEXT_PUBLIC_GOOGLE_ADS_ID` | ID Google Ads pour conversion `gtag` |
| `NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL` | Libellé de conversion (suffixe après `/`) |
| `NEXT_PUBLIC_GOOGLE_PLACES_API_KEY` | Clé API Google Places (Autocomplete, restriction recommandée par domaine / IP) |
| `WEBHOOK_URL` | URL webhook (ex. Make.com) pour recevoir les leads en `POST` JSON |

## Scripts

```bash
npm run dev    # http://localhost:3000
npm run build
npm run start
```

## Déploiement Vercel

1. Importer le dépôt Git dans Vercel.
2. Définir **Root Directory** sur `web` si le repo contient aussi d’autres fichiers à la racine.
3. Ajouter les variables d’environnement dans **Project → Settings → Environment Variables**.
4. Déployer. Vérifier Lighthouse mobile (objectif : score supérieur à 90 sur les métriques principales).

## Structure utile

- `app/page.tsx` — assemblage des sections
- `app/api/lead/route.ts` — réception du formulaire, webhook, Meta CAPI
- `components/sections/*` — blocs de page
- `lib/validation.ts` — schémas Zod
- `lib/tracking.ts` — dataLayer, Pixel (Lead), scroll 50 % → ViewContent
- `lib/meta-capi.ts` — envoi événement Lead côté serveur (dédoublonnage avec `event_id` client)

## Numéro OACIQ

À compléter dans `components/sections/Footer.tsx` (placeholder `[À COMPLÉTER]`).

## Pages légales

Les liens du pied de page pointent vers des ancres (`#politique-confidentialite`, `#mentions-legales`) avec contenu réservé ; remplacez par de vraies routes ou PDF selon l’agence.
