# Catalog and automatic shopping verification

Verified September 26, 2026 against authenticated public guest catalog responses from the official services.

- Development demo: 28 demo-site items.
- Public production demo: 79 demo-site items.
- Combined assortment: 107 distinct garments and accessories.
- All 308 distinct source image URLs returned HTTP 200 during verification.
- Both source snapshots retain every product, all variant photography and published sizes. Live refresh updates both independently and preserves a source snapshot when a service is unavailable.
- Only the demo-site partner assortment is included. Other partner catalogs are excluded.
- Each environment uses its own guest credentials. Production twins are resolved by name, with the selected reference image connected to the official production service when required.
- Combined outfits use pieces from one source collection; side-by-side comparison supports both collections.
- Verified automatic front try-on and complete outfit for Freja on development Tinos Dress and production Knit Maxi Dress.
- Verified Tinos size M recommendation and changing to S updates actual fit guidance and automatically requests a size visualization.
- Some garments return no sizing recommendation. The interface reports that instead of inventing a size.
- Detailed fit maps require the connected development preview in demo-store PR109. GitHub Pages supports standard size recommendations and try-on; the same-origin fit service is not hosted by Pages.
- Back View and In Motion are Coming Soon placeholders and do not issue generation requests.
- Orders, payments and appointment delivery remain demonstration flows.
