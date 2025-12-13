"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const MountainGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, seed } = config;

  const peaks = Math.max(2, Math.min(count, 5));
  const baseY = 75;

  const generateMountainPath = (layer: number) => {
    const points: string[] = [`M 0 ${baseY}`];
    const heightFactor = 1 - layer * 0.3;

    for (let i = 0; i < peaks; i++) {
      const peakX = 10 + (80 / (peaks - 1 || 1)) * i + seededRandom(seed + i + layer * 100) * 10;
      const peakY = baseY - radius * heightFactor * (0.6 + seededRandom(seed + i + 50 + layer * 100) * 0.4);
      
      // Valley before peak
      if (i > 0) {
        const valleyX = peakX - 15 - seededRandom(seed + i + 200 + layer * 100) * 10;
        const valleyY = baseY - radius * 0.2 * heightFactor;
        points.push(`L ${valleyX} ${valleyY}`);
      }
      
      points.push(`L ${peakX} ${peakY}`);
    }

    points.push(`L 100 ${baseY}`);
    points.push('Z');

    return points.join(' ');
  };

  return (
    <g>
      <path d={generateMountainPath(1)} fill={secondaryColor} opacity={0.5} />
      <path d={generateMountainPath(0)} fill={primaryColor} />
    </g>
  );
};

