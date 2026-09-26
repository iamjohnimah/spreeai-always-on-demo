# SPREEAI online storefront preview

The Online selector now opens `/online/`. The page uses the Gucci collection/product layout reference with SPREEAI branding, Afacad typography and a new Freja campaign film.

## Live product connection

- Uses the same public guest flow and production catalog as `https://spreeai.com/demo`, whose catalogue is embedded from `https://demo-store.spreeai.com/`.
- On load, calls `https://api.spreeai.com/v1/user/guest` with partner `demo-site`, then `/v3/protea/garments`. The short-lived guest token is used in memory only; it is not saved or committed.
- A field-allowlisted snapshot of 79 garments provides an immediate fallback. No creator metadata is included. Source catalog snapshot: 2026-09-26.
- Original names, displayed price/currency, garment IDs, size lists and image URLs are retained. 227 official images are optimized as WebP; URL-to-cache mapping only applies to an exact source URL. New image URLs use the live source automatically.
- Product gallery and size controls launch `https://vton.spreeai.com` with the selected garment ID, partner and the public production client configuration observed on the official demo. No fixed unrelated test garment.
- Real try-on verified in the embedded frame: Knit Maxi Dress, Freja preset, generated result and recommended size S.

## Boundaries

The embedded SPREEAI service performs real try-on and sizing. The surrounding account, bag, comparison, styling and saved-look flows remain an interactive retailer preview. Local account setup does not authenticate a production SPREEAI account or generate personal images. Personal results remain in the production frame; account-wide result handoff to native collection tiles still requires an approved result/account API. Checkout, inventory, POS and messaging are not connected. No personal photo was uploaded during validation; only the service's Freja preset was used.

## Rebuild

Install locked dependencies in `storefront-source`, then run `node scripts/build-online.mjs` from the repository root. It updates only `/online/`. Run `node --test tests/online.test.mjs tests/journey.test.mjs` for catalog mapping, bridge isolation and shared-state validation.

## Film

Seedance 2.5 reference generation: `b8738006-19f0-40d0-8e76-e9d44d3b0ca6`; logo cleanup: `552ab69c-2f70-4f28-ab7e-35397bd26d93`. Approved Freja identity. 15 seconds, 1920×1080, muted looping hero with a responsive portrait crop. Laptop lid is blank. The accompanying Always On card is an illustrative product story, not a returned inference result.
