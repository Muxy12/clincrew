# Pre-launch checklist

Complete these before publishing the site. Items marked **(required)** are
legal or functional blockers for a professional site targeting France/EU.

## 1. Professional details Mohamed must provide

Edit `src/config/profile.ts`:

- [ ] **(required)** Real email address → set `email.value` and
      `email.configured = true`.
- [ ] LinkedIn profile URL → set `linkedin.value` and `linkedin.configured = true`.
- [ ] Phone → set `phone.value` and `phone.configured = true` (optional, shown in contact details).
- [ ] City / coverage → set `city` (e.g. `{ fr: "Paris · France", en: "Paris · France" }`).
- [ ] Reply time → set `responseTime` (e.g. `"24–48 h"`); until set the contact copy shows `[24–48 h]`.
- [ ] Professional portrait → add image to `/public/images/` and set
      `portrait` to its path (optional but recommended).
- [ ] **"Mon parcours" values** (`yearsExperience`, `startingRole`,
      `focusAreas`, `clientTypes`) — fill these in; until set, the About
      section/page shows bracketed placeholders like `[X]` / `[poste de départ]`.
- [ ] **Quiz values** — fill `phases` (Q3), `therapeuticAreas` (Q4) and
      `geographicCoverage` (Q5) so the quiz scoring stays honest; otherwise
      those options show bracketed placeholders. Review the score thresholds
      in `src/components/sections/Quiz.tsx` after a few weeks of real leads.
- [ ] Therapeutic areas — **only if confirmed** (otherwise leave empty).
- [ ] Geographic coverage — **only if confirmed**.
- [ ] Languages spoken — **only if confirmed**.
- [ ] Certifications — **only if confirmed** and verifiable.

> Leave anything unconfirmed empty. The site is designed to look complete
> without these and must never display fabricated credentials.

## 2. Services

Edit `src/config/services.ts`:

- [ ] Review the six service categories; set `enabled: false` on any Mohamed
      does not actually offer.
- [ ] Confirm the descriptions in `src/i18n/messages/{fr,en}.json` are accurate
      and do not overstate responsibilities or imply regulatory authority.

## 3. Legal content — **(required)**

Edit `src/i18n/messages/fr.json` and `en.json` (`legal` and `privacy` keys).
Replace every `[À compléter …]` / `[To complete …]` placeholder:

- [ ] **(required)** Legal status and business address.
- [ ] **(required)** SIREN / SIRET (if applicable).
- [ ] **(required)** Contact email / phone.
- [ ] **(required)** Hosting provider details (name + address).
- [ ] **(required)** Data controller identity and contact.
- [ ] Data retention period.
- [ ] Update the "Last updated" handling if you want a visible date.

## 4. Email / contact form — **(required for the form to work)**

- [ ] Create a Resend account and verify a sending domain.
- [ ] Set `RESEND_API_KEY`, `CONTACT_FROM_EMAIL`, `CONTACT_TO_EMAIL` in the
      host environment.
- [ ] Submit a real test from `/fr/#contact` and `/en/#contact` and confirm
      the email arrives.
- [ ] (Optional) Move rate limiting to Upstash Redis / Vercel KV for strict,
      global limits.

## 4b. Blog

- [ ] Review the two starter articles in `src/content/blog/` — edit or
      replace them; they are generic drafts, not Mohamed's personal claims.
- [ ] Add real articles via `src/config/blog.ts` + matching `.fr.md`/`.en.md`
      files (see README).
- [ ] Remove the "*Starter article — review before publication*" note at the
      bottom of each starter post once finalised.

## 5. SEO & domain

- [ ] Set `NEXT_PUBLIC_SITE_URL` to the final production URL.
- [ ] Verify `/sitemap.xml` and `/robots.txt` resolve on production.
- [ ] Check the OG image at `/fr/opengraph-image` and `/en/opengraph-image`.
- [ ] Submit the sitemap in Google Search Console.
- [ ] Confirm canonical + `hreflang` tags in page source.

## 6. Quality gates

- [ ] `npm run typecheck` passes.
- [ ] `npm run lint` passes.
- [ ] `npm run build` succeeds.
- [ ] Manual check: FR and EN routes, language switcher, mobile menu,
      form validation + success/error states.
- [ ] Lighthouse (mobile) — review Performance / Accessibility / Best
      Practices / SEO.

## 7. Analytics (optional, later)

- [ ] No trackers are installed by default (by design). If you add analytics,
      assess GDPR consent requirements first and update the privacy policy.
