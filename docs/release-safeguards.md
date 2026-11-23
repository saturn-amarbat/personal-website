# Release safeguards

## Protect Main

The active **Protect Main** GitHub ruleset requires a pull request to change `main`. The GitHub Actions check **Portfolio checks** must pass with the branch up to date. The ruleset requires zero approving reviews and blocks force pushes and deletion of `main`. The owner can merge a passing PR after reviewing it. [GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)

## Review and release

1. Run the local checks and review the diff before publishing a branch. Open a PR into `main`.
2. Wait for **Portfolio checks** and review the Vercel Preview associated with the PR head. Test the affected UI on desktop and mobile.
3. Merge through the protected PR workflow. Check the post-merge CI result and find the READY **Production** build from the exact merged SHA.
4. Vercel tracks `main` as the production branch. **Auto-assign Custom Production Domains** is **OFF**. After verifying a build that changes site behavior, Saturn explicitly promotes that Production deployment. A documentation-only merge may leave its Production build staged.
5. Check both aliases, the apex redirect, homepage indexability, the approved résumé hash and PDF-only noindex header, and the changed site behavior on the public domain. Unique deployment URLs can carry Vercel’s own noindex header. [Vercel response headers](https://vercel.com/docs/headers/response-headers#x-robots-tag)

See [development and release instructions](../DEVELOPMENT.md#release-and-recover).

## Privacy and incident handling

- Work from the public repository's current history. Keep older checkouts, restricted backups, internal incident records, and personal documents outside it.
- Run `npm run check:privacy` before pushing. It scans checked-out history, the Git index, and publishable worktree files for unauthorized PDFs, credential paths, and common secret formats. It reports categories without printing suspicious values. CI repeats the check after GitHub receives the branch.
- The current résumé must match the latest approved hash in [scripts/resume.mjs](../scripts/resume.mjs). Review the full PDF and its metadata with Saturn before approving a replacement and appending its hash. Previous approved hashes allow legitimate public revisions to remain in history.
- Review recording contents as well as the file diff. The scanner uses credential patterns and cannot evaluate video frames. If private material reaches GitHub, stop publishing, preserve the safe live deployment, notify Saturn privately, and rotate affected credentials where applicable. Handle any history cleanup or Support request separately. [GitHub sensitive-data removal](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

## Recovery

For the November 2026 release, the verified Production deployment is `dpl_5qgVnCxTdeLzgKhEyhoU4YXLWCV4`. Its verified predecessor is `dpl_C1TSCz5w6PpnjMemvzivPkL2bMqB`, and the separately verified sanitized fallback is `dpl_7uw92KwR6AnbFsngy4d4sDCHY5iw`.

For a future release, record the current safe Production deployment before promotion. If a critical check fails, recover to that exact verified predecessor. Use the sanitized fallback if the predecessor is unsuitable or recovery fails. Confirm the recovery candidate is READY in the correct project and serves the approved public résumé before switching traffic. After recovery, recheck aliases, the apex redirect, the résumé digest and header, and homepage indexability. Keep automatic domain assignment OFF.