"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const WaveformGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, rotation, seed } = config;

  // Generate waveform path based on count (frequency) and seed (variation)
  const frequency = Math.max(2, count);
  const amplitude = radius * 0.6;
  const points: string[] = [];
  const resolution = 100;

  for (let i = 0; i <= resolution; i++) {
    const x = (i / resolution) * 80 + 10; // 10 to 90 range
    const t = (i / resolution) * Math.PI * 2 * (frequency / 4);
    // Add some variation based on seed
    const variation = Math.sin(t * 0.5 + seed) * 0.3;
    const y = 50 + Math.sin(t + seed * 0.1) * amplitude * (0.7 + variation);
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  const pathData = points.join(' ');

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      <path
        d={pathData}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

