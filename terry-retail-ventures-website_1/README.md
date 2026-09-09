# Terry Retail Ventures — Website

Production-ready static website for **Terry Retail Ventures**, operated by **Terry Pet Lovers LLC** (Florida, USA).

Plain HTML, CSS and JavaScript. **No build step, no framework, no database, no paid services.** Upload the folder and it runs.

- **Audience:** manufacturers, authorized distributors, wholesale suppliers, brand representatives and vendor account managers.
- **Primary call to action:** *Contact Purchasing*
- **Secondary call to action:** *Explore Vendor Partnerships*
- **Not included, by design:** shopping cart, checkout, consumer ordering, prices.

---

## 1. Contents

```
terry-retail-ventures/
├── index.html                    Home
├── about.html                    About
├── categories.html               Product Categories
├── vendor-partnerships.html      Vendor Partnerships (requirements, terms, restrictions)
├── contact.html                  Contact + vendor inquiry form
├── privacy-policy.html           Privacy Policy
├── terms-and-conditions.html     Terms and Conditions
├── 404.html                      Custom not-found page
├── robots.txt                    Crawl rules
├── sitemap.xml                   XML sitemap
├── _headers                      Cloudflare Pages security + caching headers
├── assets/
│   ├── css/style.css             Entire stylesheet (one file)
│   ├── js/main.js                Navigation, scroll reveal, form validation
│   ├── images/                   Logo files, favicons, social sharing image
│   └── brand/                    Logo kit + email-signature assets (not used by the site)
├── README.md                     This file
├── LAUNCH-CHECKLIST.md           Step-by-step pre-launch checks
└── REVIEW-BEFORE-LAUNCH.md       Every factual placeholder you still need to confirm
```

Total weight: roughly 400 KB including all images and the brand kit. There is nothing to install and nothing to compile.

---

## 2. The two email addresses (important)

The site uses **two addresses on purpose**. Do not merge them.

| Address | Used for | Where it appears |
|---|---|---|
| `purchasing@terryretailventures.com` | Vendors, wholesale, catalogs, price lists, MOQ, account applications, brand/channel matters | Vendor Partnerships page, Contact page (purchasing block), vendor inquiry form destination, footer "Purchasing & vendors", brand-policy paragraph |
| `info@terryretailventures.com` | General questions, privacy, website and legal contact | Contact page (general block), footer "General", Privacy Policy, Terms and Conditions |

Rules that are already enforced throughout the site, and that you should keep if you edit anything:

1. **Every `mailto:` link shows its own address as the visible text.** No link says one address and points at another.
2. **The incorrect address used in an earlier draft has been removed from the entire project** — it appears in no page, script, metadata field or document here.
3. **No personal or webmail address appears anywhere** on the public site.
4. The *Contact Purchasing* buttons link to `contact.html` (the page), not to a `mailto:`, so nothing is mislabelled.

### Changing an address

1. Search the whole folder for the old address and replace it.
2. Also update the constant near the top of `assets/js/main.js`:

```js
var PURCHASING_EMAIL = 'purchasing@terryretailventures.com';
```

That constant sets where the vendor inquiry form sends its message.

---

## 3. Legal wording to update after the DBA

The site currently says, everywhere:

> **Terry Retail Ventures is a business identity operated by Terry Pet Lovers LLC, a Florida limited liability company.**

This wording makes **no claim of a registered fictitious name**. Once the Florida fictitious-name (DBA) registration is **approved**, replace that sentence with:

> **Terry Retail Ventures is a registered fictitious name of Terry Pet Lovers LLC, a Florida limited liability company.**

**How to find every occurrence:** search the folder for the marker

```
[LEGAL-ENTITY-LINE]
```

An HTML comment carrying that marker, the current wording and the exact replacement text sits directly above every occurrence. They are:

| File | Location |
|---|---|
| every page | footer legal block |
| `about.html` | "Who we are" intro paragraph |
| `about.html` | "Legal notice / Business identity" section |
| `privacy-policy.html` | Section 1, "Who we are" |
| `terms-and-conditions.html` | Section 1, "Agreement" |

Also update the `about.html` meta description if you want it to reflect the new wording, and change the "Last updated" date at the top of both legal pages.

---

## 4. Contact information

| Item | Current value | Where |
|---|---|---|
| Location | Central Florida, United States | `contact.html`, `about.html`, every footer |
| Purchasing email | purchasing@terryretailventures.com | see section 2 |
| General email | info@terryretailventures.com | see section 2 |

