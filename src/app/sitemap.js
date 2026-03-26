export default function sitemap() {
  const baseUrl = "https://www.saturnmade.tech";

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
