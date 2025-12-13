"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';

export const SymmetryMirrorGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation } = config;

  const segments = Math.max(3, count); // How many mirror segments
  const segmentAngle = 360 / segments;

  return (
    <g transform={`translate(50,50) rotate(${rotation})`}>
        {Array.from({ length: segments }).map((_, i) => (
            <g key={i} transform={`rotate(${i * segmentAngle})`}>
                <path
                    d={`M 0 0 L ${radius} -10 L ${radius} 10 Z`}
                    fill={i % 2 === 0 ? primaryColor : secondaryColor}
                    opacity={0.9}
                />
                <circle
                    cx={radius * 0.7}
                    cy={0}
                    r={radius * 0.1}
                    fill="white"
                    opacity={0.5}
                />
            </g>
        ))}
    </g>
  );
};

