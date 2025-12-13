"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const HeartGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const scale = radius / 30;
  
  // Heart shape using bezier curves, centered at 50,50
  const path = `
    M 50 ${50 + 25 * scale}
    C 50 ${50 + 20 * scale}, ${50 - 10 * scale} ${50 + 10 * scale}, ${50 - 25 * scale} ${50 - 5 * scale}
    C ${50 - 40 * scale} ${50 - 20 * scale}, ${50 - 25 * scale} ${50 - 35 * scale}, 50 ${50 - 15 * scale}
    C ${50 + 25 * scale} ${50 - 35 * scale}, ${50 + 40 * scale} ${50 - 20 * scale}, ${50 + 25 * scale} ${50 - 5 * scale}
    C ${50 + 10 * scale} ${50 + 10 * scale}, 50 ${50 + 20 * scale}, 50 ${50 + 25 * scale}
    Z
  `;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      <path
        d={path}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
    </g>
  );
};

