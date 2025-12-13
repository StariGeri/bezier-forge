"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';
import { ShapeGeneratorProps } from './ShapeRegistry';

let keyCounter = 0;

export const CoralGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth, seed } = config;

  const branches = Math.max(3, count);
  const cx = 50;
  const cy = 70; // Start from bottom

  // Reset counter for each render
  keyCounter = 0;

  const generateBranch = (startX: number, startY: number, angle: number, length: number, depth: number, branchSeed: number): React.ReactElement[] => {
    if (depth <= 0 || length < 3) return [];

    const endX = startX + Math.cos((angle * Math.PI) / 180) * length;
    const endY = startY - Math.sin((angle * Math.PI) / 180) * length;

    const currentKey = keyCounter++;

    const elements: React.ReactElement[] = [
      <line
        key={`branch-${currentKey}`}
        x1={startX}
        y1={startY}
        x2={endX}
        y2={endY}
        stroke={primaryColor}
        strokeWidth={strokeWidth * (depth / 3)}
        strokeLinecap="round"
      />
    ];

    // Add sub-branches
    const leftAngle = angle + 25 + seededRandom(branchSeed + 1) * 20;
    const rightAngle = angle - 25 - seededRandom(branchSeed + 2) * 20;
    const newLength = length * (0.6 + seededRandom(branchSeed + 3) * 0.2);

    elements.push(...generateBranch(endX, endY, leftAngle, newLength, depth - 1, branchSeed + 10));
    elements.push(...generateBranch(endX, endY, rightAngle, newLength, depth - 1, branchSeed + 20));

    return elements;
  };

  return (
    <g>
      {Array.from({ length: branches }).map((_, i) => {
        const startAngle = 60 + (60 / branches) * i;
        const branchLength = radius * 0.8;
        return generateBranch(cx, cy, startAngle, branchLength, 3, seed + i * 100);
      })}
    </g>
  );
};
