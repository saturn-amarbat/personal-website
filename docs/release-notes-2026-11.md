# November 2026 release notes

The redesigned SATURNMADE portfolio is live. It highlights Saturn Amarbat’s contributions to engineering projects, gives recruiters a direct résumé download, and reflects a May 2027 graduation target. [Live portfolio](https://www.saturnmade.tech/)

## What shipped

- The responsive Bento layout leads with StageCraft and Trials of Tempo Mobile. The UX refinement simplified the hero, footer, project controls, and disclosures and brought typography and spacing into alignment.
- The web and creative section now includes recordings of Digital Letter Website’s public greeting, ST Detailing’s pricing interaction, and TETHYN’s updated intro and homepage. On desktop, hover playback stays inside each thumbnail. The **Preview** button opens the larger player by keyboard or touch.
- Project descriptions, contributions, posters, and links are available without playing media. Trials of Tempo also includes a separate browser gameplay recording.

## Verified production release

Vercel promoted the reviewed Production build `dpl_5qgVnCxTdeLzgKhEyhoU4YXLWCV4` from GitHub commit [`dfde6fc`](https://github.com/saturn-amarbat/personal-website/commit/dfde6fc426f7322e2178dafd4c15c0b2843d0ca5). Both domains were verified and the apex redirects to the canonical `www` address. Automatic production-domain assignment stayed OFF.

The live homepage returned HTTP 200 and allowed indexing. The résumé matched its approved SHA-256 and retained its PDF-only noindex header. The live smoke test verified 18 direct anchors, 14 project destinations, the SEO routes, and desktop and mobile-emulated playback. The three hover previews produced zero measured displacement below their thumbnails. [Passing Portfolio checks](https://github.com/saturn-amarbat/personal-website/actions/runs/45088326185/job/137411906613)

See [release safeguards](release-safeguards.md) for future releases and recovery.