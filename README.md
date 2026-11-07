# Studio Sarhan

Portfolio site for Studio Sarhan, live at [studiosarhan.com](https://studiosarhan.com).
Built with [Astro](https://astro.build) and published on GitHub Pages.

## Copyright

All photographs © Khaled Sarhan / Studio Sarhan. All rights reserved.
They may not be copied, reused or published without written permission.
The code is shared for reference only; this is not an open-source licence for the photos or the logo.

## Adding work

The easy way: sign in at [Pages CMS](https://app.pagescms.org) with GitHub, open this
repository, and use **Projects → Add entry**. Upload photos straight from the dashboard.
Saving there commits to this repository and the site updates by itself a few minutes later.

By hand:

- **New project**: add a Markdown file to `src/content/projects/` (copy an existing one).
  The file name becomes the address, so `night-markets.md` is published at `/night-markets/`.
- **Photos**: put them in `src/assets/photos/<project-name>/` and list them under `photos:`
  in the project file, in the order they should appear. Upload one large version
  (about 2400 px wide); the smaller sizes are made automatically.
- **Order** on the home page comes from each project's `order:` number.
- **Hide** a project while working on it with `draft: true`.

Home and About texts are in `src/content/pages/`, and the Instagram handle and contact form
address are in `src/data/site.json`.

## How a project page is laid out

The first photo runs full width, the following photos sit side by side in pairs, and an odd
one out is shown centred (next to the project's `note`, if it has one). Add `size: full`
to a photo to give it its own full-width row.

## Contact form

The form on the About page only appears once `contactFormEndpoint` in `src/data/site.json`
is set, for example to a free [Formspree](https://formspree.io) form address. Until then the
page points visitors to Instagram.

## Publishing

- Changes to `main` are built and published by `.github/workflows/deploy.yml`.
  GitHub Pages must use **Settings → Pages → Source: GitHub Actions**.
- Any other branch gets a test build (`.github/workflows/preview.yml`) whose log and pages are
  saved to the `preview-build` branch. The live site is not touched.

## Working on it locally

```sh
npm ci        # installs the exact versions in package-lock.json
npm run dev
```

To update Astro and the other packages, run `npm update` and commit the changed `package-lock.json`.

Fonts: Cinzel and Open Sans (SIL Open Font License, see `src/assets/fonts/`).
