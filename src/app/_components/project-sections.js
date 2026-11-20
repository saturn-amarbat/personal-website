import Image from "next/image";
import { GameplayPreview } from "./gameplay-preview";
import { Plus } from "lucide-react";
import { projects } from "@/content/projects";
import { profile } from "@/content/profile";
import { ExternalLink } from "./external-link";
import { WebsitePreview } from "./website-preview";

function ProjectLinks({ project }) {
  return (
    <>
      {project.repoUrl && (
        <ExternalLink
          href={project.repoUrl}
          label={`${project.title} GitHub repository`}
        >
          GitHub
        </ExternalLink>
      )}
      {project.publicLink && (
        <ExternalLink
          href={project.publicLink.href}
          label={`${project.title}: ${project.publicLink.label}`}
        >
          {project.publicLink.label}
        </ExternalLink>
      )}
    </>
  );
}

function EngineeringProject({ project, featured }) {
  const technologies = (
    <ul className="tags" aria-label={`${project.title} technologies`}>
      {project.stack.map((tech) => (
        <li key={tech}>{tech}</li>
      ))}
    </ul>
  );
  return (
    <article
      className={`project ${featured ? "tile" : "secondary-project"} ${project.id}`}
      data-reveal="block"
      aria-labelledby={project.id}
    >
      <div className="project-name">
        {project.id === "stagecraft" && (
          <div className="stagecraft-artwork media-viewport" aria-hidden="true">
            <div className="media-content" />
          </div>
        )}
        <p className="eyebrow">{project.category}</p>
        <h3 id={project.id}>{project.title}</h3>
        {featured && <p className="project-context">{project.context}</p>}
      </div>
      {project.preview && <GameplayPreview preview={project.preview} />}
      <div className="project-body">
        <p className="project-summary">{project.summary}</p>
        {featured && technologies}
        <div className="project-links">
          <ProjectLinks project={project} />
        </div>
        <details>
          <summary>
            Engineering notes
            <Plus size={15} aria-hidden="true" />
          </summary>
          {!featured && (
            <>
              <p className="project-context">{project.context}</p>
              {technologies}
            </>
          )}
          <p className="contribution">{project.contribution}</p>
          <ul className="engineering-notes">
            {project.notes.map((note) => (
              <li key={note}>{note}</li>
            ))}
          </ul>
        </details>
      </div>
    </article>
  );
}

function CompactProject({ project }) {
  if (project.websitePreview) {
    return (
      <WebsitePreview
        id={project.id}
        title={project.title}
        artwork={project.artwork}
        preview={project.websitePreview}
        links={<ProjectLinks project={project} />}
      >
        <p>{project.summary}</p>
      </WebsitePreview>
    );
  }
  return (
    <article aria-labelledby={project.id}>
      {project.stack && <p className="eyebrow">{project.stack.join(" / ")}</p>}
      {project.artwork && (
        <div className="project-thumbnail media-viewport">
          <Image
            className="media-content"
            src={project.artwork.src}
            alt={project.artwork.alt}
            width={project.artwork.width}
            height={project.artwork.height}
            unoptimized
          />
        </div>
      )}
      <h3 id={project.id}>{project.title}</h3>
      <p>{project.summary}</p>
      <div className="project-links">
        <ProjectLinks project={project} />
      </div>
    </article>
  );
}

export function EngineeringProjects() {
  return (
    <section id="projects" className="section" aria-labelledby="projects-title">
      <div className="section-heading" data-reveal>
        <h2 id="projects-title">Selected work</h2>
        <ExternalLink href={profile.githubUrl}>All repositories</ExternalLink>
      </div>
      <div className="work-grid">
        {projects.flagship.map((project, index) => (
          <EngineeringProject
            key={project.id}
            project={project}
            featured={index < 2}
          />
        ))}
      </div>
    </section>
  );
}

export function SystemsWork() {
  return (
    <section className="systems" aria-labelledby="systems-title" data-reveal>
      <h2 id="systems-title" className="section-heading">
        Systems foundations
      </h2>
      <div className="systems-grid">
        {projects.systems.map((project) => (
          <CompactProject key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}

export function WebAndCreativeWork() {
  return (
    <section
      id="client-work"
      data-reveal
      className="section"
      aria-labelledby="client-title"
    >
      <h2 id="client-title" className="section-heading">
        Web &amp; creative work
      </h2>
      <div className="client-grid">
        {projects.webAndCreative.map((project) => (
          <CompactProject key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
