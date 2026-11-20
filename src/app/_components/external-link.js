import { ArrowUpRight } from "lucide-react";

export function ExternalLink({ href, children, label }) {
  return (
    <a
      href={href}
      className="text-link"
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
      <ArrowUpRight size={15} aria-hidden="true" />
    </a>
  );
}
