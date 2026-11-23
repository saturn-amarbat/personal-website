# SATURNMADE

SATURNMADE is Saturn Amarbat’s engineering portfolio. It presents full-stack, mobile, applied AI, and systems projects alongside experience and creative work. The November 2026 release reflects a May 2027 graduation target. [Live portfolio](https://www.saturnmade.tech/)

## Project showcase

- **Selected work** leads with StageCraft, a theatrical marketplace prototype with natural-language inventory search, and Trials of Tempo Mobile, an Android port with a playable browser version and a recorded gameplay preview. Featured cards show Saturn’s contributions and link to engineering notes and source.
- **Systems foundations** covers a C memory allocator and a C++ campus router.
- **Web & creative work** includes TETHYN, Digital Letter Website, and ST Detailing. Their recordings play muted inside the thumbnail on supported desktop hover. The **Preview** button opens a larger player by mouse, keyboard, or touch. Project descriptions, posters, and links are available before playback.

The site also includes an About section, an experience timeline, contact links, and a downloadable public résumé.

## Stack and local setup

The site uses Next.js 16 App Router, React 19, JavaScript, Tailwind CSS 4 and custom CSS, and Lucide icons. Vercel hosts the site.

Use Node.js 24.x.

```sh
git clone https://github.com/saturn-amarbat/personal-website.git
cd personal-website
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Checks and releases

GitHub Actions runs **Portfolio checks** on pull requests to `main` and pushes to `main`. It checks privacy and whitespace, lints, audits production dependencies, builds the site, and smoke-tests the production build. Review the Vercel Preview before merging. A merge creates a Production-targeted build. The owner promotes the exact verified build when a website change is ready to go live.

- [Development workflow and media updates](DEVELOPMENT.md)
- [Architecture](docs/architecture.md)
- [Release safeguards](docs/release-safeguards.md)
- [November 2026 release notes](docs/release-notes-2026-11.md)