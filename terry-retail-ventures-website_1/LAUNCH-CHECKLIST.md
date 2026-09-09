# Launch Checklist — Terry Retail Ventures

Work top to bottom. Items marked **[you]** need a decision or an account only you can access; everything else is already done in the files and just needs confirming.

---

## A. Before you upload

- [ ] **[you]** Both email addresses are live and monitored: `purchasing@terryretailventures.com` and `info@terryretailventures.com`. Send a test to each and confirm it arrives. Either address may be an alias that routes into the same inbox — that is fine, as long as mail sent to both actually reaches you.
- [ ] **[you]** Read `REVIEW-BEFORE-LAUNCH.md` and confirm or correct every line in it.
- [ ] **[you]** Read the Privacy Policy and Terms and Conditions in full. They are a solid professional starting point, not legal advice — have an attorney review them if you want certainty.
- [ ] Confirm the `[LEGAL-ENTITY-LINE]` wording is still correct. Use "business identity" until the Florida DBA is approved, then swap it (README section 3).
- [ ] Confirm the "Last updated" date on both legal pages matches your real publish month.
- [ ] Decide whether you serve the site at `www.terryretailventures.com` or the apex. The files are set up for **www** (README section 8).

## B. Deploy

- [ ] Create the Cloudflare Pages project and upload **the contents** of this folder, so `index.html` is at the top level (README section 7).
- [ ] Open the `*.pages.dev` URL and confirm the site loads with logo, fonts and styling intact.
- [ ] Click every navigation link: Home, About, Product Categories, Vendor Partnerships, Contact, plus the footer's Privacy Policy and Terms.
- [ ] Click **Contact Purchasing** in the header and in the hero — both should land on the Contact page.
- [ ] Visit a made-up URL such as `/nope.html` and confirm the branded 404 page appears.

## C. Check it on a phone

- [ ] Open the site on your phone. Tap the hamburger menu: it opens, links work, tapping a link closes it.
- [ ] Confirm nothing scrolls sideways on any page.
- [ ] Tap `purchasing@terryretailventures.com` on the Contact page — your mail app should open with that exact address.
- [ ] Submit the vendor form with everything blank: red field errors appear and nothing sends.
- [ ] Fill it in properly and submit: your mail app opens with the details pre-filled, addressed to purchasing@.

## D. Email and links audit

- [ ] Every visible email address on the site is one of the two approved addresses.
- [ ] Every email link opens the address it displays.
- [ ] The incorrect address from the earlier draft appears nowhere. (Already verified across every file in this project.)
- [ ] No personal or webmail address appears anywhere.

## E. Connect the domain

- [ ] Add `terryretailventures.com` and `www.terryretailventures.com` in the Pages **Custom domains** tab.
- [ ] Confirm HTTPS works with no certificate warning.
- [ ] Add the redirect rule so one host is canonical (README section 8).
- [ ] Load `https://www.terryretailventures.com` and click through every page once more on the live domain.

## F. Search and sharing

- [ ] Paste the live URL into a chat, Slack or LinkedIn and confirm the navy TRV preview card appears.
- [ ] Confirm the browser tab shows the TRV favicon.
- [ ] **[you]** Add the site to Google Search Console and submit `https://www.terryretailventures.com/sitemap.xml`.
- [ ] Confirm `https://www.terryretailventures.com/robots.txt` loads and points at the sitemap.

## G. Email signature

- [ ] **[you]** Add `assets/brand/trv-email-signature-640.png` to your email signature, displayed at 320px wide, and link it to the site.

## H. Within the first week

- [ ] **[you]** Send the URL to two or three suppliers you already talk to and ask whether anything reads unclear.
- [ ] **[you]** Decide whether to connect a hosted form service so submissions arrive as records rather than through your mail client (README section 6).
- [ ] **[you]** Diarise the DBA wording swap for the day the Florida registration is approved.
