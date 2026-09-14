# Connected journey validation — September 14, 2026

Base: published demo commit `72b46d08b0ad0b5b289cdc6875cb9f9087034b9d`. Isolated contribution: `codex/connected-always-on-journey`.

- TypeScript check and Vite build passed. Build warnings concern the existing static font URLs served from the parent project; final runtime asset requests passed.
- Five state tests passed: cross-channel preservation, validation/limits, removal without losing other preferences, update notifications/corrupt storage, and unsupported size filtering.
- Automated Chrome flow passed on the assembled local static site: initial online save through Alex setup, occasion, XXL size, fitting preference, sample consent/request, in-store review, ready flag, keep-for-later outcome and follow-up draft, reload persistence, VIC continuity, client responses, and cross-tab update delivery.
- Regression checks passed for product size selection, add-to-bag, checkout demonstration, two-piece comparison and opening saved looks.
- Invalid/unknown lookbook product IDs produce an empty state.
- Screenshots captured at 390px, 1024px and 1440px. No document horizontal overflow on online, in-store and lookbook routes. Final mobile online/store screenshots and video contact sheet visually inspected.
- No page errors or missing same-origin assets in the final automated run.
- Seedance 2.5 guide measured 18.042 seconds. Video metadata loaded in the browser. Native speech transcript matches the script; captions derive from measured timings. Six sampled frames reviewed. Full listening not performed.

Evidence: `connected-flow-results.json`, `connected-guide-transcript.json`, `connected-guide-generation.json`, and `screenshots/`.

Not verified or claimed: authenticated customer accounts, real generated customer results, cross-device synchronization, live inventory, fit accuracy, messages, appointments, reservations, payments, orders, or production integration. The public staging branch has not been changed by this contribution.
