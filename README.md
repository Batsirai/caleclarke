# caleclarke.com — Astro (Cloudflare Pages)

Personal-brand landing site for **Cale Clarke** — speaking, community (Kit), The Faith Explained Institute, and an upcoming podcast. Built as **static Astro** for **Cloudflare Pages**. See **`branding-questions-for-cale.md`** for a questionnaire to send Cale.

## Local development

```bash
npm install
npm run dev
```

Contact forms POST directly to [Static Forms](https://www.staticforms.dev) — no server-side code needed.

Build:

```bash
npm run build
npm run preview
```

Optional: copy `.env.example` to `.env` and set:

- **`PUBLIC_STATICFORMS_API_KEY`** — your Static Forms API key (baked into HTML at build time; their security model uses domain allowlists, not key secrecy).
- **`PUBLIC_KIT_FORM_UID`** — Kit newsletter embed. In [Kit](https://kit.com), open your form → **Share** / **Embed** → HTML, and copy the `data-uid` value from the `<script>` tag (same list as your current squeeze page).
- **`PUBLIC_KIT_EMBED_SCRIPT_SRC`** (optional) — only if Kit gives a different script URL than `https://f.convertkit.com/{uid}/index.js`; paste the full `src` here.
- **`PUBLIC_FEI_WEBSITE_URL`** (optional) — “Visit the Institute” link on the home page.

Page flow: hero → **newsletter (Kit)** → **The Cale Clarke Show** → **Speaking** → about → **Institute + donate** → **Pilgrimages** (sidebar: Cardinal Collins) → **Contact** forms.

## Deploy on Cloudflare Pages

1. Push this repo to GitHub (or GitLab).
2. In [Cloudflare Dashboard](https://dash.cloudflare.com/) → **Workers & Pages** → **Create** → **Pages** → connect the repo.
3. Build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Root directory:** `/` (repo root)
4. Add environment variables in Pages → Settings → Environment variables (Production + Preview as needed):
   - **`PUBLIC_STATICFORMS_API_KEY`** (plaintext) — [Static Forms](https://www.staticforms.dev) API key; forms POST directly to Static Forms at build time (notifications go to the email on your Static Forms account).
   - **`PUBLIC_KIT_FORM_UID`** (and **`PUBLIC_KIT_EMBED_SCRIPT_SRC`** if you use a custom script URL).
5. Connect custom domain **caleclarke.com** under the Pages project → **Custom domains**.

Official reference: [Deploy Astro to Cloudflare Pages](https://docs.astro.build/en/guides/deploy/cloudflare/).

## Domain: move to Cloudflare (high level)

You typically want **registrar** and **DNS** in one place for simpler SSL and redirects.

1. **Add the domain to Cloudflare** (Free plan is enough for DNS + proxy): *Add a site* → follow nameserver instructions.
2. **Transfer registration** (optional but common): unlock domain at current registrar, get auth code, start transfer in Cloudflare **Registrar** → pay/extend by 1 year per ICANN rules.
3. **While DNS is at Cloudflare**, point `caleclarke.com` and `www` to the Pages project (CNAME/apex setup as Pages prompts).
4. **Retire old hosts** after cutover: Kit squeeze page, Squarespace trial subdomain — keep Squarespace only if something must stay there until migrated.

Squarespace-specific: [Squarespace → transfer domain out](https://support.squarespace.com/hc/en-us/articles/360001981708) (unlock + EPP code). If the domain is **not** registered at Squarespace, only DNS/hosting changes apply.

## Assets

See `public/images/README.md`. Add `cale-hero.jpg` (blazer photo) and `bishop_banner.jpg`, then point the hero in `src/pages/index.astro` at `cale-hero.jpg`.

## Questions for Cale (copy/paste)

**Positioning & audience**

- In one sentence, who is this site *for* (pastors booking a talk, listeners, donors, media)?
- Top three actions you want a visitor to take (listen, book, newsletter, donate, follow)?

**Speaking**

- Preferred contact: one email, or a short form (name, org, date, audience size)?
- Topics you want listed (bullets), and anything you do *not* want to emphasize?
- Virtual vs. in-person, typical honorarium range (or “inquire”)?
- Any logos or orgs you’re allowed to name (like a “trusted by” row on [Sahil’s speaking page](https://www.sahilbloom.com/speaking))?

**Brand & content**

- Final approval on bio (edited from Relevant Radio copy)?
- Social links to feature (X, Facebook, YouTube, etc.)?
- Should **The Faith Explained Institute** have its own section or outbound link?

**Legal & assets**

- Confirm permission for Cardinal Collins image/crest and exact attribution line.
- High-res headshot (blazer) — horizontal vs. vertical crop preference?

**Newsletter**

- ~~Provider~~ — **Kit** is embedded on-site; confirm copy tone for the signup blurb.

---

## What we need from you to finish production

- Final **hero photo** file and **bishop banner** asset.
- **Contact email** (or form fields) for speaking.
- Decision on **copyright year** in footer (none vs. rolling year).
- Any **Relevant Radio** branding guidelines (if they require disclaimer text next to logos/links).
