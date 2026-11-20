"use client";

import { Maximize2, Play, X } from "lucide-react";
import { useEffect, useRef } from "react";

export function allowsAutoPreview() {
  return (
    !navigator.connection?.saveData &&
    !window.matchMedia(
      "(prefers-reduced-motion: reduce), (prefers-reduced-data: reduce)",
    ).matches
  );
}

export function MediaDialog({
  id,
  title,
  preview,
  label,
  links,
  onOpen,
  autoPlay = false,
}) {
  const dialog = useRef(null);
  const player = useRef(null);
  const trigger = useRef(null);
  const playButton = useRef(null);
  const feedback = useRef(null);

  useEffect(() => {
    const video = player.current;
    trigger.current.hidden = typeof dialog.current.showModal !== "function";
    function pauseHidden() {
      if (document.hidden) video.pause();
    }
    document.addEventListener("visibilitychange", pauseHidden);
    return () => document.removeEventListener("visibilitychange", pauseHidden);
  }, []);

  function play() {
    const video = player.current;
    if (!video.hasAttribute("src")) video.src = preview.src;
    video
      .play()
      .then(() => {
        if (document.activeElement === playButton.current) video.focus();
        playButton.current.hidden = true;
      })
      .catch((error) => {
        if (error.name === "NotAllowedError") playButton.current.hidden = false;
      });
  }

  function open() {
    onOpen?.();
    dialog.current.showModal();
    if (player.current.readyState > 0) player.current.currentTime = 0;
    const start = autoPlay && allowsAutoPreview();
    playButton.current.hidden = start;
    if (start) play();
  }

  const Icon = autoPlay ? Play : Maximize2;
  return (
    <>
      <button
        ref={trigger}
        className="text-link preview-toggle"
        type="button"
        hidden
        onClick={open}
        aria-haspopup="dialog"
        aria-label={label}
      >
        <Icon size={14} aria-hidden="true" />
        {autoPlay ? "Preview" : "Enlarge"}
      </button>
      <dialog
        ref={dialog}
        className="website-preview-dialog"
        aria-labelledby={id + "-preview-title"}
        onClose={() => player.current.pause()}
      >
        <div className="website-preview-heading">
          <h3 id={id + "-preview-title"}>{title}</h3>
          <button
            type="button"
            className="text-link preview-toggle"
            onClick={() => dialog.current.close()}
          >
            <X size={16} aria-hidden="true" /> Close
          </button>
        </div>
        <video
          ref={player}
          controls
          muted
          playsInline
          preload="none"
          width={preview.width}
          height={preview.height}
          poster={preview.poster}
          aria-label={title}
          onError={() => {
            feedback.current.hidden = false;
          }}
        />
        <p ref={feedback} role="status" hidden>
          Preview unavailable.
        </p>
        <div className="project-links">
          <button
            ref={playButton}
            type="button"
            className="text-link preview-toggle"
            hidden
            onClick={play}
          >
            <Play size={14} aria-hidden="true" /> Play recording
          </button>
          {links}
        </div>
      </dialog>
    </>
  );
}
