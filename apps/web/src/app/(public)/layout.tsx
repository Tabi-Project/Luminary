import { NavBar } from "@/components/nav-bar";
import { Providers } from "@/components/providers";
import "../globals.css";
import type { Metadata } from "next";
import { Raleway } from "next/font/google";

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  display: "swap",
});

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
const siteName = "Luminary";
const siteDescription =
  "Discover Luminary, a platform celebrating women making global impact through a searchable directory and curated news across industries.";
const keywords = [
  "Luminary",
  "Women",
  "Impact",
  "Directory",
  "News",
  "Community",
  "Awards",
  "Awareness",
  "Nonprofit",
  "Non-Profit",
  "International Womens Day",
];
const siteAuthors = [
  {
    name: "Isaac Shosanya",
    url: "https://vaden.is-a.dev",
  },
  {
    name: "Michael Omonedo",
    url: "",
  },
  {
    name: "Ramnan Ramyii",
    url: "",
  },
  {
    name: "Awoyemi Abiola",
    url: "",
  },
  {
    name: "Daniel Chisom",
    url: "",
  },
  {
    name: "Emmanuel Dania",
    url: "",
  },
];

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: siteName,
    template: `%s | ${siteName}`,
  },
  alternates: {
    canonical: baseUrl,
  },
  keywords: keywords,
  authors: siteAuthors,
  creator: "Tabi Project",
  publisher: "Isaac Shosanya",
  description: siteDescription,
  category: "Community/Non-Profit",
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: baseUrl,
    title: siteName,
    description: siteDescription,
  },
  twitter: {
    card: "summary_large_image",
    site: "@vadenisisaac", //Replace with tabi project twitter handle
    creator: "@vadenisisaac",
    title: siteName,
    description: siteDescription,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${raleway.variable} h-full antialiased`}>
      <body className="min-h-full">
        <Providers>
          <NavBar />
          <main className="flex flex-col items-center">{children}</main>
        </Providers>
      </body>
    </html>
  );
}
