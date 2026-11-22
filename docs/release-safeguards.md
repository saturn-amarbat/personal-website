# Release safeguards

## First rollout and branch rules

The deployment freeze and Vercel's **Auto-assign Custom Production Domains** OFF setting are active. The first feature-branch push, PR preview test, and any merge require Saturn's approval. Use a harmless change to verify that a branch push creates a Preview, the PR gets a usable Vercel URL, both custom aliases still point to the live deployment, and the `Portfolio checks` job reports a result.

GitHub currently has no active ruleset or classic branch protection on `main`. After the workflow has reported a check, ask Saturn to approve one active ruleset for `main`: require a pull request with zero required approvals, require **Portfolio checks** from GitHub Actions, require the branch to be up to date before merging, and block force pushes and deletion. Leave the normal bypass list empty so the same rules apply to the owner. Saturn can still review the diff and merge their own passing PR. [GitHub rulesets](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets)

## Privacy and incident handling

- Start from the sanitized GitHub repository. Keep older checkouts, restricted backups, internal privacy notes, and personal documents outside the new checkout. Never import old branches or commits.
- `npm run check:privacy` scans checked-out history, the Git index, and publishable worktree files for unauthorized PDFs, credential paths and common secret formats. It reports categories without printing suspicious paths or values. The current PDF must match the latest hash in `scripts/resume.mjs`. For a verified public replacement, review the actual PDF and metadata with Saturn before appending the new approved hash. The previous approved public hashes allow legitimate historical revisions to remain.
- CI runs after Git receives a branch. Run the privacy check locally before any approved push and keep GitHub push protection enabled where available. The scanner is heuristic for credentials. It does not inspect recordings for private frames or prove arbitrary media and documents are clean. Review new files and recording contents yourself.
- If a private file or credential reaches GitHub, stop publishing and preserve the live safe deployment. Tell Saturn, rotate exposed credentials where applicable, and plan any history cleanup or Support request separately. The earlier README-era résumé still exists at old SHA-pinned URLs pending GitHub cleanup. [GitHub sensitive-data removal](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)

## Known recovery deployments

- Verified live at the start of Phase 5D: `dpl_C1TSCz5w6PpnjMemvzivPkL2bMqB`.
- Verified sanitized fallback: `dpl_7uw92KwR6AnbFsngy4d4sDCHY5iw`.
- Historical deployment to exclude: `dpl_Cs5EhjniioqAKZN53Bz1AFWXdV4H`. Its PDF contains private contact information.

If the Git-backed build is broken while the CLI deployment is live, fix the problem in a new PR and keep serving the safe deployment. For a public incident, verify the recovery ID, project and protection settings first, then follow the recovery procedure in [DEVELOPMENT.md](../DEVELOPMENT.md).
