"use client";

import { useEditorStore } from '@/store/use-store';

export const DNAGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const twists = Math.max(1, Math.floor(count / 3));
  const resolution = 60;
  const amplitude = radius * 0.4;
  const verticalSpan = 70;
  const startY = 15;

  // Generate the two helix strands
  const strand1Points: string[] = [];
  const strand2Points: string[] = [];
  const rungs: { x1: number; y1: number; x2: number; y2: number }[] = [];

  for (let i = 0; i <= resolution; i++) {
    const progress = i / resolution;
    const y = startY + progress * verticalSpan;
    const angle = progress * Math.PI * 2 * twists;
    
    const x1 = 50 + Math.sin(angle) * amplitude;
    const x2 = 50 + Math.sin(angle + Math.PI) * amplitude;
    
    strand1Points.push(`${i === 0 ? 'M' : 'L'} ${x1.toFixed(2)} ${y.toFixed(2)}`);
    strand2Points.push(`${i === 0 ? 'M' : 'L'} ${x2.toFixed(2)} ${y.toFixed(2)}`);

    // Add rungs at regular intervals
    if (i % Math.floor(resolution / (twists * 4 + 2)) === 0 && i > 0 && i < resolution) {
      rungs.push({ x1, y1: y, x2, y2: y });
    }
  }

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Rungs (base pairs) */}
      {rungs.map((rung, i) => (
        <line
          key={`rung-${i}`}
          x1={rung.x1}
          y1={rung.y1}
          x2={rung.x2}
          y2={rung.y2}
          stroke={secondaryColor}
          strokeWidth={strokeWidth * 0.8}
          strokeLinecap="round"
        />
      ))}
      {/* Strand 1 */}
      <path
        d={strand1Points.join(' ')}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      {/* Strand 2 */}
      <path
        d={strand2Points.join(' ')}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
};

