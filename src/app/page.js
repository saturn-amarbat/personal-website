"use client";

import { useEffect, useState } from "react";
import {
  ArrowUpRight,
  Briefcase,
  House,
  Link,
  Mail,
  MapPin,
  Rocket,
  ScrollText,
} from "lucide-react";

const CONFIG = {
  name: "Saturn Amarbat",
  role: "Software Engineer | UIC Computer Science",
  location: "Chicago, IL",
  graduation: "Dec 2026",
  email: "samarb2@uic.edu",
  githubUrl: "https://github.com/saturn-amarbat",
  linkedinUrl: "https://www.linkedin.com/in/saturn-amarbat-tech",
  calendarUrl:
    "https://calendar.google.com/calendar/u/1?cid=c2FuY2hpcmFtYXJAZ21haWwuY29t",
  resumeUrl: "/saturn_amarbat.pdf",
  pitch:
    "I build mobile-first products and AI-powered software systems. I focus on fast, production-ready delivery with clean architecture and measurable product outcomes.",
  currentFocus: [
    "Mobile app business and product execution",
    "AI agent integrations for real workflows",
    "SWE/ML internship preparation and shipping velocity",
  ],
  featuredProjects: [
    {
      title: "Trade Ops",
      summary:
        "Automated US stock momentum scanner with bull-flag detection and Discord alerts for a real day-trading workflow.",
      stack: ["Python", "Automation", "Discord API", "Trading Tools"],
      link: "https://github.com/saturn-amarbat/trade-ops",
      status: "Completed",
    },
    {
      title: "Trials Of Tempo (Mobile)",
      summary:
        "In-progress mobile version of my rhythm-action game, focused on game feel, performance tuning, and iterative shipping.",
      stack: ["JavaScript", "Mobile Web", "p5.js", "Game Systems"],
      link: "https://github.com/saturn-amarbat/Trials-Of-Tempo-The-Game-Mobile-version",
      status: "In Progress",
    },
    {
      title: "Personal Memory Allocator",
      summary:
        "Custom allocator in C with a fixed heap and manual allocation API to demonstrate low-level systems thinking and memory control.",
      stack: ["C", "Systems", "Memory Management", "Backend Foundations"],
      link: "https://github.com/saturn-amarbat/Personal_Project_Memory_Allocator",
      status: "Completed",
    },
  ],
};

const SECTION_COPY = {
  home: "Open for SWE/ML internships",
  projects: "Shipping polished software",
  focus: "Building AI-powered workflows",
  contact: "Lets build something real",
};

const NAV_ITEMS = [
  { id: "home", label: "Home", icon: House },
  { id: "projects", label: "Projects", icon: Briefcase },
  { id: "focus", label: "Focus", icon: Rocket },
  { id: "contact", label: "Contact", icon: Mail },
];

