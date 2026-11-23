# SATURNMADE development

Use a fresh clone of `saturn-amarbat/personal-website` and Node.js 24.x. Install from the lockfile and start the dev server.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Make and review a change

1. On a clean checkout, start from the latest `main` with `git switch main`, `git pull --ff-only`, and `git switch -c feat/project-update`. Edit project data in [src/content/projects.js](src/content/projects.js). Profile, education, and experience live in [src/content/profile.js](src/content/profile.js).
2. Review the diff and run the checks below before committing. Stage files by name and review `git diff --cached`. Run the privacy check again before pushing so it also sees anything newly staged or committed.
3. Once Saturn approves publishing the branch, push it with `git push -u origin feat/project-update` and open a pull request into `main`.
4. Wait for **Portfolio checks**. Open the Vercel Preview from its pull-request comment or deployment check. Confirm it corresponds to the latest commit, then check the change on mobile and desktop. Vercel Authentication may require signing in. [Vercel for GitHub](https://vercel.com/docs/git/vercel-for-github)
5. Saturn reviews and merges the PR once CI and the preview pass. Vercel builds branches for Preview and builds `main` for Production. Automatic production-domain assignment is OFF, so the custom domains continue serving the current production deployment.

```sh
git diff --check
git diff --cached --check
npm run check:privacy
npm run lint
npm audit --omit=dev
npm run build
npm run check:production
```

## Release and recover

1. Find the **READY** Vercel deployment with target **Production** and the merged commit's exact SHA. Check the URL for that build, including the changed content, key links, media, and the approved résumé. A Preview deployment uses Preview configuration. Validate the Production-targeted build from `main` before promotion. [Vercel promotion](https://vercel.com/docs/deployments/promoting-a-deployment)
2. For a website release, Saturn explicitly promotes that exact ID in the Vercel dashboard or via `vercel promote <deployment-id> --scope saturn-amarbats-projects`. Keep automatic domain assignment OFF. A documentation-only merge can leave its Production build staged unless website behavior changes.
3. Check both custom aliases in Vercel. Verify the apex redirects to HTTPS www, the homepage is indexable, and the résumé download matches the approved hash with `X-Robots-Tag: noindex`. Smoke-test the changed content, mobile layout, links and recordings. Vercel can add a separate noindex header on its unique deployment URLs. [Vercel response headers](https://vercel.com/docs/headers/response-headers#x-robots-tag)
4. If a critical check fails, recover to the exact verified predecessor. Verify the recovery candidate is READY in the correct project and serves the approved résumé, then confirm both aliases and repeat the public privacy and SEO checks. See [release safeguards](docs/release-safeguards.md#recovery) for known recovery builds and fallback criteria.

## Update project content and recordings

Update the relevant entry in [projects.js](src/content/projects.js). Keep the project ID stable so existing links still work. Use the summary for what the project does and the contribution and engineering notes for what Saturn built. Preserve working source and live links.

TETHYN (`tethyn`), Digital Letter Website (`jipuk`), and ST Detailing (`st-detailing`) already use the shared website preview. To replace an approved recording, update its files in [public/media](public/media) and its `artwork` and `websitePreview` descriptors if the paths or dimensions change. The current files follow the `<project-id>-preview.mp4` and `<project-id>.webp` pattern.

- Capture a representative interaction on the real site in a clean browser session. Review the full clip and poster for private information and incidental browser UI. Keep the original capture outside the repository.
- Trim to a short clip. Export a muted H.264 MP4 with the audio track removed, a browser-compatible pixel format, and fast-start metadata. Use a representative WebP poster. Roughly 768 px wide is a starting point for video. Check readability, aspect ratio, and file size before committing.
- Set `artwork.src`, `artwork.alt`, `artwork.width`, and `artwork.height` for the poster. Set `websitePreview.src`, `websitePreview.poster`, `websitePreview.width`, and `websitePreview.height` for the player. Use `/media/` URLs and record the actual dimensions of each file.
- Confirm the poster and links work before playback. Mouse hover plays the muted clip inside the existing thumbnail without moving adjacent content. Check that inline playback pauses on pointer exit, offscreen, and when the tab is hidden. Confirm that the **Preview** button opens the larger player with touch and keyboard, Escape closes it, and focus returns to the trigger.
- Check that video requests wait for interaction. Reduced motion and supported Data Saver or reduced-data settings keep playback manual. Verify **Play recording** works in the dialog under those settings.

With FFmpeg installed locally, adjust the input, trim, and output names for your recording. [FFmpeg MP4 format options](https://ffmpeg.org/ffmpeg-formats.html#mov_002fmp4_002f3gp)

```sh
ffmpeg -ss 2 -i /path/to/recording.mov -t 8 -vf scale=768:-2 -c:v libx264 -pix_fmt yuv420p -crf 24 -an -map_metadata -1 -movflags +faststart public/media/jipuk-preview.mp4
ffmpeg -ss 1 -i public/media/jipuk-preview.mp4 -frames:v 1 -c:v libwebp -quality 80 public/media/jipuk.webp
```

See [architecture](docs/architecture.md#layout-and-media) for component behavior.