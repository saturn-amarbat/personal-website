import { profile } from "@/content/profile";

export default function manifest() {
  return {
    name: `${profile.name} | Software Engineer`,
    short_name: "Saturn",
    description: `Full-stack, mobile, and applied AI engineering. UIC CS, expected ${profile.graduation}.`,
    start_url: "/",
    display: "standalone",
    background_color: "#101111",
    theme_color: "#101111",
    lang: "en",
    icons: [{ src: "/icon.svg", sizes: "any", type: "image/svg+xml" }],
  };
}
