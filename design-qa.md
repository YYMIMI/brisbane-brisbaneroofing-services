# Design QA — Petrie Terrace service-area map

## Evidence

- Source visual truth: `/workspace/scratch/f0a090994bdc/upload/c30c6c0e5d4d69bb10483e4cdbb3b286.png`
- Source pixels: `1391 × 823`
- Intended implementation route/state: `/contact#petrie-terrace-map`, desktop contact page with the map section in view
- Intended CSS viewport: approximately `1391 × 823`, device scale factor `1`
- Implementation screenshot: unavailable
- Density normalization: not applicable because the implementation could not be captured

## Full-view comparison evidence

The source screenshot was opened at original resolution. It establishes a two-column service-area card with explanatory copy and a Google map, a light background, rounded border treatment, and a prominent external Maps action.

The implementation could not be opened in the cloud browser because page navigation timed out while the local preview service reported that it was running. No full-view visual comparison can therefore be claimed.

## Focused-region comparison evidence

Not available. The focused Petrie Terrace map region could not be captured from the implementation for a side-by-side comparison.

## Required fidelity surfaces

- Fonts and typography: blocked pending a browser-rendered capture.
- Spacing and layout rhythm: blocked pending a browser-rendered capture.
- Colors and visual tokens: implemented using the existing Mel One navy, yellow, white and pale-background system, but not visually verified.
- Image quality and asset fidelity: the implementation uses the real Google Maps embed rather than a static or simulated map; rendering was not visually verified.
- Copy and content: implemented with Petrie Terrace as a service-area focus while retaining `40 Creek St, Brisbane City QLD 4000` as the published business contact address.

## Findings

- [P1] Browser-rendered evidence is unavailable
  - Location: `/contact#petrie-terrace-map`
  - Evidence: the source screenshot opened successfully, but local preview navigation timed out.
  - Impact: responsive layout, iframe rendering, typography, spacing and console state cannot be signed off visually.
  - Fix: repeat the same-viewport browser capture when the preview browser connection is available, then compare the map card directly with the source screenshot.

## Primary interactions tested

- Not tested in the browser because navigation did not complete.
- Source-level destinations are present for Google Maps, roof leak repairs, tile roof repairs, projects, contact and Petrie Terrace service-area anchors.

## Console errors checked

- Not checked because the page could not be opened in the browser.

## Comparison history

- Pass 1: blocked before visual comparison by browser navigation timeout. No visual fixes were made from an unverified capture.

## Implementation checklist

- Capture the contact-page map section at the target desktop viewport.
- Confirm the Google Maps iframe renders and does not overflow the card.
- Check the stacked mobile layout and button width.
- Test each internal link and the external Google Maps action.
- Review console errors after the map iframe loads.

## Follow-up polish

- Revisit exact map-to-copy column proportions only after browser-rendered evidence is available.

final result: blocked
