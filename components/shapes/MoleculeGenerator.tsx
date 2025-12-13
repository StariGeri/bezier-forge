"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const MoleculeGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation, seed } = config;

  const atoms = Math.max(3, Math.min(8, count));
  const atomRadius = radius * 0.12;
  
  // Generate atom positions in a connected arrangement
  const positions: { x: number; y: number; size: number }[] = [];
  const bonds: { from: number; to: number }[] = [];
  
  // Central atom
  positions.push({ x: 50, y: 50, size: atomRadius * 1.3 });
  
  // Surrounding atoms
  for (let i = 1; i < atoms; i++) {
    const angle = ((i - 1) / (atoms - 1)) * Math.PI * 2 + seededRandom(seed + i) * 0.5;
    const dist = radius * (0.5 + seededRandom(seed + i * 7) * 0.5);
    const x = 50 + Math.cos(angle) * dist;
    const y = 50 + Math.sin(angle) * dist;
    const size = atomRadius * (0.7 + seededRandom(seed + i * 13) * 0.6);
    positions.push({ x, y, size });
    
    // Connect to central or previous atom
    if (i <= 3) {
      bonds.push({ from: 0, to: i });
    } else {
      bonds.push({ from: Math.floor(seededRandom(seed + i * 3) * i), to: i });
    }
  }

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Bonds */}
      {bonds.map((bond, i) => (
        <line
          key={`bond-${i}`}
          x1={positions[bond.from].x}
          y1={positions[bond.from].y}
          x2={positions[bond.to].x}
          y2={positions[bond.to].y}
          stroke={primaryColor}
          strokeWidth={strokeWidth}
          strokeLinecap="round"
        />
      ))}
      
      {/* Atoms */}
      {positions.map((pos, i) => (
        <circle
          key={`atom-${i}`}
          cx={pos.x}
          cy={pos.y}
          r={pos.size}
          fill={i === 0 ? primaryColor : secondaryColor}
          stroke={primaryColor}
          strokeWidth={strokeWidth * 0.5}
        />
      ))}
    </g>
  );
};

