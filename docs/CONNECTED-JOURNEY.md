# Always On: one edit across online, VIC and in-store

John’s September 14 request: extend the existing online and in-store demos, align their features with VIC clienteling, and use Higgsfield Seedance 2.5 where useful. This contribution is isolated from the published staging branch for review.

## Review the experience

1. In the online collection or product page, choose **Save to your edit**. Use Alex’s sample journey when prompted. The initiating piece should be saved automatically.
2. Open **My edit**, choose an occasion and preferred size, then select **Try in store** or **Ask my associate**. Check the sample-sharing option and prepare the appointment request. Nothing is sent or booked.
3. Under the demo role controls, open the in-store workspace. Use Alex’s prepared sample profile, then review the shared edit. Confirm the preferred size and client preference carried through.
4. Mark a piece ready for the fitting room. After the fitting, choose **Keep for later**, **Not for me**, or **Purchased in store · sample**. These are sample outcomes only.
5. Preview the follow-up draft. Its lookbook includes only **Keep for later** pieces. No message is sent.
6. Open the VIC workspace to curate the same edit. Preview the client lookbook and mark **Interested**, **Try in store**, or **Ask my associate**. Return to the online edit to review the same preferences in this browser.

## Product alignment

- **My edit** saves individual catalogue pieces for continuity. **Compare** remains a separate two-piece comparison. Existing **Saved looks** retains stylist-created outfits; it is not silently repurposed.
- The occasion is a brief for human curation. It does not trigger unsupported automated styling or outfit generation.
- A client preference is not a confirmed appointment or stock reservation. Only the retailer can confirm availability and actual sizing.
- Sample fit recommendations are kept distinct from selected sizes and visual fit accuracy. Core online and associate size options match, including XXL where offered online.
- Customer screens expose customer actions. Switching to a staff workspace is inside explicit demo controls, not a normal customer checkout action.
- Existing storefront account, catalogue, comparison, AI stylist, saved outfits, garment galleries and checkout demonstration remain available.
- One 18.042-second Seedance 2.5 Yuna guide explains the new continuity. Existing garment films remain illustrative assets. New generation is not represented as live customer inference.

## State and integration boundary

A shared `ao-connected-journey-v1` browser record contains sample catalogue IDs, supported sizes, a predefined occasion, preference labels, fitting preparation flags, outcome labels and a sample permission/request flag. No uploaded photos, measurements, client names, contacts or message bodies enter this record. It permits 12 unique, known products; malformed or unsupported values are discarded.

Same-browser views update through local and storage events. This is a prototype of continuity, not authenticated synchronization. Links contain catalogue IDs only; opening a link on a different device does not synchronize responses. Real production needs retailer identity mapping, staff/client authorization, approved consent, secure revocable links, inventory and size data, actual generation, messaging, appointment and register integrations.

## Engineering review decisions

- Confirm which retailer surface owns the saved edit: storefront account, CRM/client book or SPREEAI service.
- Confirm when a request becomes an actual appointment, who confirms it, and how unavailable pieces are handled.
- Scope authenticated response delivery, expiry/revocation and cross-device state.
- Confirm supported garment sizing and whether purchase outcomes arrive from the register or are entered by staff.
- Treat occasion-driven automated outfits as a separate capability decision.

## Validation

See `QA-CONNECTED-JOURNEY.md` for the final validation record. The generated video transcript and sampled frames were inspected; the transcript matches the intended script. Full listening and production integrations are outside the automated checks.
