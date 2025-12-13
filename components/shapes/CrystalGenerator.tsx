"use client";

import { useEditorStore } from '@/store/use-store';

export const CrystalGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const facets = Math.max(4, Math.min(8, count));
  const height = radius * 1.8;
  const width = radius * 0.8;
  
  // Crystal vertices
  const top = { x: 50, y: 50 - height / 2 };
  const bottom = { x: 50, y: 50 + height / 2 };
  const middle = 50 - height * 0.1; // Slightly above center
  
  // Generate side vertices
  const sidePoints: { x: number; y: number }[] = [];
  for (let i = 0; i < facets; i++) {
    const angle = (i / facets) * Math.PI * 2 - Math.PI / 2;
    const x = 50 + Math.cos(angle) * width;
    const y = middle + Math.sin(angle) * width * 0.4;
    sidePoints.push({ x, y });
  }

  // Create outer polygon path
  const outerPath = [
    `M ${top.x} ${top.y}`,
    ...sidePoints.slice(0, Math.ceil(facets / 2) + 1).map(p => `L ${p.x} ${p.y}`),
    `L ${bottom.x} ${bottom.y}`,
    ...sidePoints.slice(Math.ceil(facets / 2)).reverse().map(p => `L ${p.x} ${p.y}`),
    'Z'
  ].join(' ');

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Crystal body */}
      <path
        d={outerPath}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      
      {/* Internal facet lines */}
      {sidePoints.map((point, i) => (
        <g key={i}>
          <line
            x1={top.x}
            y1={top.y}
            x2={point.x}
            y2={point.y}
            stroke={primaryColor}
            strokeWidth={strokeWidth * 0.5}
            opacity={0.5}
          />
          <line
            x1={bottom.x}
            y1={bottom.y}
            x2={point.x}
            y2={point.y}
            stroke={primaryColor}
            strokeWidth={strokeWidth * 0.5}
            opacity={0.5}
          />
        </g>
      ))}
    </g>
  );
};

