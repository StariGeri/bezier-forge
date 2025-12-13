"use client";

import { useEditorStore } from '@/store/use-store';

export const EyeGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const width = radius * 1.3;
  const height = radius * 0.6;
  const irisRadius = radius * 0.35;
  const pupilRadius = radius * 0.15;

  // Almond/eye shape using bezier curves
  const eyePath = `
    M ${50 - width} 50
    Q ${50 - width * 0.5} ${50 - height}, 50 ${50 - height}
    Q ${50 + width * 0.5} ${50 - height}, ${50 + width} 50
    Q ${50 + width * 0.5} ${50 + height}, 50 ${50 + height}
    Q ${50 - width * 0.5} ${50 + height}, ${50 - width} 50
    Z
  `;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Eye outline */}
      <path
        d={eyePath}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Iris */}
      <circle
        cx={50}
        cy={50}
        r={irisRadius}
        fill={primaryColor}
        opacity={0.8}
      />
      
      {/* Pupil */}
      <circle
        cx={50}
        cy={50}
        r={pupilRadius}
        fill={secondaryColor}
      />
      
      {/* Highlight */}
      <circle
        cx={50 + pupilRadius * 0.5}
        cy={50 - pupilRadius * 0.5}
        r={pupilRadius * 0.4}
        fill={secondaryColor}
        opacity={0.8}
      />
    </g>
  );
};

