# AI Studio (ODS prototype)

A React + TypeScript reimplementation of the **AI Studio** agent-management
portal, restyled to follow the navigational structure and visual design system
from the **Instrument Design System** (Figma file *"PL-3491 PAT ODS updates"*).

## What this is

The source app (`/ui/dashboard` on the `core-poc` environment) is a Java/HTMX
admin portal for managing AI agents that operate against a STEP (PIM)
instance. This project keeps its information architecture and content —
Dashboard, Agents, Templates, Skills, Tools, Playground, Audit — but rebuilds
every screen as a client-side React app using the layout shell, color/type
tokens, table, tab, and pill patterns captured from the Figma design system
(teal global header, left side-navigation, bordered data tables, Noto Sans
type ramp).

Since the source dashboard is a live, authenticated internal environment,
content shown here is **realistic static/mock data** captured from the public
pages of that instance (agent definitions, templates, tool catalogs, run
history) — there is no live backend. "Run" actions in the Agent detail and
Playground pages simulate a response after a short delay so the interaction
patterns can be exercised end-to-end.

## Pages

- **Dashboard** — usage metrics (runs, tokens, latency, active agents), agent
  usage breakdown, run-activity chart, connected toolkits.
- **Agents** — catalog list + detail view with tabs (Definition, Activation,
  Run & Conversations, Runs & History).
- **Templates** — pre-built agent templates, with a detail view and
  "Add to Agents" action.
- **Skills** — `SKILL.md`-style capability folders agents can include.
- **Tools** — registered MCP toolkits and the tools each one exposes.
- **Playground** — run a model directly with a system prompt, input,
  temperature, and max tokens.
- **Audit** — platform-wide run history.

## Design system

Design tokens (color, typography, spacing) were extracted from the Figma file
and live in `src/styles/tokens.css` as CSS custom properties — no CSS
framework is used, matching the source design system's plain, token-driven
approach. Shared UI primitives (`DataTable`, `Tabs`, `Pill`, `MetricCard`,
`Field`, `Button`) live under `src/components/ui`.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (defaults to `http://localhost:5173`).

### Other scripts

```bash
npm run build     # type-check + production build
npm run preview   # preview the production build locally
npm run lint       # oxlint
```

## Project structure

```
src/
  components/
    layout/     # Header, SideNav, AppLayout
    ui/         # DataTable, Tabs, Pill, MetricCard, Field, Button, ActivityChart
    icons.tsx
  data/         # mock data mirroring the source AI Studio content
  pages/        # one file/folder per route
  styles/       # design tokens + global styles
```
