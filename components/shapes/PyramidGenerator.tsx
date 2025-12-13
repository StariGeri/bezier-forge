"use client";

import { useEditorStore } from '@/store/use-store';
import { isometricToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const PyramidGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor } = config;

  const levels = Math.max(3, count);
  const step = radius / levels;

  return (
    <g>
        {Array.from({ length: levels }).map((_, i) => {
            // Draw from bottom up or top down? Top down (smallest) is better for z-index
            const level = levels - 1 - i;
            const size = (level + 1) * step;
            
            // Base square at z = height
            const t1 = isometricToCartesian(-size, -size, 0, 50, 50 + (level * 5)); // Manual y-shift for stacking
            const t2 = isometricToCartesian(size, -size, 0, 50, 50 + (level * 5));
            const t3 = isometricToCartesian(size, size, 0, 50, 50 + (level * 5));
            const t4 = isometricToCartesian(-size, size, 0, 50, 50 + (level * 5));
            
            return (
                <path
                    key={i}
                    d={`M ${t1.x} ${t1.y} L ${t2.x} ${t2.y} L ${t3.x} ${t3.y} L ${t4.x} ${t4.y} Z`}
                    fill={i % 2 === 0 ? primaryColor : secondaryColor}
                    stroke="white"
                    strokeWidth={1}
                />
            )
        })}
    </g>
  );
};

