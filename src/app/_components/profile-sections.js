import Image from "next/image";
import { ArrowDown, ArrowUpRight, Download, MapPin, Plus } from "lucide-react";
import { experience, profile } from "@/content/profile";
import { ExternalLink } from "./external-link";

export function Hero() {
  return (
    <section id="home" className="hero" aria-labelledby="hero-title">
      <div className="introduction tile" data-hero-assembly>
        <p className="eyebrow">
          <span className="accent-line" />
          Engineering portfolio
        </p>
        <h1 id="hero-title">
          {profile.name.split(" ")[0]}{" "}
          <em>{profile.name.split(" ").slice(1).join(" ")}</em>
        </h1>
        <p className="positioning">{profile.role}</p>
        <p className="hero-summary">{profile.summary}</p>
        <div className="hero-actions">
          <a href={profile.resumeUrl} className="button primary" download>
            Download Résumé <Download size={16} aria-hidden="true" />
          </a>
          <a href="#projects" className="button">
            View projects <ArrowDown size={16} aria-hidden="true" />
          </a>
          <a href={`mailto:${profile.email}`} className="button">
            Email me
          </a>
        </div>
        <p className="hero-foot">
          Open to {profile.internshipTarget} SWE internships and{" "}
          {profile.newGradTarget} new-grad software engineering roles.
        </p>
      </div>
      <div className="profile-tile tile" data-hero-assembly>
        <div className="portrait">
          <Image
            src="/media/saturn.webp"
            alt="Saturn Amarbat"
            width={640}
            height={640}
            sizes="(max-width: 680px) 100vw, 42vw"
            preload
          />
        </div>
        <div className="profile-bar">
          <span className="location">
            <MapPin size={15} aria-hidden="true" />
            {profile.location}
          </span>
          <div className="profile-links">
            <ExternalLink href={profile.githubUrl}>GitHub</ExternalLink>
            <ExternalLink href={profile.linkedinUrl}>LinkedIn</ExternalLink>
          </div>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="section" aria-labelledby="about-title" data-reveal>
      <h2 id="about-title" className="section-heading">
        About
      </h2>
      <div className="about-copy">
        {profile.about.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="education">
        <p>{profile.school}</p>
        <p>
          {profile.degree} · Expected {profile.graduation}
        </p>
      </div>
    </section>
  );
}

function RoleEntry({ role, organization, dates, responsibilities }) {
  return (
    <li className="experience-entry">
      <div>
        <h3>{role}</h3>
        <p>{organization}</p>
        <p className="experience-dates">{dates}</p>
      </div>
      {responsibilities && (
        <ul className="responsibilities">
          {responsibilities.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      )}
    </li>
  );
}

export function Experience() {
  const [currentRole, ...earlierRoles] = experience;
  return (
    <section
      id="experience"
      data-reveal
      className="section"
      aria-labelledby="experience-title"
    >
      <h2 id="experience-title" className="section-heading">
        Experience
      </h2>
      <ul className="experience-list">
        <RoleEntry {...currentRole} />
      </ul>
      <details className="earlier-roles">
        <summary>
          Earlier roles <Plus size={15} aria-hidden="true" />
        </summary>
        <ul>
          {earlierRoles.map((entry) => (
            <RoleEntry key={entry.role} {...entry} />
          ))}
        </ul>
      </details>
    </section>
  );
}

export function Contact() {
  return (
    <section
      id="contact"
      className="section contact"
      aria-labelledby="contact-title"
    >
      <div>
        <h2 id="contact-title">Get in touch</h2>
        <a className="contact-email" href={`mailto:${profile.email}`}>
          {profile.email}
          <ArrowUpRight size={24} aria-hidden="true" />
        </a>
      </div>
      <div className="contact-links">
        <ExternalLink href={profile.githubUrl}>GitHub</ExternalLink>
        <ExternalLink href={profile.linkedinUrl}>LinkedIn</ExternalLink>
      </div>
    </section>
  );
}
