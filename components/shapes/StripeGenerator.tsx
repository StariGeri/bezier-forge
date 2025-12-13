"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const StripeGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, primaryColor, strokeWidth, rotation } = config;

  const stripes = Math.max(2, count);
  const spacing = 100 / (stripes + 1);
  const cx = 50;
  const cy = 50;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {Array.from({ length: stripes }).map((_, i) => {
        const y = spacing * (i + 1);
        return (
          <line
            key={i}
            x1={0}
            y1={y}
            x2={100}
            y2={y}
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
          />
        );
      })}
    </g>
  );
};

