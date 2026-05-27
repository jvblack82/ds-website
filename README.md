# Dreamscope Consulting website

Marketing site for Dreamscope Consulting (Joe Black, Ho Chi Minh City). Two practices, one operator mindset:

- **The Culture Engine.** AI-powered culture diagnostics for scaling companies (`/culture-engine`).
- **AI Maestro.** Training AI to do expert work (`/ai-maestro`).
- **Landing.** Routes visitors to either practice (`/`).

## Stack

Vite, React 18, TypeScript, Tailwind, shadcn-ui. Deployed to [dreamscope.win](https://dreamscope.win) via Vercel (auto-deploy from `main`).

## Local development

```sh
npm install
npm run dev
```

Dev server runs on http://localhost:8080.

## Build

```sh
npm run build      # production build to dist/
npm run preview    # preview the production build locally
```

## Lead capture

Both practice pages link out to live discovery forms hosted separately:

- `discovery.dreamscope.win/ai_maestro`
- `discovery.dreamscope.win/culture`

These post to an n8n workflow on the Dreamscope VPS. The site only links to them; no form code lives in this repo.
