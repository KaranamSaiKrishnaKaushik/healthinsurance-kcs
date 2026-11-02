# KCS Insurance — Angular advisor website

Mobile-first, static Angular 22.2.4 SPA for Chandra Sekhar Rao Karanam. Standalone
components, strict TypeScript and templates, SCSS, Google Fonts (Poppins / Inter),
and Material Symbols icons. No backend, analytics, cookies, or tracking scripts.

## Run locally

Use a supported Node.js release: 22.22.3+, 24.15.0+, or 26.x within those major
versions. Node 24.15.0 is used in CI.

```powershell
npm install
npx ng serve
```

Open http://localhost:4200. `npm start` is equivalent to `ng serve`.
The committed package-lock.json supports reproducible installs with `npm ci`.
On the original development machine an old global npm shim was broken; if npm
reports a missing npm-cli.js, repair your Node/npm installation or invoke the npm
bundled with Node directly:

```powershell
& 'C:/Program Files/nodejs/node.exe' 'C:/Program Files/nodejs/node_modules/npm/bin/npm-cli.js' install
```

## Edit content

`src/app/data/site.config.ts` contains all agent/contact details, editable bio,
trust points, service commitments, insurer names, illustrative categories, logo
paths, certification flags, and insurer-specific quote messages.

- Update `agent.location` and set `locationVerified: true` once confirmed.
  Unverified location is marked as a placeholder and omitted from JSON-LD.
- Replace the `[Editable bio]`, `[Confirm]` content and IRDAI licence placeholder.
  Set `licenceVerified` only after entering verified details.
- Set each insurer's `certificationVerified` only after confirming authorisation.
  Until then the badge explicitly says it is a placeholder.
- Confirm category availability against the insurer's official policy documents.
- Contact helper functions URL-encode every WhatsApp message and email subject/body.
- Edit general section copy in `src/app/app.component.html`.
- Change colours, font families and spacing in `src/styles/_tokens.scss`.

There are no invented testimonials, statistics, certificates or official logos.
Do not publish the placeholder details as verified facts.

## Add authorised logos and your photo

Place official logo files you are authorised to use in `src/assets/logos/`.
Set each `logo` property to a relative path such as `assets/logos/niva-bupa.svg`.
Keep `logo: null` to retain the styled text-only placeholder. No insurer artwork
is downloaded or fabricated. Use optimised SVG or WebP files.

Add the agent's portrait to `src/assets/images/agent.webp` and set `agent.photo`
to `assets/images/agent.webp`. It replaces the hero and about placeholders. The
about image and insurer logos are lazy-loaded with dimensions and alt text.

## Build and verify

```powershell
npx ng build
npm run check
```

Production files are in **dist/healthinsurance-kcs/browser/**. Upload the contents
of that directory to a static host. No Node process is needed in production.
The build enforces bundle-size budgets and strict template/type checking.
`npm run check` verifies entry-point metadata, generated bundles, assets and the
Azure configuration. Browser checks should cover 360px and desktop layouts,
mobile menu/keyboard use, anchor navigation, and contact link destinations.
Fonts are loaded externally with display=swap and local fallbacks; blocked Google
Fonts requests do not block page content. There are no heavy animation libraries.
Scroll reveals use IntersectionObserver and respect prefers-reduced-motion.

## Azure Static Web Apps

1. Create a Static Web App in the Azure portal with deployment source **Other**
   and Azure deployment token authorisation. Our workflow is already included.
2. Open **Overview > Manage deployment token** and copy the token.
3. Add it under GitHub **Settings > Secrets and variables > Actions** as the
   repository secret **AZURE_STATIC_WEB_APPS_API_TOKEN**. Never commit the token.
4. Run **Actions > Deploy Azure Static Web App > Run workflow**, or push to `main`.
5. Open the site URL in the Azure resource's Overview page.

The workflow runs npm ci, builds Angular, checks output and uploads
`dist/healthinsurance-kcs/browser` with `skip_app_build: true`. Without the secret,
it builds/checks but skips the Azure upload. Avoid enabling a second portal-
generated deployment workflow. `staticwebapp.config.json` is copied into the
output directory. This page uses hash anchors, so no catch-all SPA rewrite is
needed; missing asset URLs correctly return 404.

## Netlify

Import the repository. `netlify.toml` sets `npm run build` as the build command,
`dist/healthinsurance-kcs/browser` as the publish directory, and Node 24.15.0.
The bundled `_headers` file sets basic HTTP response headers.

## GitHub Pages / subfolder hosting

For this repository's Pages project path:

```powershell
npx ng build --base-href /healthinsurance-kcs/
```

Publish `dist/healthinsurance-kcs/browser` using a GitHub Pages deployment workflow
or a Pages branch. For a custom domain or root hosting use the default base `/`.
No client-side router or server fallback is required: all navigation uses anchors.

## Container hosting later

```powershell
docker build -t healthinsurance-kcs:local .
docker run --rm -p 8080:8080 healthinsurance-kcs:local
```

The multi-stage Dockerfile builds Angular and serves only its static output using
Nginx on port 8080. Publish the image to a registry when needed and run it on Azure
Container Apps (ingress target port 8080) or Azure App Service for Linux containers
(container port 8080; classic custom containers use WEBSITES_PORT=8080).
Azure Static Web Apps deploys files directly and does not run this image.
The image build is separate from the GitHub Static Web Apps workflow.

## SEO and accessibility

Semantic sections, labelled navigation, a skip link, visible focus styles,
reduced-motion handling and properly labelled contact links are included.
The runtime page title, description and InsuranceAgency JSON-LD use the typed
config. `src/index.html` supplies initial SEO/Open Graph tags for link-preview
crawlers; update these too if you change the business identity. Add og:url,
canonical URL and an authorised share image once the final domain is known.
No unverified address, credentials, ratings or statistics appear in JSON-LD.
Lighthouse scores depend on hosting and external font delivery; no score is
claimed without an actual Lighthouse run.

## Structure

- src/app/data: typed site content
- src/app/core: contact URL helpers and scroll reveal directive
- src/app/components: header, icons, contact actions and insurer cards
- src/app/app.component.*: single-page section composition and SEO setup
- src/styles: design tokens and responsive mixins
- src/assets/logos and src/assets/images: authorised assets / instructions

References: [Angular compatibility](https://angular.dev/reference/versions),
[Azure build configuration](https://learn.microsoft.com/en-us/azure/static-web-apps/build-configuration),
[Azure deployment tokens](https://learn.microsoft.com/en-us/azure/static-web-apps/static-web-apps-cli#deployment-token).
