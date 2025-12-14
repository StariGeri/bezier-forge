"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const HexWeaverLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;

  // Hexagonal weave pattern
  const strokeWidth = 8;
  const radius = 35;
  const cornerRadius = (roundness / 100) * 15;

  return (
    <g transform="translate(50, 50)">
        {/* Outer Hex */}
      <path
        d={`
          M ${-radius/2} ${-radius * 0.866}
          L ${radius/2} ${-radius * 0.866}
          L ${radius} 0
          L ${radius/2} ${radius * 0.866}
          L ${-radius/2} ${radius * 0.866}
          L ${-radius} 0
          Z
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin={roundness > 0 ? "round" : "miter"}
        strokeLinecap="round"
      />
      
      {/* Inner lines creating the "weave" look */}
      <path
        d={`
          M 0 0
          L 0 ${-radius * 0.866}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
      <path
        d={`
          M 0 0
          L ${-radius * 0.75} ${radius * 0.433}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
       <path
        d={`
          M 0 0
          L ${radius * 0.75} ${radius * 0.433}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
      />
    </g>
  );
};

