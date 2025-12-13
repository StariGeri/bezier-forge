import type { Metadata, Viewport } from "next";
import { Toaster } from "@/components/ui/sonner"
import { Geist, Geist_Mono, Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({subsets:['latin'],variable:'--font-sans'});

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BezierForge - Generative SVG Logo Engine",
    template: "%s | BezierForge",
  },
  description: "An open-source, browser-based tool for creating unique, algorithmically-generated SVG logos and graphics. Stop dragging pixels. Start forging parameters.",
  keywords: [
    "SVG generator",
    "logo maker",
    "parametric design",
    "generative art",
    "SVG editor",
    "logo design tool",
    "algorithmic design",
    "vector graphics",
    "open source",
    "bezier curves",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
  ],
  authors: [{ name: "BezierForge Team" }],
  creator: "BezierForge",
  publisher: "BezierForge",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "BezierForge - Generative SVG Logo Engine",
    description: "An open-source, browser-based tool for creating unique, algorithmically-generated SVG logos and graphics. Stop dragging pixels. Start forging parameters.",
    siteName: "BezierForge",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "BezierForge - Generative SVG Logo Engine",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Toaster />
      </body>
    </html>
  );
}
