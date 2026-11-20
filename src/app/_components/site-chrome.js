import { profile } from "@/content/profile";

const navigation = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <a className="wordmark" href="#home" aria-label={`${profile.name}, home`}>
        <svg
          className="saturn-mark"
          viewBox="0 0 40 40"
          width="32"
          height="32"
          aria-hidden="true"
        >
          <circle cx="20" cy="20" r="10.5" fill="var(--accent)" />
          <g className="saturn-orbit-scroll">
            <g className="saturn-orbit-gesture">
              <g transform="rotate(-24 20 20)">
                <path
                  d="M3 20a17 5.5 0 0 0 34 0"
                  fill="none"
                  stroke="var(--canvas)"
                  strokeWidth="5"
                />
                <ellipse
                  cx="20"
                  cy="20"
                  rx="17"
                  ry="5.5"
                  fill="none"
                  stroke="var(--accent)"
                  strokeWidth="1.9"
                />
              </g>
            </g>
          </g>
        </svg>
        SATURNMADE
      </a>
      <nav aria-label="Main navigation">
        {navigation.map(({ label, href }) => (
          <a href={href} key={href}>
            {label}
          </a>
        ))}
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <p>© 2026 {profile.name}</p>
      <nav aria-label="Footer navigation">
        <a href="#projects">Projects</a>
        <a href={profile.githubUrl}>GitHub</a>
        <a href={profile.linkedinUrl}>LinkedIn</a>
        <a href={`mailto:${profile.email}`}>Email</a>
      </nav>
    </footer>
  );
}
