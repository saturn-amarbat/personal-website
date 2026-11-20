"use client";

import { useEffect } from "react";

export function ScrollReveals() {
  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;

    const motion = window.matchMedia("(prefers-reduced-motion: no-preference)");
    const inset = Math.round(Math.min(window.innerHeight * 0.27, 220));
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          observer.unobserve(entry.target);
          entry.target.classList.remove("awaiting-entry");
          if (motion.matches && !entry.target.matches(":focus-within")) {
            entry.target.classList.add("entered");
          }
        }
      },
      { rootMargin: `0px 0px -${inset}px 0px` },
    );

    for (const element of document.querySelectorAll("[data-reveal]")) {
      // Leave content already in the reading area in its settled position.
      const { top, bottom } = element.getBoundingClientRect();
      if (bottom <= 0 || top >= window.innerHeight - inset) {
        if (
          top >= window.innerHeight - inset &&
          element.dataset.reveal === "block" &&
          !window.location.hash &&
          motion.matches
        ) {
          element.classList.add("awaiting-entry");
        }
        observer.observe(element);
      }
    }

    function finishReveal(event) {
      if (event.animationName === "enter-section") {
        event.target.classList.remove("entered");
      }
    }
    document.addEventListener("animationend", finishReveal);
    document.addEventListener("animationcancel", finishReveal);
    return () => {
      observer.disconnect();
      document.removeEventListener("animationend", finishReveal);
      document.removeEventListener("animationcancel", finishReveal);
    };
  }, []);

  return null;
}
