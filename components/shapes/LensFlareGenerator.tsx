"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { ShapeGeneratorProps } from './ShapeRegistry';
export const LensFlareGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation, seed } = config;

  const flares = Math.max(3, Math.min(10, count));
  
  // Generate flare elements along a diagonal
  const elements: { x: number; y: number; size: number; sides: number; opacity: number }[] = [];
  
  for (let i = 0; i < flares; i++) {
    const progress = (i / (flares - 1)) * 0.8 + 0.1;
    const x = 20 + progress * 60;
    const y = 20 + progress * 60;
    const size = radius * (0.1 + seededRandom(seed + i * 7) * 0.4);
    const sides = 6; // Hexagonal aperture shapes
    const opacity = 0.3 + seededRandom(seed + i * 13) * 0.4;
    elements.push({ x, y, size, sides, opacity });
  }

  // Generate hexagon path
  const hexPath = (cx: number, cy: number, r: number, sides: number) => {
    const points: string[] = [];
    for (let i = 0; i < sides; i++) {
      const angle = (i / sides) * Math.PI * 2 - Math.PI / 2;
      const x = cx + Math.cos(angle) * r;
      const y = cy + Math.sin(angle) * r;
      points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
    }
    return points.join(' ') + ' Z';
  };

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Main light source */}
      <circle
        cx={25}
        cy={25}
        r={radius * 0.25}
        fill={primaryColor}
        opacity={0.9}
      />
      
      {/* Flare elements */}
      {elements.map((el, i) => (
        <path
          key={i}
          d={hexPath(el.x, el.y, el.size, el.sides)}
          fill={i % 2 === 0 ? primaryColor : secondaryColor}
          opacity={el.opacity}
        />
      ))}
      
      {/* Light streaks */}
      <line
        x1={15}
        y1={15}
        x2={85}
        y2={85}
        stroke={primaryColor}
        strokeWidth={1}
        opacity={0.3}
      />
      <line
        x1={10}
        y1={25}
        x2={75}
        y2={90}
        stroke={secondaryColor}
        strokeWidth={0.5}
        opacity={0.2}
      />
    </g>
  );
};

