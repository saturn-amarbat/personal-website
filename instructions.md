# Instructions

## Project Mission

Build and maintain a personal portfolio website for Saturn focused on SWE internship and job applications.

## Tech Stack

- Next.js (App Router)
- JavaScript (no TypeScript for this phase)
- Tailwind CSS
- lucide-react icons
- Deployment target: Vercel

## Operating Rules

1. Keep content recruiter-friendly, direct, and easy to scan.
2. Optimize for mobile and desktop.
3. Preserve performance and accessibility.
4. Avoid paid dependencies unless explicitly approved.

## Maintenance Protocol

1. Update progress.md after every meaningful change (feature, fix, deploy, verification).
2. If development process changes, update this instructions.md file in the same session.
3. At the start of every session, read instructions.md and the latest section of progress.md before coding.

## Content Workflow

1. Keep personal details and links in one CONFIG object in src/app/page.js.
2. Replace placeholders with real contact links, project links, resume, and images before final production launch.
3. Keep the top projects section focused on strongest work and active build status.

## Quality Gate Before Deploy

1. npm run lint passes.
2. npm run build passes.
3. Navigation and CTA links validated on mobile and desktop.
4. Resume download path is valid (public/saturn_amarbat.pdf).

## Deployment Workflow

1. Push to GitHub main branch.
2. Import repository into Vercel.
3. Keep default framework settings for Next.js.
4. Record production URL and deployment date in progress.md.

## Session Close Workflow

1. Run lint/build before ending if any code changed.
2. Update progress.md with: what changed, latest commit hash, and next-session priority.
3. Push final commit so Vercel stays in sync with GitHub main.
