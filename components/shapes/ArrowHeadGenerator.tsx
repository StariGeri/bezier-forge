"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const ArrowHeadGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, rotation } = config;

  const arrows = Math.max(1, Math.min(count, 5));
  const offsetStep = radius / arrows;

  return (
    <g transform={`translate(50,50) rotate(${rotation})`}>
        {Array.from({ length: arrows }).map((_, i) => {
            const xOffset = -radius + i * offsetStep;
            
            return (
                <path
                    key={i}
                    d={`M ${xOffset} ${-radius} L ${xOffset + radius} 0 L ${xOffset} ${radius} L ${xOffset + radius * 0.5} 0 Z`}
                    fill={primaryColor}
                    opacity={1 - (i/arrows)*0.5}
                />
            )
        })}
    </g>
  );
};

