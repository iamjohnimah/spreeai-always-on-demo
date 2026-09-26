# SPREEAI experience selection

A standalone, responsive entrance screen with three portrait films: Online, In-Store, and VIC. Intended for review before integration at spreeai.com/demo.

## Run
Serve this directory with any static web server. No build step is needed.

## Behavior
Select a card, then use the Enter button. Online points to the existing public demo; In-Store and VIC point to existing GitHub demo workspaces. This screen does not modify those journeys or process customer data.

The `spreeai:experience-selected` document event includes `{ experience: 'online' | 'in-store' | 'vic' }` for future integration. No selection is persisted. Video is muted, stops when offscreen or the tab is hidden, and honors reduced-motion preferences. A visible pause control is available.

## Media
Three 1080 × 1920 Seedance 2.5 films feature Yuna (Online), Malik (In-Store), and Freja (VIC), sourced from Danel’s AI twin handoff. Priya could not be verified in the available handoff; the user directed us to select twins from that set. Each film lasts approximately eight seconds and has no audio. They are editorial demonstrations, not recordings of production messaging or retail systems. UI and branded typography belong in controlled HTML or screen composites.

## Scope
Only the selection screen is new. Production spreeai.com is not changed by this preview.
