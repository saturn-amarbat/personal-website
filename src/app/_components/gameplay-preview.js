"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { MediaDialog } from "./media-dialog";

export function GameplayPreview({ preview }) {
  const videoRef = useRef(null);
  const toggleRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    const toggle = toggleRef.current;
    // Keep the native controls available when JavaScript is disabled.
    video.controls = false;
    toggle.hidden = false;
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    function syncMotion() {
      video.loop = !motion.matches;
      if (motion.matches) video.pause();
    }
    function pauseWhenHidden() {
      if (document.hidden) video.pause();
    }
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) video.pause();
    });
    syncMotion();
    observer.observe(video);
    motion.addEventListener("change", syncMotion);
    document.addEventListener("visibilitychange", pauseWhenHidden);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", syncMotion);
      document.removeEventListener("visibilitychange", pauseWhenHidden);
      video.controls = true;
      toggle.hidden = true;
    };
  }, []);

  async function togglePreview() {
    const video = videoRef.current;
    if (video.paused) {
      try {
        await video.play();
      } catch (error) {
        if (error.name !== "AbortError") setFailed(true);
      }
    } else {
      video.pause();
    }
  }

  return (
    <figure className="gameplay-preview">
      <div className="media-viewport">
        <video
          className="media-content"
          ref={videoRef}
          controls
          muted
          playsInline
          preload="none"
          poster={preview.poster}
          width={preview.width}
          height={preview.height}
          aria-label="Trials of Tempo browser gameplay"
          aria-describedby="tempo-caption-copy"
          onPlay={() => setPlaying(true)}
          onPause={() => setPlaying(false)}
          onError={() => setFailed(true)}
        >
          <source src={preview.src} type="video/mp4" />
        </video>
      </div>
      <figcaption id="tempo-caption">
        <button
          ref={toggleRef}
          type="button"
          hidden
          disabled={failed}
          onClick={togglePreview}
        >
          {playing ? (
            <Pause size={14} aria-hidden="true" />
          ) : (
            <Play size={14} aria-hidden="true" />
          )}
          {failed
            ? "Preview unavailable"
            : playing
              ? "Pause preview"
              : "Play preview"}
        </button>
        <MediaDialog
          id="tempo"
          title="Trials of Tempo browser gameplay"
          label="Enlarge gameplay preview"
          preview={preview}
          onOpen={() => videoRef.current.pause()}
        />
        <span id="tempo-caption-copy">
          Browser gameplay · Dodge obstacles and collect points as the tempo
          rises.
        </span>
      </figcaption>
    </figure>
  );
}
