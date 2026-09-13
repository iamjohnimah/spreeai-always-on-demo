# SPREEAI Always On — Associate experiences

Public staging concept. The existing shopping demo and marketing site are preserved.

## Experiences
- `in-store/`: associate profile setup, 45-piece catalogue, product/personal image toggle, filters, garment gallery, comparison, size override, fitting-room preparation and downloadable register handoff.
- `vic/`: associate curation, personal visuals, message editing, channel preview and copyable sample lookbook link. No real message is sent.
- `lookbook/`: read-only sample client view. No checkout.

## Production integration
A dedicated white-label workspace requires associate authentication (password/SSO), staff roles and client-level authorization. Alternatively, embed the workflow into the retailer CRM or associate application. Agree catalogue ingestion, availability sync, client-account identity mapping, consent, retention/deletion, supported sizing inputs, asynchronous generation and failure handling, secure media delivery and approved communication channels with the partner. Client links should be authorized, expiring and revocable. No production credentials or private customer data belong in this static app.

The prototype uses Alex, a prepared AI Twin, sample sizes and stock. Uploads are browser-memory previews only; they are not sent to a server or used to generate imagery. No real account, inventory, reservation, messaging or payment integration exists. Selection IDs and interface preferences may persist locally. Profile measurements and uploaded photos do not persist. Register handoffs are preparation lists, not transactions. Generated back views are simulations. Motion storyboards and editorial poses are concept demonstrations, not a statement of production availability.

## Assets
Two new 18-second Seedance 2.5 Yuna introductions (720p high bitrate), generated from the previously approved Yuna identity. Separate in-store and VIC dialogue; captions transcribed from actual output. Existing prepared product assets are reused from the shopping demo. 45 catalogue entries have four prepared views. Catalogue source URLs and prices are omitted.

## UX research
Associate client books, preferences, notes and curated outreach informed the workspace. The fitting-room/register handoff and read-only client journey follow John's brief, rather than copying checkout flows.
- https://docs.newstore.com/docs/managing-customers
- https://docs.newstore.com/docs/using-newstore-associate-app-for-clienteling
- https://docs.newstore.com/docs/engage-your-customers
- https://help.endearhq.com/en/articles/6152880-what-are-stories

## Local use
Serve the repository at `/spreeai-always-on-demo/` to match GitHub Pages. No build step or package dependency is required. app.js holds UI state and interactions; catalog.json contains replaceable catalogue data; style.css contains responsive styles.

## QA
Browser checked: 390px mobile guide controls and profile completion; VIC curation and message preview; desktop profile activation, two-piece comparison and register handoff. Media transcripts checked against the requested dialogue and sample frames reviewed. No actual message or transaction submitted. Browser autoplay may require a tap for sound.
