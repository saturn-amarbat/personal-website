import "./globals.css";
import { profile } from "@/content/profile";

const title = `${profile.name} | ${profile.role}`;
const description = `${profile.name} studies computer science at ${profile.school} (expected ${profile.graduation}). Open to ${profile.internshipTarget} SWE internships and ${profile.newGradTarget} new-grad roles.`;
const siteUrl = "https://www.saturnmade.tech";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: `%s | ${profile.name}` },
  description,
  authors: [{ name: profile.name }],
  alternates: { canonical: siteUrl },
  openGraph: {
    title,
    description,
    url: siteUrl,
    siteName: profile.name,
    locale: "en_US",
    type: "website",
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
