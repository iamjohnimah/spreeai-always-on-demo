# SPREEAI experience selection

A standalone, responsive entrance screen with three portrait films: Online, In-Store, and VIC. Preview for integration at spreeai.com/demo.

## Run
Serve this directory with any static web server. No build step is needed.

## Design
Matches the published SPREEAI site's Paper (#F5F5F7), Ink (#1D1D1F), Quiet (#6E6E73), Afacad typography, black wordmark, and 28px rounded panels. Font files are the site's public assets. Georgia supplies the editorial headline turn.

## Behavior
Each card is a direct link: Online opens the existing public demo; In-Store and VIC open the existing GitHub demo workspaces. There is no second confirmation button or selection footer. Native anchors support keyboard activation and opening in a new tab.

The `spreeai:experience-selected` document event includes `{ experience: 'online' | 'in-store' | 'vic' }`. No selection is persisted. Films autoplay muted and loop, with no user-facing playback or picture-in-picture controls. Playback is suspended only while offscreen or the tab is hidden, resuming automatically. Browser autoplay policies can still prevent playback; posters remain available. Reduced-motion preferences suppress interface transitions; continuous video playback follows the requested design.

## Media
Three 1080 × 1920 Seedance 2.5 films feature Yuna (Online), Malik (In-Store), and Freja (VIC), sourced from Danel's AI twin handoff. Yuna was selected after Priya could not be verified and the user directed selection from that set. Each film lasts approximately eight seconds and has no audio. These are editorial demonstrations, not recordings of production messaging or retail systems.

## Scope
Only the selection screen is new. Existing journeys and production spreeai.com are unchanged by this preview.
