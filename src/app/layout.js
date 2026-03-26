import { Space_Grotesk, Syne } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
  weight: ["600", "700", "800"],
});

export const metadata = {
  metadataBase: new URL("https://www.saturnmade.tech"),
  title: {
    default: "Saturn Amarbat | Software Engineer",
    template: "%s | Saturn Amarbat",
  },
  description:
    "Portfolio of Saturn Amarbat, a UIC Computer Science student building mobile-first software and AI-integrated products.",
  keywords: [
    "Saturn Amarbat",
    "software engineer portfolio",
    "UIC computer science",
    "mobile app developer",
    "AI integration",
    "SWE internship",
  ],
  authors: [{ name: "Saturn Amarbat", url: "https://www.saturnmade.tech" }],
  creator: "Saturn Amarbat",
  alternates: {
    canonical: "https://www.saturnmade.tech",
  },
  openGraph: {
    title: "Saturn Amarbat | Software Engineer",
    description:
      "Mobile-first software engineer building practical AI-integrated products. Open to SWE and ML internships.",
    url: "https://www.saturnmade.tech",
    siteName: "Saturn Amarbat Portfolio",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Saturn Amarbat portfolio preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Saturn Amarbat | Software Engineer",
    description:
      "Mobile-first software engineer building practical AI-integrated products. Open to SWE and ML internships.",
    images: ["/twitter-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${syne.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