export default function Home() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const onScroll = () => {
      setIsScrolled(window.scrollY > 18);
      setScrollY(window.scrollY);

      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
      setScrollProgress(Math.min(1, Math.max(0, progress)));
    };

    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const nodes = document.querySelectorAll("[data-reveal]");
    if (!nodes.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
    );

    nodes.forEach((node) => observer.observe(node));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll("#home, #projects, #focus, #contact"),
    );
    if (!sections.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);

        if (visible[0]?.target?.id) {
          setActiveSection(visible[0].target.id);
        }
      },
      { threshold: [0.35, 0.55, 0.75], rootMargin: "-12% 0px -55% 0px" },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <header
        className={`sticky top-0 z-30 border-b transition-all ${
          isScrolled
            ? "border-cyan-400/20 bg-slate-950/95 backdrop-blur"
            : "border-transparent bg-transparent"
        }`}
      >
        <nav className="mx-auto flex w-full max-w-6xl items-center justify-between px-5 py-4 md:px-8">
          <a
            href="#home"
            className="nav-signal inline-flex items-center gap-3 rounded-full border border-cyan-300/25 px-3 py-1.5 transition hover:border-cyan-200/40"
          >
            <span className="nav-orbit" aria-hidden="true">
              <span className="nav-orbit-core" />
            </span>
            <span className="hidden text-left sm:block">
              <span className="block text-[10px] font-semibold uppercase tracking-[0.18em] text-cyan-300/95">
                {activeSection === "home" ? "Live Build" : "In Motion"}
              </span>
              <span
                key={activeSection}
                className="nav-copy-swap block text-[11px] text-slate-300/90"
              >
                {SECTION_COPY[activeSection] ?? SECTION_COPY.home}
              </span>
            </span>
          </a>

          <div className="hidden items-center gap-3 text-sm text-slate-300 md:flex">
            {NAV_ITEMS.filter((item) => item.id !== "home").map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={`rounded-full px-3 py-1.5 transition ${
                  activeSection === item.id
                    ? "bg-cyan-300/12 text-cyan-200"
                    : "hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
          </div>

          <a
            href={CONFIG.resumeUrl}
            className="inline-flex items-center gap-2 rounded-full border border-cyan-300/40 px-4 py-2 text-sm font-medium text-cyan-200 transition hover:border-cyan-200 hover:text-cyan-100"
          >
            Resume <ScrollText size={15} />
          </a>
        </nav>

        <div
          className="h-px bg-gradient-to-r from-cyan-300 via-sky-300 to-emerald-300 transition-[width] duration-200 ease-out"
          style={{ width: `${Math.round(scrollProgress * 100)}%` }}
          aria-hidden="true"
        />
      </header>

      <main className="mx-auto w-full max-w-6xl px-5 pb-[calc(7rem+env(safe-area-inset-bottom))] pt-10 md:px-8 md:pb-20 md:pt-16">
        <section
          id="home"
          data-reveal
          className="reveal scroll-mt-24 relative overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/30 p-8 md:p-12"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-cyan-400/20 blur-3xl"
            style={{ transform: `translateY(${scrollY * -0.09}px)` }}
          />
          <div
            className="pointer-events-none absolute -left-20 bottom-0 h-52 w-52 rounded-full bg-orange-300/10 blur-3xl"
            style={{ transform: `translateY(${scrollY * 0.05}px)` }}
          />

          <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-200">
            <Rocket size={14} /> Available for SWE internships
          </p>

          <p className="text-sm font-medium text-cyan-200/90">
            {CONFIG.name} • {CONFIG.role}
          </p>

          <h1 className="font-display max-w-3xl text-3xl font-bold leading-tight text-white md:text-5xl">
            Software engineer building mobile-first apps and practical AI
            integrations.
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-slate-300 md:text-lg">
            {CONFIG.pitch}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href={CONFIG.resumeUrl}
              className="inline-flex items-center gap-2 rounded-full bg-cyan-300 px-5 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-200"
            >
              Download Resume <ScrollText size={16} />
            </a>
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              View Projects <ArrowUpRight size={16} />
            </a>
            <a
              href={CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              GitHub <Link size={16} />
            </a>
            <a
              href={CONFIG.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-slate-700 px-5 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-slate-500"
            >
              LinkedIn <Link size={16} />
            </a>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Best starting point for recruiters: resume and featured projects.
          </p>

          <div className="mt-8 grid gap-3 text-sm text-slate-300 md:grid-cols-3">
            <p className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
              <Briefcase size={14} className="mr-2 inline" /> Target: SWE/ML
              Internships (Summer/Fall)
            </p>
            <p className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
              <MapPin size={14} className="mr-2 inline" /> {CONFIG.location}
            </p>
            <p className="rounded-xl border border-slate-800 bg-slate-900/60 px-3 py-2">
              Graduation: {CONFIG.graduation}
            </p>
          </div>
        </section>

        <section
          id="projects"
          data-reveal
          className="reveal reveal-delay-1 scroll-mt-24 mt-14"
        >
          <div className="mb-6 flex items-end justify-between">
            <h2 className="font-display text-2xl font-semibold text-white md:text-3xl">
              Featured Work
            </h2>
            <a
              href={CONFIG.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
            >
              Browse all repositories
            </a>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {CONFIG.featuredProjects.map((project) => (
              <article
                key={project.title}
                className="tilt-card rounded-2xl border border-slate-800 bg-slate-900/70 p-5 transition hover:border-cyan-300/40"
              >
                <div className="mb-3 flex items-center justify-between gap-2">
                  <h3 className="text-lg font-semibold text-white">
                    {project.title}
                  </h3>
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      project.status === "In Progress"
                        ? "bg-amber-400/20 text-amber-200"
                        : "bg-emerald-400/20 text-emerald-200"
                    }`}
                  >
                    {project.status}
                  </span>
                </div>
                <p className="min-h-20 text-sm leading-6 text-slate-300">
                  {project.summary}
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span
                      key={`${project.title}-${item}`}
                      className="rounded-full border border-slate-700 px-2.5 py-1 text-xs text-slate-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-cyan-300 transition hover:text-cyan-200"
                >
                  View project <ArrowUpRight size={15} />
                </a>
              </article>
            ))}
          </div>
        </section>

        <section
          id="focus"
          data-reveal
          className="reveal reveal-delay-2 scroll-mt-24 mt-14 grid gap-5 md:grid-cols-2"
        >
          <article className="tilt-card rounded-2xl border border-slate-800 bg-slate-900/70 p-6">
            <h2 className="font-display text-2xl font-semibold text-white">
              Current Specialization
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              AI-native mobile product engineering: shipping mobile app ideas,
              integrating AI agents into workflows, and scaling toward full
              product ownership.
            </p>
            <ul className="mt-4 space-y-2 text-sm text-slate-200">
              {CONFIG.currentFocus.map((focus) => (
                <li
                  key={focus}
                  className="rounded-lg border border-slate-800 bg-slate-900 px-3 py-2"
                >
                  {focus}
                </li>
              ))}
            </ul>
          </article>

          <article
            id="contact"
            className="tilt-card scroll-mt-24 rounded-2xl border border-slate-800 bg-slate-900/70 p-6"
          >
            <h2 className="font-display text-2xl font-semibold text-white">
              Contact
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-300">
              Open to SWE/ML internship opportunities, product engineering
              roles, and high-output project collaboration.
            </p>
            <div className="mt-5 space-y-3 text-sm">
              <a
                href={`mailto:${CONFIG.email}`}
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 transition hover:border-cyan-300/40"
              >
                <span className="inline-flex items-center gap-2">
                  <Mail size={15} /> {CONFIG.email}
                </span>
                <ArrowUpRight size={15} />
              </a>
              <a
                href={CONFIG.linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 transition hover:border-cyan-300/40"
              >
                <span className="inline-flex items-center gap-2">
                  <Link size={15} /> LinkedIn
                </span>
                <ArrowUpRight size={15} />
              </a>
              <a
                href={CONFIG.calendarUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 px-4 py-3 text-slate-100 transition hover:border-cyan-300/40"
              >
                <span className="inline-flex items-center gap-2">
                  <Rocket size={15} /> Calendar / Availability
                </span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </article>
        </section>
      </main>

      <nav className="fixed inset-x-0 bottom-[calc(0.75rem+env(safe-area-inset-bottom))] z-40 mx-auto w-[94%] max-w-md rounded-2xl border border-slate-700/70 bg-slate-900/90 p-2 backdrop-blur md:hidden">
        <ul className="grid grid-cols-4 gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            return (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2 py-2 text-[10px] transition ${
                    activeSection === item.id
                      ? "bg-cyan-300/15 text-cyan-200"
                      : "text-slate-300 hover:bg-slate-800/80"
                  }`}
                >
                  <Icon size={14} />
                  <span className="leading-none">{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
