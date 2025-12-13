"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ZigzagLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Bold zigzag pattern
  const strokeCap = roundness > 50 ? "round" : "square";
  
  return (
    <g transform="translate(50, 50)">
      <path 
        d="M -35 -30 L 0 -30 L 35 0 L 0 0 L -35 30 L 0 30 L 35 60"
        fill="none"
        stroke={primaryColor}
        strokeWidth="14"
        strokeLinecap={strokeCap}
        strokeLinejoin={roundness > 50 ? "round" : "miter"}
        transform="translate(0, -15)"
      />
    </g>
  );
};

