# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A single-page personal portfolio for Kenneth John B. Bolilan (Next.js 14 App Router, TypeScript, Tailwind, Framer Motion), built from his resume and intended for deployment to Vercel via GitHub. All sections live on one scrollable page with anchor navigation — there is no second route.

## Commands

```bash
npm run dev     # dev server (see port note below)
npm run build   # production build — also runs lint + typecheck
npm run lint    # eslint only
npx tsc --noEmit  # typecheck only (fastest feedback loop)
```

There is no test suite configured — `npm run build` and `npx tsc --noEmit` are the verification gates.

## Environment gotchas

These will waste significant time if unknown. All were hit during development on this machine.

**Node version.** The global Node is 16.17.1, which Next.js 14 refuses to run (`>= v18.17.0` required). nvm-windows has newer versions installed but the global symlink points at 16. Prefix commands for the current shell only rather than changing the user's global setting:

```bash
export PATH="/c/Users/ihs004/AppData/Roaming/nvm/v20.19.4:$PATH"
```

**Stop the dev server before `npm run build`.** On Windows the running dev server holds a lock on `.next/trace`, and a concurrent build fails with `EPERM: operation not permitted`. Worse, a partial build corrupts the dev server's route manifest and it starts returning 404s until restarted. Kill the listener first (`netstat -ano | grep ":3001" | grep LISTENING`, then `taskkill //PID <pid> //F`), and `rm -rf .next` if a build was interrupted.

**Port 3000 is occupied by something else on this machine**, so `next dev` falls back to **3001**. Don't assume 3000.

**A corporate proxy (`HTTP_PROXY`/`HTTPS_PROXY` → `hrdproxy.hrd-s.com:81`) intercepts localhost requests.** `curl http://localhost:3001` returns a squid 502/503 error page, not your app. Always pass `--noproxy '*'`, and `unset HTTP_PROXY HTTPS_PROXY http_proxy https_proxy` before running anything that drives a browser.

## Architecture

### Content is data, not JSX

`lib/data.ts` is the single source of truth for every piece of résumé content (`personalInfo`, `contactInfo`, `skills`, `experience`, `education`, `navLinks`), typed by `lib/types.ts`. Section components import from it and map over it; they don't hardcode copy. To change what the site says, edit `lib/data.ts` — not the components.

`navLinks` hrefs must stay in sync with the `id` props passed to `SectionWrapper` in each section, because both the anchor nav and the Navbar's IntersectionObserver-based active-link highlighting key off those ids.

Skill icons are referenced by *string name* in `lib/data.ts` and resolved through the explicit lookup table in `components/ui/icon-map.tsx`. This keeps `react-icons` imports tree-shakeable. If you add a skill, add its icon to that map too — `getIcon` returns `null` for unknown names and the pill silently renders without an icon. Note that `react-icons/si` has no Microsoft SQL Server glyph; MS SQL uses `TbSql` from the Tabler set.

### Theming: CSS custom properties, not Tailwind's `dark:` variant

Colors are defined as space-separated RGB channel triples on `:root` in `app/globals.css`, overridden under `:root[data-theme="light"]`. `tailwind.config.ts` bridges them with `rgb(var(--accent) / <alpha-value>)`, which is what makes `bg-accent/10` and `text-muted` work while remaining theme-reactive.

**`next-themes` is configured with `attribute="data-theme"`, so no `.dark` class is ever applied.** `darkMode: "class"` in the Tailwind config is therefore vestigial — a `dark:` utility would never activate. No component currently uses one; don't introduce them. Add or change colors by editing the CSS variables, and they propagate everywhere automatically.

Anything reading theme colors from JavaScript (currently the canvas in `ParticleNetwork`) must read `--accent` via `getComputedStyle` and re-read on theme change — that component uses a `MutationObserver` on `data-theme` to do so.

### Motion system

Shared Framer Motion variants and easing live in `lib/constants.ts` (`fadeUp`, `fadeIn`, `scaleIn`, `staggerContainer`). Use these rather than defining per-component timings, so reveals feel consistent.

`components/ui/Reveal.tsx` is the standard scroll-reveal wrapper (`whileInView` with `viewport={{ once: true }}`). Sections that need staggered children set up their own `motion.div` with `staggerContainer()` and give children the `fadeUp` variant.

### Reduced motion — read before "fixing" this

**Do not re-add `useReducedMotion()` guards to the cursor-driven effects, and do not restore a blanket `@media (prefers-reduced-motion: reduce)` rule in `globals.css`.**

This machine reports `prefers-reduced-motion: reduce` (Windows "Show animations" is off; `SPI_GETCLIENTAREAANIMATION` returns False). An earlier version gated every interactive effect behind that check plus a global CSS rule zeroing all `animation-duration`. The result was that the particle mouse interaction, 3D tilt, magnetic buttons, custom cursor, and several CSS keyframe animations were all silently dead in the owner's browser — which read as "the effects don't work" and "the design looks too simple" across several review rounds.

The deliberate decision: these effects are *input-driven* (they only move while the pointer moves, and stop instantly when it does), so they run regardless of the OS preference. This is an intentional override of an accessibility preference, made for the site owner's own portfolio. If stricter behavior is wanted later, the agreed path is a user-facing motion toggle in the navbar defaulting to the OS setting — not reinstating the silent gates.

### Client/server boundary

`app/page.tsx` and `app/layout.tsx` are server components that compose client components. Anything using Framer Motion hooks, canvas, or browser events needs `"use client"` — which in practice is most of `components/`. Keep data-only helpers in `lib/` free of the directive.

`CustomCursor` is mounted once in `app/layout.tsx` so it applies site-wide. It only activates on `(pointer: fine)` devices and toggles a `cursor-none-desktop` class on `<body>` (defined in `globals.css`) to hide the native cursor.

## Verifying UI changes in a real browser

There is no `chromium-cli` here and Playwright's browser download goes through the corporate proxy. Drive the **already-installed** Chrome with `playwright-core` instead — install it in the scratchpad directory, not the project:

```js
const { chromium } = require("playwright-core");
const browser = await chromium.launch({
  executablePath: "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
  headless: true,
  args: ["--no-sandbox", "--no-proxy-server"],
});
// Emulate the owner's actual machine setting when checking motion behavior:
const context = await browser.newContext({ reducedMotion: "reduce" });
```

**Never `waitUntil: "networkidle"`** — the Next dev server's HMR websocket keeps the connection open and navigation times out. Use `domcontentloaded` then `waitForSelector`.

For canvas/animation work, assert behavior rather than eyeballing: sample `getImageData` across two timestamps to prove the render loop advances, and compare computed `transform` matrices before/after `page.mouse.move` to prove pointer effects respond.

## Deployment

Deliberately free of anything that complicates Vercel: no `output: 'export'`, no API routes, no server actions, no env vars. `next.config.mjs` is intentionally empty. The profile photo (`public/profile.jpg`, extracted from the résumé PDF) goes through `next/image`; `public/resume.pdf` backs the "Download CV" button.

`metadataBase` in `app/layout.tsx` plus the URLs in `app/robots.ts` and `app/sitemap.ts` are placeholders (`kenneth-bolilan-portfolio.vercel.app`) and must be updated once the real domain exists.

The repo has a local git history from `create-next-app` but **no remote and no commits beyond the scaffold** — the owner wants to review locally before anything is pushed to GitHub or connected to Vercel. Don't push or deploy without explicit confirmation.
