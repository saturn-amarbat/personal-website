# SATURNMADE development

Use a fresh clone of `saturn-amarbat/personal-website` and Node.js 24.x. Install from the lockfile and start the dev server.

```sh
npm ci
npm run dev
```

Open `http://localhost:3000`.

## Make and review a change

1. On a clean checkout, start from the latest `main` with `git switch main`, `git pull --ff-only` and `git switch -c feat/project-update`. Edit the project data in `src/content/projects.js` and keep recordings under `public/media`.
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
2. Saturn explicitly promotes that exact ID in the Vercel dashboard or via `vercel promote <deployment-id> --scope saturn-amarbats-projects`. Keep automatic domain assignment OFF.
3. Check both custom aliases in Vercel. Verify the apex redirects to HTTPS www, the homepage is indexable, and the résumé download matches the approved hash with `X-Robots-Tag: noindex`. Smoke-test the changed content, mobile layout, links and recordings. Vercel can add a separate noindex header on its unique deployment URLs. [Vercel response headers](https://vercel.com/docs/headers/response-headers#x-robots-tag)
4. If a release fails, Saturn can roll back to an exact, previously verified safe Production ID. If the recovery target is the staged sanitized fallback `dpl_7uw92KwR6AnbFsngy4d4sDCHY5iw`, verify it is READY in the correct project and promote it. Repeat the public smoke checks. See [release safeguards](docs/release-safeguards.md) before choosing an older deployment.

## Add a website recording

Digital Letter Website (`jipuk`) and ST Chicagoland Detailing (`st-detailing`) already use the same compact project list as TETHYN. When an approved recording is ready, add `artwork` and `websitePreview` to that project's entry, following TETHYN in `src/content/projects.js`. Keep the existing project links and use the actual dimensions of each asset.

- Record the real site in a clean browser session. Show a representative interaction and review the frames for private information, incidental browser UI and third-party audio. Use a representative still frame for the poster and describe it in `artwork.alt`.
- Trim to a short clip and export as H.264 MP4 with fast-start metadata, browser-compatible pixel format, and the audio track removed. Use a WebP poster. A short clip at roughly 768 px wide is a starting point. Keep enough resolution to read the UI and review the actual transfer size.
- Use names such as `public/media/jipuk-preview.mp4`, `public/media/jipuk-poster.webp`, `public/media/st-detailing-preview.mp4` and `public/media/st-detailing-poster.webp`. In project data, set `artwork.src`, `artwork.alt`, `artwork.width`, `artwork.height`, and `websitePreview.src`, `poster`, `width`, `height`. The `src` and `poster` URLs start with `/media/`.
- The shared preview defers video loading and plays inline muted. On a hover-capable mouse, only the media area expands on hover. The **Preview** button opens the same recording by touch or keyboard. Reduced-motion and supported data-saver settings keep playback manual. Check keyboard open and Escape, touch playback, and that offscreen inline playback pauses.

With FFmpeg installed locally, adjust the start time, duration and output names for the recording. Keep the original capture outside the repository. [FFmpeg MP4 format options](https://ffmpeg.org/ffmpeg-formats.html#mov_002fmp4_002f3gp)

```sh
ffmpeg -ss 2 -i /path/to/recording.mov -t 8 -vf scale=768:-2 -c:v libx264 -pix_fmt yuv420p -crf 24 -an -map_metadata -1 -movflags +faststart public/media/jipuk-preview.mp4
ffmpeg -ss 1 -i public/media/jipuk-preview.mp4 -frames:v 1 -c:v libwebp -quality 80 public/media/jipuk-poster.webp
```
