import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery - Explore 80+ Generative Shapes",
  description: "Browse our complete collection of 80+ parametric shape generators. From geometric patterns to organic blobs, cosmic effects to cultural motifs. Every shape is a starting point for your unique identity.",
  openGraph: {
    title: "Gallery - Explore 80+ Generative Shapes | BezierForge",
    description: "Browse our complete collection of 80+ parametric shape generators. From geometric patterns to organic blobs, cosmic effects to cultural motifs.",
    url: "/gallery",
  },
  twitter: {
    title: "Gallery - Explore 80+ Generative Shapes | BezierForge",
    description: "Browse our complete collection of 80+ parametric shape generators. From geometric patterns to organic blobs, cosmic effects to cultural motifs.",
  },
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

