# Architecture

## Next.js and content

The Next.js 16 App Router serves a single portfolio page. [`src/app/page.js`](../src/app/page.js) composes the site chrome, hero, selected work, systems and creative work, about, experience, and contact. Navigation uses in-page anchors. The page and its section components render on the server by default. Client components handle media controls and scroll reveals.

- [`src/content/projects.js`](../src/content/projects.js) holds project titles, summaries, contributions, engineering notes, links, and media descriptors. [Project sections](../src/app/_components/project-sections.js) render selected work, systems foundations, and web and creative work. The first two selected entries receive featured cards.
- [`src/content/profile.js`](../src/content/profile.js) holds the profile, education, experience, contact links, and public résumé path. [Profile sections](../src/app/_components/profile-sections.js) render that content. [Site chrome](../src/app/_components/site-chrome.js) provides the wordmark, primary navigation, and footer.
- [`src/app/layout.js`](../src/app/layout.js) sets document metadata and the canonical URL. App Router metadata files provide robots.txt, sitemap, icon, manifest, and social images. [`next.config.mjs`](../next.config.mjs) sets response headers, including noindex for the public résumé.

## Layout and media

[`src/app/globals.css`](../src/app/globals.css) imports Tailwind CSS and defines the site’s tokens, responsive grids, typography, focus styles, and motion rules. Fixed-aspect media containers reserve thumbnail space. The portrait uses Next.js Image, and project posters and recordings live in [`public/media`](../public/media).

- [WebsitePreview](../src/app/_components/website-preview.js) renders a poster and assigns the muted video source after deliberate mouse hover when the thumbnail is sufficiently visible. Playback stays inside the thumbnail. It pauses on pointer exit, when the thumbnail moves out of view, or when the tab is hidden.
- [MediaDialog](../src/app/_components/media-dialog.js) uses native `<dialog>` and video controls for the larger player. It shares playback preferences across website previews, offers manual playback when automatic playback is suppressed or blocked, and pauses when the dialog closes or the tab is hidden.
- [GameplayPreview](../src/app/_components/gameplay-preview.js) provides the Trials of Tempo poster, caption, play/pause controls, and an **Enlarge** dialog. It retains native inline controls without JavaScript. With reduced motion, inline playback does not loop.

## Accessibility

The page uses a skip link, named navigation, semantic landmarks and headings, visible keyboard focus, meaningful image alternatives, and native `details` disclosures for engineering notes and earlier roles. Native dialogs support keyboard activation, Escape, and focus return. Reduced-motion styles limit animation, and [scroll reveals](../src/app/_components/scroll-reveals.js) run only when motion is allowed. Website previews also respect supported Data Saver and reduced-data preferences. Website posters, descriptions, and links remain available without JavaScript or video playback.