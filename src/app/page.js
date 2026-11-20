import {
  About,
  Contact,
  Experience,
  Hero,
} from "./_components/profile-sections";
import {
  WebAndCreativeWork,
  SystemsWork,
  EngineeringProjects,
} from "./_components/project-sections";
import { SiteFooter, SiteHeader } from "./_components/site-chrome";
import { ScrollReveals } from "./_components/scroll-reveals";

export default function Home() {
  return (
    <div className="site-shell">
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <SiteHeader />
      <main id="main">
        <Hero />
        <EngineeringProjects />
        <div className="project-index">
          <SystemsWork />
          <WebAndCreativeWork />
        </div>
        <div className="background-grid">
          <About />
          <Experience />
        </div>
        <Contact />
      </main>
      <SiteFooter />
      <ScrollReveals />
    </div>
  );
}
