# Terry Retail Ventures website

Static site for Terry Retail Ventures (Terry Pet Lovers LLC, Davenport, FL). Plain HTML and CSS, no build step.

Pages: index, about, brand-partners, apply, contact, privacy-policy, terms-and-conditions, 404.
Old URLs vendor-partnerships.html and categories.html redirect to the new pages.

Publishing: every commit to main is built and published by the Cloudflare Worker "terry-retail-ventures" (custom domain terryretailventures.com).

Contact forms: sent through Web3Forms to info@terryretailventures.com. The access key is in contact.html and apply.html (it is public by design and only delivers to that inbox).

Editing notes:
- The header and footer are repeated in every HTML file. Change them everywhere.
- Files under /assets are cached for a year. When you change CSS or an image, give it a new file name and update the links.
- Only claim what is true: no logos, reviews, counts or partners that are not real and documented.
