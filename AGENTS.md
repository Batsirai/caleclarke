## Learned User Preferences

- Primary site goals: grow the email list (Kit) and book paid speaking; podcast, pilgrimages, and Institute/donor support are core secondary paths.
- Public marketing copy should read as Cale Clarke in the first person unless the user specifies otherwise.
- Do not put a harvestable email address or prominent mailto in static footer markup; prefer forms or other non-scrapable contact paths.
- Do not link to Relevant Radio archives on the public site; the current show is *The Cale Clarke Show* (Apple / Spotify / YouTube). A brief honest mention of past work with RR is fine.
- Lean on The Faith Explained Institute (and Cardinal Collins patron in the sidebar) for credibility; donor traffic can go to the Institute site / donate page.
- Hero layout: full-viewport height and portrait positioning so the subject’s head clears the nav; tune background position as needed.
- Speaking section can use a dedicated blazer portrait asset (`cale-hero.jpg`) separate from the hero full-bleed background image.

## Learned Workspace Facts

- This repo is an Astro static site built for Cloudflare Pages (`output: "static"`, `dist/`).
- Kit (ConvertKit) newsletter uses form id `6699201` and uid `ea19c66b27`; default `PUBLIC_KIT_EMBED_MODE` favors native HTML POST to Kit so inputs always render without depending on the async script embed.
- Booking and general contact use FormSubmit-backed forms that post to the configured inbox (not a documented address in static HTML).
- Institute site defaults to `https://www.thefaithexplained.com/` (`PUBLIC_FEI_WEBSITE_URL`); donate defaults to `/donate` on that domain (`PUBLIC_FEI_DONATE_URL` to override).
- About section links to LinkedIn by default (`https://www.linkedin.com/in/cale-clarke-4636a12b/`); override with `PUBLIC_LINKEDIN_URL` if the profile URL changes. Optional `PUBLIC_PODCAST_*` env vars add Spotify/YouTube listen buttons.
