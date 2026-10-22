# Mohamed Debbah — Clinical Research Associate (website)

A premium, bilingual (FR/EN) marketing website for **Mohamed Debbah**, an
independent Clinical Research Associate (CRA). Built to generate qualified
inbound leads from CROs, pharmaceutical and biotech sponsors, and clinical
operations teams.

Dark, editorial, boutique-consultancy aesthetic — deep midnight navy with a
premium mint accent, oversized Manrope headlines, and restrained motion.

---

## Tech stack

| Area              | Choice                                            |
| ----------------- | ------------------------------------------------- |
| Framework         | Next.js 15 (App Router, React Server Components)  |
| Language          | TypeScript (strict)                               |
| Styling           | Tailwind CSS 3                                     |
| Animation         | Motion for React (`motion/react`)                 |
| Icons             | lucide-react                                       |
| i18n              | next-intl (locale-prefixed routing, `/fr`, `/en`) |
| Forms             | React Hook Form + Zod                             |
| Email             | Resend (server-side, via API route)               |
| Fonts             | Manrope (headings), DM Sans (body), IBM Plex Mono |

---

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Create your local env file
cp .env.example .env.local   # on Windows: copy .env.example .env.local

# 3. Run the dev server
npm run dev
```

Open <http://localhost:3000> — you are redirected to the default locale
`/fr`. The English site lives at `/en`.

### Available scripts

| Script              | Purpose                              |
| ------------------- | ------------------------------------ |
| `npm run dev`       | Start the development server         |
| `npm run build`     | Production build                     |
| `npm run start`     | Serve the production build           |
| `npm run lint`      | ESLint (next/core-web-vitals)        |
| `npm run typecheck` | TypeScript type checking (no emit)   |

---

## Editing content — the important part

**All factual content and copy is centralized.** You never need to touch
component code to update the site.

### 1. Personal details — `src/config/profile.ts`

The single source of truth for everything about Mohamed. Fill in real,
**verified** values only. Unknown fields are intentionally left empty and the
UI hides them, so the published page never shows blank stats or placeholders.

- `email` / `linkedin`: set `configured: true` and a real value to display
  them (footer, about, contact).
- `portrait`: path to a photo in `/public` (e.g. `/images/mohamed.jpg`), or
  leave `null` for the elegant placeholder.
- `therapeuticAreas`, `geographicCoverage`, `languages`, `certifications`,
  `experience`: add entries **only once confirmed**. Empty arrays are not
  rendered.

> ⚠️ Do not invent years of experience, employers, certifications, study
> counts, therapeutic areas, countries, or client references.

### 2. Services — `src/config/services.ts`

Six configurable service categories. Set `enabled: false` on any service
Mohamed does **not** offer; only enabled services are published. Descriptions
live in the translation files (see below).

### 3. Translations — `src/i18n/messages/fr.json` & `en.json`

All user-facing text: navigation, headlines, body copy, form labels,
validation and status messages, footer, legal pages, and SEO metadata. The
two files share the exact same key structure — update both when changing copy.

### 4. Site & SEO — `src/config/site.ts`

Site URL, brand strings, job title (for structured data), OG image size.

### 5. Blog — `src/config/blog.ts` + `src/content/blog/`

The blog (`/[locale]/blog`) is file-based and bilingual. To add an article:

1. Add an entry to `src/config/blog.ts` — `slug`, `date` (`YYYY-MM-DD`),
   optional `tags`, and the FR/EN `title` + `excerpt`.
2. Create two Markdown files for the body:
   - `src/content/blog/<slug>.fr.md`
   - `src/content/blog/<slug>.en.md`

   Standard Markdown works: `##`/`###` headings, paragraphs, `-` lists,
   `**bold**`, `[links](/fr#contact)`. Reading time is computed automatically.

Posts are statically generated, included in the sitemap, and emit
`BlogPosting` structured data + `hreflang`.

> The two shipped posts are **generic starter drafts** (no fabricated
> credentials or claims). Review, edit or replace them before publishing.

---

## Contact form & email setup (Resend)

The contact form (`/#contact`) posts to `src/app/api/contact/route.ts`, which
validates with Zod, applies a honeypot + rate limit, and sends email via
[Resend](https://resend.com).

**Until email is configured, the form does not pretend to send.** It returns a
clear "form not yet active" message to the visitor and never silently discards
a submission.

To enable delivery:

1. Create a free Resend account and **verify a sending domain**.
2. Add these to `.env.local` (and to your host's environment variables):

   ```env
   RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxx
   CONTACT_FROM_EMAIL=contact@yourdomain.com   # must be on the verified domain
   CONTACT_TO_EMAIL=mohamed@yourdomain.com      # where leads are delivered
   ```

3. Redeploy. Submissions now arrive by email, with the sender's address set as
   `reply-to`.

### Rate limiting note

Rate limiting (`src/lib/rate-limit.ts`) is in-memory and therefore
**per-instance**. On serverless (Vercel), multiple instances mean the limit is
not globally consistent. For strict global limiting, back it with a shared
store such as **Upstash Redis** or **Vercel KV** — the function signature is
designed to be swapped without touching the API route logic.

---

## Deployment (Vercel)

1. Push the repository to GitHub/GitLab/Bitbucket.
2. Import the project in [Vercel](https://vercel.com/new). The framework is
   auto-detected as Next.js — no build config needed.
3. Add environment variables in **Project → Settings → Environment Variables**:
   - `NEXT_PUBLIC_SITE_URL` → your production URL (e.g. `https://mohameddebbah.com`)
   - `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` (see above)
4. Deploy.

Security headers (HSTS, X-Content-Type-Options, X-Frame-Options,
Referrer-Policy, Permissions-Policy) are set in `next.config.mjs`.

See [`PRELAUNCH.md`](./PRELAUNCH.md) for the full pre-launch checklist.

---

## Internationalization

- Locales: `fr` (default) and `en`, always prefixed (`/fr`, `/en`).
- The language switcher preserves the current path and section hash.
- Localized `<html lang>`, canonical URLs, and `hreflang` alternates
  (including `x-default`) are emitted per page.

## Accessibility

Built toward WCAG 2.2 AA: semantic landmarks, keyboard-navigable menu and
switcher, visible focus indicators, labelled form fields with accessible
error messaging, a skip link, and full `prefers-reduced-motion` support.

## Project structure

```
src/
  app/
    [locale]/            # localized routes (layout, home, legal, privacy, 404, OG image)
    api/contact/         # contact form endpoint
    globals.css          # Tailwind + ported theme styles
    sitemap.ts robots.ts manifest.ts icon.svg
  components/
    layout/              # Header, Footer, LanguageSwitcher
    sections/            # Hero, Strip, Expertise, Services, Approach, ValueProp, About, Contact
    motion/              # Reveal (scroll animation)
    ui/                  # Monogram
  config/                # site.ts, profile.ts, services.ts  ← edit these
  i18n/                  # routing, navigation, request, messages/{fr,en}.json
  lib/                   # contact-schema.ts, rate-limit.ts
```

---

## License / ownership

All content and brand identity belong to Mohamed Debbah.