No individual is named as the purchasing contact — suppliers are directed to the purchasing address instead. No street address, phone number, EIN, resale certificate number or banking detail appears anywhere on the site either, and none should be added. Vendor documentation is shared privately during an account application, which is exactly what the Vendor Partnerships page tells suppliers.

Since the header and footer are repeated in each HTML file (there is no templating system), a footer change must be repeated across all **8** HTML files.

---

## 5. Brand assets

The site loads its logos from `assets/images/`:

| File | Use |
|---|---|
| `logo-trv-reversed.png` | Header and footer (navy backgrounds) — navy strokes rendered white |
| `logo-trv.png` | Full-colour lockup for light backgrounds |
| `trv-mark-reversed.png` / `trv-mark.png` | TRV monogram only |
| `favicon.ico`, `favicon-32/48/180/192/512.png` | Browser tab, bookmarks, mobile home screen |
| `og-image.jpg` | Link preview when the site is shared (1200×630) |

`assets/brand/` holds the reusable kit — **it is not loaded by the website**, it is there for you:

| File | Use |
|---|---|
| `trv-logo-full-color.png` | Full lockup, transparent, 1600px wide — documents, decks, invoices |
| `trv-logo-reversed.png` | Same lockup for dark backgrounds |
| `trv-monogram-full-color.png` / `trv-monogram-reversed.png` | Square-ish mark for avatars and profile images |
| `trv-wordmark-only.png` | Wordmark without the monogram |
| `trv-email-signature-320.png` | **Email signature**, 320px wide, flat white background |
| `trv-email-signature-640.png` | Email signature for high-DPI screens (display it at 320px wide) |

**Email signature tip:** use the 640px file and set the display width to 320px so it stays sharp on retina screens. The white background is deliberate — transparency is unreliable in Outlook and some webmail clients.

All variants were produced from your approved artwork. The reversed versions only recolour the navy strokes to white; the teal and gold are untouched and no letterform was redrawn.

To replace the logo later, swap the files keeping the same filenames and the site picks them up with no code change.

---

## 6. The vendor inquiry form

Today the form is **fully functional without any paid service**:

1. `assets/js/main.js` validates every field in the browser (required fields, email format, website format, phone format).
2. A hidden honeypot field silently discards automated spam.
3. On a valid submission it opens the visitor's email application with the inquiry pre-filled and addressed to `purchasing@terryretailventures.com`.
4. The page also shows that address as a plain link, so a visitor whose device has no mail client configured can still copy it.

### Connecting a real form backend later (all free-tier options)

**Option A — Web3Forms or Formspree (no code).** Create an account, get an access key, then in `contact.html`:

```html
<form id="vendor-inquiry-form" action="https://api.web3forms.com/submit" method="POST">
  <input type="hidden" name="access_key" value="YOUR-KEY">
```

and in `assets/js/main.js` delete the block that builds the `mailto:` link (everything from `var data = new FormData(form);` to `window.location.href = href;`) so the browser performs a normal submit. Keep the validation above it.

**Option B — Cloudflare Pages Functions.** Add `functions/api/contact.js` to this folder; Cloudflare deploys it automatically as `/api/contact`. Post the form to it with `fetch()` and have the function forward the message through an email API (Resend, Postmark, SendGrid). No extra hosting required.

**Option C — Cloudflare Turnstile.** Free CAPTCHA alternative you can add alongside A or B if spam ever becomes a problem.

Whichever you choose, update the sentence under the form in `contact.html` and **section 5 of `privacy-policy.html`**, which currently states that no hosted form service is connected and names the provider requirement.

---

## 7. Deploying to Cloudflare Pages

No build step is required. Cloudflare serves these files exactly as they are.

### Option A — Direct upload (fastest, no command line)

1. Sign in at <https://dash.cloudflare.com>.
2. In the sidebar choose **Compute (Workers & Pages)** → **Create** → **Pages** tab → **Upload assets**.
3. Project name: `terry-retail-ventures` → **Create project**.
4. Unzip the delivered archive and drag in **everything inside it**. `index.html` sits at the top level of the ZIP, so after unzipping you can select all the files and folders and drop them in together. `index.html` must end up at the top level of the upload, alongside the `assets` folder — if you drop a wrapping folder in instead, every page 404s.
5. Click **Deploy site**.
6. Cloudflare gives you `terry-retail-ventures.pages.dev`. Open it and click through every page before connecting your domain.

To publish an update later: open the project → **Create deployment** → drag the updated files in again.

### Option B — Git (best if you will make regular changes)

