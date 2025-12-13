"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const WeaveGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor } = config;

  const strands = Math.max(3, count);
  const gap = (radius * 2) / strands;
  const offset = 50 - radius;
  
  return (
    <g transform={`translate(${offset}, ${offset})`}>
        {Array.from({ length: strands }).map((_, i) => (
            <g key={i}>
                {/* Horizontal */}
                <rect
                    x={0}
                    y={i * gap + gap/4}
                    width={radius * 2}
                    height={gap/2}
                    fill={i % 2 === 0 ? primaryColor : secondaryColor}
                    opacity={0.8}
                />
                 {/* Vertical */}
                <rect
                    x={i * gap + gap/4}
                    y={0}
                    width={gap/2}
                    height={radius * 2}
                    fill={i % 2 !== 0 ? primaryColor : secondaryColor}
                    opacity={0.8}
                    style={{ mixBlendMode: 'multiply' }}
                />
            </g>
        ))}
    </g>
  );
};

