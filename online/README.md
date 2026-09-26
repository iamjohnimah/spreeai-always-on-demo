# Connected Always On storefront

Source: `storefront-source/src/always-on/`. Build with `node scripts/build-online.mjs`.

The hero has no My SPREEAI overlay card. Menu and the account icon open the native `/account` profile flow. Shoppers can select a live twin or upload their own photo, save height/weight, or use the development email sign-in, signup/confirmation and reset endpoints. Sessions are scoped to the tab and refresh through one coordinator. Signing out clears the selected identity; in-flight responses from the prior session are rejected.

The catalog loads the 28 demo-site-owned garments from `api.dev.spreeai.com/v3/protea/garments`. The bundled fallback includes only public product fields. It does not mix production garment IDs with development avatars. The development catalog currently does not contain the former production Knit Maxi Dress.

The product gallery presents product/model photography, then personal front/back/video/fit slots, then detail photos. Guests see gray profile prompts. Personal front views generate on opening the slot. Generation uses the selected photo/twin ID and actual garment IDs. Views are reusable while browsing the page session. Turn video uses the real front and back renders; sized views send both target and recommended base size. Outfit rendering sends the selected real garment set. No generated placeholder is shown as a live result.

## Connections

- Guest and refresh: `/v1/user/guest`, `/v1/auth/refresh`
- Email account: `/v1/auth/login`, `/v2/user`, `/v1/user/confirmsignup`, `/v1/auth/forgotpassword`
- Twins: `/v1/avatars`
- Photos: `/v2/store-experience/user-images`
- Profile measurements: `PUT /v2/user`
- Front/outfit render: `/v3/store-experience/tryon`
- Back/size render: `/v3.1/store-experience/tryon`
- Render status: `/v1/user-assets/tryon/:id`
- Turn video: `/v3.1/store-experience/tryon/turn` and status by turn ID
- Size recommendation: `/v2/store-experience/sizing`, `/v1/user-assets/sizing/:id`
- Detailed fit map: the development store's existing authenticated `/api/size-recommendation/garment/:id/fit` proxy

GitHub Pages supports the direct development API calls. Detailed fit maps require the same-origin development proxy. `node scripts/serve-online.mjs` runs a loopback preview at port 8769 with an exact-path, authenticated pass-through. `scripts/package-connected-preview.mjs DESTINATION` packages this screen for a separate development-store path without replacing that store's homepage. The development package must be host-gated against stage/production.

The map's own recommendation is used with its fit statements so it cannot conflict with an older sizing model's answer. Missing charts or generation failures are shown as unavailable, never replaced by invented measurements. Stock, payments and the conversational stylist remain previews. Personal photos/passwords are not part of build artifacts or analytics. Authentication and upload forms are wired but not tested using a real person's credentials/photo.
