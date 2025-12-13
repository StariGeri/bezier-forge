import type { Metadata } from "next";

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ shapeId: string }> 
}): Promise<Metadata> {
  const { shapeId } = await params;
  const shapeName = shapeId
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return {
    title: `${shapeName} Editor`,
    description: `Create and customize your unique ${shapeName} logo with real-time parameter controls. Adjust colors, rotation, complexity, and more. Export to SVG or PNG at any resolution.`,
    openGraph: {
      title: `${shapeName} Editor | BezierForge`,
      description: `Create and customize your unique ${shapeName} logo with real-time parameter controls. Export to SVG or PNG at any resolution.`,
      url: `/editor/${shapeId}`,
    },
    twitter: {
      title: `${shapeName} Editor | BezierForge`,
      description: `Create and customize your unique ${shapeName} logo with real-time parameter controls. Export to SVG or PNG at any resolution.`,
    },
  };
}

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

