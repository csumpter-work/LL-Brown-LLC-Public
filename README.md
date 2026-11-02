# LL Brown LLC — Public Website

This repository owns the source files for **LL Brown LLC / Brown Crane & Rigging's public website**.

## Site structure

- `public/index.html` — homepage, copied from LL Brown's original ChatGPT Site and stripped of its runtime bootstrap
- `public/payment-terms/index.html` — existing public payment terms
- `public/styles.css` — the original ChatGPT Site's production stylesheet (red/cream branded design)
- `public/ll-brown-logo.png` — company logo
- `public/link-belt-atc-3275-demolition-hero.png` — crane hero image
- `tests/site.test.mjs` — offline source and asset checks

The HTML/CSS/images are versioned together so site rendering is **not dependent on ChatGPT Sites**. The independent customer assistant remains at https://llbrown-customer-chat.llbrownllc.workers.dev/ and is linked from the public footer.

## Develop and verify

Requires Node.js 22+.

```sh
npm test
npx serve public
```

Open http://localhost:3000 to inspect the static site.

## Deployment

Cloudflare Workers supports static assets from `public/` via Wrangler. The config currently targets a **separate staging Worker** to avoid overwriting the existing `ll-brown-llc` Worker or removing its other routes:

```sh
npx wrangler deploy
```

**Do not change Wrangler's Worker name to `ll-brown-llc` until its currently deployed routes, customer-chat links, and payment-terms behavior have been checked.** Publishing the static package to that name would replace the pre-existing application Worker.

GitHub Actions currently performs verification only, not deployment. A future CI deployment needs a scoped `CLOUDFLARE_API_TOKEN` secret, a verified `CLOUDFLARE_ACCOUNT_ID`, and explicit approval to wire the production release.

## Safeguards

- Public website source only. Do not commit secret tokens, customer details, payroll, banking, QuickBooks records or `.env` files.
- Keep the original ChatGPT Site live until the Cloudflare replacement passes visual and functional QA.
- Preserve company email DNS and unrelated Workers.
- Cloudflare's prior production `ll-brown-llc` deployment/version must remain a rollback option until parity is verified.

## Design reference

Original source: https://llbrownllc.ll-brown-4444.chatgpt.site/

Current Cloudflare target: https://ll-brown-llc.llbrownllc.workers.dev/

The site's existing typography, page sections, colors, legal terms and hero imagery should remain visually equivalent.
