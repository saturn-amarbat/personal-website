"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { allowsAutoPreview, MediaDialog } from "./media-dialog";

export function WebsitePreview({
  id,
  title,
  artwork,
  preview,
  links,
  children,
}) {
  const article = useRef(null);
  const inlineVideo = useRef(null);
  const observer = useRef(null);
  const timer = useRef(null);

  function cancelTimer() {
    window.clearTimeout(timer.current);
  }

  function closeInline() {
    cancelTimer();
    delete article.current.dataset.expanded;
    observer.current?.unobserve(inlineVideo.current);
    inlineVideo.current.pause();
  }

  useEffect(() => {
    const card = article.current;
    const video = inlineVideo.current;
    const preference = window.matchMedia(
      "(prefers-reduced-motion: reduce), (prefers-reduced-data: reduce)",
    );
    const connection = navigator.connection;

    function reset() {
      window.clearTimeout(timer.current);
      delete card.dataset.expanded;
      observer.current?.unobserve(video);
      video.pause();
    }
    function updatePreference() {
      if (!allowsAutoPreview()) reset();
    }
    function pauseHidden() {
      if (document.hidden) reset();
    }
    if ("IntersectionObserver" in window) {
      observer.current = new IntersectionObserver(
        ([entry]) => {
          if (!card.hasAttribute("data-expanded")) return;
          if (entry.intersectionRatio >= 0.2) {
            if (!video.hasAttribute("src")) video.src = preview.src;
            video.play().catch((error) => {
              if (error.name !== "AbortError") reset();
            });
          } else {
            video.pause();
          }
        },
        { threshold: 0.2 },
      );
    }

    document.addEventListener("visibilitychange", pauseHidden);
    preference.addEventListener("change", updatePreference);
    connection?.addEventListener("change", updatePreference);
    return () => {
      reset();
      observer.current?.disconnect();
      document.removeEventListener("visibilitychange", pauseHidden);
      preference.removeEventListener("change", updatePreference);
      connection?.removeEventListener("change", updatePreference);
    };
  }, [preview.src]);

  function enterThumbnail(event) {
    if (
      event.pointerType !== "mouse" ||
      !window.matchMedia("(hover: hover)").matches
    )
      return;
    cancelTimer();
    if (!observer.current || article.current.hasAttribute("data-expanded"))
      return;
    timer.current = window.setTimeout(() => {
      if (!allowsAutoPreview() || document.hidden) return;
      article.current.dataset.expanded = "";
      observer.current.observe(inlineVideo.current);
    }, 150);
  }

  function scheduleClose() {
    cancelTimer();
    if (article.current.hasAttribute("data-expanded")) {
      timer.current = window.setTimeout(closeInline, 240);
    }
  }

  return (
    <article ref={article} aria-labelledby={id} className="website-project">
      <div
        className="project-thumbnail media-viewport"
        onPointerEnter={enterThumbnail}
        onPointerLeave={scheduleClose}
      >
        <Image {...artwork} alt={artwork.alt} unoptimized />
      </div>
      <h3 id={id}>{title}</h3>
      {children}
      <div className="project-links">
        {links}
        <MediaDialog
          id={id}
          title={title}
          label={`Preview ${title}`}
          preview={preview}
          links={links}
          autoPlay
          onOpen={closeInline}
        />
      </div>
      <div className="website-inline" aria-hidden="true">
        <div
          className="media-viewport"
          onPointerEnter={cancelTimer}
          onPointerLeave={scheduleClose}
        >
          <video
            ref={inlineVideo}
            preload="none"
            muted
            playsInline
            poster={preview.poster}
            width={preview.width}
            height={preview.height}
          />
        </div>
      </div>
    </article>
  );
}