1. Push the contents of this folder to a GitHub or GitLab repository (`index.html` at the repository root).
2. Cloudflare dashboard → **Compute (Workers & Pages)** → **Create** → **Pages** → **Connect to Git**.
3. Authorise and pick the repository.
4. Build settings:
   - **Framework preset:** `None`
   - **Build command:** *leave empty*
   - **Build output directory:** `/`
5. **Save and Deploy.** Every push to the production branch redeploys automatically.

### Option C — Wrangler CLI

```bash
npm install -g wrangler
wrangler login
cd terry-retail-ventures
wrangler pages deploy . --project-name=terry-retail-ventures
```

### What `_headers` does

Cloudflare Pages reads the `_headers` file automatically. It sets `X-Frame-Options`, `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy` and HSTS, caches `/assets/*` for a year, and keeps HTML always revalidated so edits appear immediately. Leave the file in place; it is not served to visitors.

`404.html` is picked up automatically as the not-found page.

---

## 8. Connecting the custom domain

1. Open your Pages project → **Custom domains** tab → **Set up a custom domain**.
2. Enter `terryretailventures.com`, confirm, then repeat for `www.terryretailventures.com`.
3. **If the domain's nameservers already point to Cloudflare**, the required DNS record is created for you — just confirm the prompt.
4. **If the domain is managed elsewhere**, either move the nameservers to Cloudflare (recommended) or add the CNAME record Cloudflare displays at your current DNS provider.
5. The SSL certificate is issued automatically and free. No configuration needed.
6. Pick a canonical host and redirect the other one. The pages in this project declare `https://www.terryretailventures.com/...` as canonical, so the simplest setup is to **redirect the apex to `www`**: Cloudflare dashboard → your domain → **Rules** → **Redirect Rules** → create a 301 from `terryretailventures.com/*` to `https://www.terryretailventures.com/$1`.

   If you would rather serve the apex domain without `www`, change every `<link rel="canonical">`, the `og:url` tags, `sitemap.xml` and `robots.txt` to the non-www form first, then redirect `www` to the apex instead. Do not leave both hosts serving the site without a redirect.

DNS changes take anywhere from a few minutes to a few hours.

---

## 9. After launch

- **Search Console:** add the property at <https://search.google.com/search-console>, then submit `https://www.terryretailventures.com/sitemap.xml`.
- **Link preview:** share the URL in a chat or on LinkedIn to confirm the navy `og-image.jpg` card renders.
- The Privacy Policy and Terms pages are intentionally marked `noindex, follow` and are excluded from the sitemap; they remain fully reachable from the footer.

---

## 10. Technical notes

- **Fonts:** Archivo (headings) and Inter (body) load from Google Fonts with `display=swap` and a metric-compatible fallback stack, so text is readable instantly even if the font request is slow or blocked. To remove the third-party request entirely, download both families as `woff2`, drop them in `assets/fonts/`, add `@font-face` rules at the top of `style.css`, and delete the two `preconnect` links plus the `fonts.googleapis.com` stylesheet link from all 8 HTML files — then also remove the Google Fonts sentence from section 6 of the Privacy Policy.
- **No browser storage:** the site sets no cookies and uses no `localStorage`, analytics or trackers.
- **Images** are palette-optimised PNG and progressive JPEG, with `width`/`height` on every `<img>` to prevent layout shift.
- **Accessibility:** skip link, one `<h1>` per page, semantic landmarks, `aria-expanded` on the menu button, `aria-current` on the active link, visible focus rings, Escape closes the mobile menu, decorative SVG icons hidden from screen readers, and all text meets WCAG AA contrast (verified: body 17.8:1, muted text 6.2:1, teal links 7.3:1, gold-on-navy 5.9:1).
- **Responsive:** verified at 390 px (mobile), 820 px (tablet) and 1440 px (desktop) with no horizontal scrolling on any page. The menu collapses to the hamburger below 1024 px.
- **Icons** are hand-built inline SVG. There is no icon font and no emoji anywhere.

---

## 11. Keep the site truthful

The copy was written so that every statement is something you can document today. Please keep it that way. Do **not** add: years in business, revenue or unit figures, employee or customer counts, named brands or vendor logos you do not have written permission to display, testimonials or reviews, certifications you do not hold, a physical facility, or any product authorization that is not covered by a written agreement.

The site states what the business does, not what it lacks: there is no paragraph anywhere announcing what you do not yet have. Keep it that way, and when something becomes verifiably true, add it — that is what makes the rest credible.
