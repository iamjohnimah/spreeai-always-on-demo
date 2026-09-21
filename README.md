# Always On experience rebuild

Review the new Gucci-reference and SPREEAI story chooser at `https://iamjohnimah.github.io/spreeai-always-on-demo/rebuild/`. See [rebuild notes](docs/rebuild-notes.md) for architecture, verified features, source comparison, and backend limits.

Build the isolated preview with `node scripts/build-review.mjs`; build the replacement main experience with `node scripts/build-storefront.mjs`. The replacement main experience is proposed on this branch; the existing staging entry point is preserved until promotion. Install storefront dependencies with `pnpm install --frozen-lockfile` in `storefront-source/`. Tests: `node --test tests/journey.test.mjs tests/sdk.test.mjs`.

# SPREEAI Always On — staging demo

Built interactive partner showcase with 45 sample product pages, account flow and five portrait onboarding videos. Not a real store; no orders, payments or live fit inference.

Only publishable demo assets. Private source history, research and credentials are excluded.

Videos request autoplay with sound; browser restrictions may require one Enable sound click. Sound preference persists during the session. Silent product motion previews have no soundtrack.

Prepared for GitHub Pages under /spreeai-always-on-demo/.
