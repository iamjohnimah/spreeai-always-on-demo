# SPREEAI Always On rebuild

Preview: https://iamjohnimah.github.io/spreeai-always-on-demo/rebuild/

The existing staging home page is preserved. The new experience is published in `/rebuild/`; source changes are on `codex/gucci-always-on-rebuild` in `iamjohnimah/spreeai-always-on-demo`.

## Experience and architecture

- Opening story chooser: Always On website, In Store, VIC; Gucci reference and SPREEAI brand selections. Gucci is explicitly an independent reference without affiliation.
- React/TypeScript storefront with existing Radix accessible dialogs and React Router. Shared luxury styling, responsive catalogue, filtering/search/sorting, PDP zoom, product/model-first image sequences, a later grey personalization invitation, a size drawer, and a local bag.
- Eight Gucci reference products use current Gucci product/model photography. The 45-piece SPREEAI Experience Collection preserves prepared previews, six AI Twins, front/editorial/simulated back views, motion storyboards, comparison, color comparison, outfit building, saved looks, and stylist previews.
- My Account holds simulated sign-in, photo selection, height/weight, metric/imperial units, fit preferences, AI Twin selection, profile removal, connected try-on, and the guide. Photo and measurement inputs stay in memory. Returning sample-account state persists for the tab session; no uploaded photo is saved in browser storage.
- Sample account activation automatically populates prepared imagery across supported PDPs and recommendations. Sample size recommendations appear without a separate sizing step. Uploaded photos are never substituted with a sample person and described as generated results.
- Existing dependency-free in-store and VIC applications retain their workflow logic. A shared, sanitized, versioned journey store carries sample product selections, sizes and fitting outcomes between experiences. No photos, measurements, names or message bodies enter that shared store.
- SDK embedding reuses the engineering demo's development origin, public client identifier, partner identifier, garment parameter, avatar/upload flags and Intelligent Fit switch. Bridge events validate both origin and source frame. No copied authentication tokens or private credentials are included.

## Source comparison

| Source | Findings used |
|---|---|
| Gucci current men's new arrivals and leather biker PDP | Restrained masthead and menu, quiet category navigation, large pale-background product photography, model/detail cadence, zoom, size-selection drawer. Hero excluded. |
| SPREEAI engineering demo | Single garments and outfits, categories, Intelligent Fit, Canary Mode, SDK photo/preset entry, garment variants, outfit suggestions, actual try-on and size output. |
| Existing online staging | 45 products, six twins, sample-account setup, prepared poses and back views, motion, comparison, stylist/outfit builder, saved looks and connected edit. |
| Existing in-store staging | Profile preparation, catalogue filtering, personal/product toggle, size overrides, fitting-room preparation, register handoff, fitting outcomes and follow-up preview. |
| Existing VIC staging | Shared curation, channel/message draft, visual message preview and sample lookbook; no message delivery. |
| Nicole's offline HTML | Unpacked the supplied bundle and inspected its template/state code. Useful ideas: first-time/returning shopper states, mid-gallery invitation, account fit/measurement tabs, twin selection and comparison. Its layout and simulated photo-generation timers were not reused. |

## Confirmed connection and limits

**Confirmed in-browser:** the embedded SPREEAI development SDK loaded, presented its avatar catalogue, accepted a preset avatar, produced a try-on result for the Dominican Mixed-Floral Wide Leg Pant, and displayed “Recommended size 6.” This confirms that specific preset happy path, not general garment or sizing coverage.

**Not confirmed or not connected:** retailer SSO/account exchange; persistent personal-photo generation into native PDP galleries; asynchronous result callbacks/cache and deletion; Gucci garment ingestion/ID mapping; live Gucci stock/sizing; production inference access; CRM/POS/reservations; secure client links; messaging delivery; checkout. The SDK remains a separate connected service and its generated images remain inside its iframe. Its documented sizing event exists, but its payload contract was not verified for native size mapping. These are not represented as completed integrations.

Gucci reference pieces therefore show an explicit unavailable state after personalization is activated. Prepared sample garments demonstrate the full visual journey. The native size recommendations are sample values, not calculations from the user's measurements. The supplied SDK's live recommendation is separately labeled.

The development SDK displayed an upload link even when its upload flag was false. Therefore the connected SDK is gated behind the signed-in demonstration state; guests use the local preset AI Twins. The SDK flags are still sent explicitly, but are not treated as an access-control guarantee. This is a UI demonstration boundary, not real authentication or a substitute for server authorization. User photos are never automatically forwarded to the SDK. Uploading inside that service is a separate explicit action.

Future/preview features remain labeled: fit visualization, partner-directed poses, simulated back reconstruction, motion storyboards, AI styling and outfit generation. Canary Mode was found in the engineering source but is not enabled by default in this reference storefront.

## Validation

- TypeScript compilation and Vite production build.
- Eight tests covering shared selection/size state, malformed and private-field rejection, event notifications, guest SDK configuration, verified garment parameters and forged-message rejection.
- Browser checks: entrance, Gucci collection and PDP, size drawer, selected-size bag addition, locked slot, twin selection, sample account setup, automatic prepared views, sample size recommendation, comparison, and connected SDK preset try-on.
- Photo picker automation was blocked by the Chrome extension file-access permission. File selection itself was not browser-verified; sample-photo selection and metric/imperial profile submission were verified.
- Mobile 390px: product/size interaction and in-store flow; tablet 1024px: VIC curation and message preview. No horizontal overflow in checked views. Desktop layout also inspected.
- In-store: two-piece selection, L size override, ready-in-fitting-room state and register handoff text verified. VIC retained both selections and the size override; message preview explicitly showed nothing sent.

## Build and release

From the repository root with Node and the storefront dependencies installed:

```
node scripts/build-review.mjs
node --test tests/journey.test.mjs tests/sdk.test.mjs
```

`build-review.mjs` emits the isolated `/rebuild/` deployment and reuses existing staging media. `build-storefront.mjs` emits the replacement main storefront, for a later intentional promotion. `scripts/serve.mjs` serves the repository locally. Browser access to localhost was blocked in this environment, so browser verification used the isolated staging URL.

Gucci imagery is referenced from Gucci's CDN and remains dependent on those URLs. Prices and reference photography were inspected on September 21, 2026. The reference catalogue is not synchronized to inventory, prices or availability.
