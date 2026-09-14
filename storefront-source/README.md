# Editable Always On storefront

This is the source for the existing static partner showcase, recovered from the local source used for the published September 13 demo. It is included so the connected journey can be reviewed and rebuilt without editing a compiled bundle. It is not the production SPREEAI storefront.

Install the existing lockfile with `npm ci` in this directory. From the repository root run `node scripts/build-storefront.mjs`. The script checks TypeScript, builds with the existing GitHub Pages base, and updates the shopping entrypoints. It preserves associate and marketing routes and existing prepared media.

The shared sample state module is `../journey/store.js`; the associate client uses the same module directly. Run `node --test tests/journey.test.mjs` from the repository root. The optional browser integration test `tests/connected-flow.mjs` requires Playwright with Chrome and a local server exposing this checkout at `/spreeai-always-on-demo/`.

Fonts and prepared catalogue assets are served by the parent static project. Vite leaves those public URLs unresolved during the isolated source build; verify them against the assembled static site.
