export default function manifest() {
  return {
    name: "Saturn Amarbat Portfolio",
    short_name: "Saturn",
    description:
      "Portfolio of Saturn Amarbat, software engineer focused on mobile-first and AI-integrated products.",
    start_url: "/",
    display: "standalone",
    background_color: "#050913",
    theme_color: "#050913",
    lang: "en",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
