"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ArrowFrameLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;

  // Arrow pointing up-right in a frame
  // Based on bottom-mid-left logo
  
  const size = 60;
  const strokeWidth = 14;
  const arrowSize = 25;
  
  const r = (roundness / 100) * (strokeWidth / 2);

  return (
    <g transform="translate(50, 50)">
      {/* Outer Square Frame */}
      <rect 
        x={-size/2} 
        y={-size/2} 
        width={size} 
        height={size} 
        rx={r} 
        fill="none" 
        stroke={primaryColor} 
        strokeWidth={strokeWidth}
      />
      
      {/* Arrow pointing top-right */}
      {/* Starting from bottom-left */}
      <path
        d={`
            M ${-size/4} ${size/4}
            L ${size/4} ${-size/4}
            L ${size/4} ${0}
            M ${size/4} ${-size/4}
            L ${0} ${-size/4}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap={roundness > 50 ? "round" : "butt"}
        strokeLinejoin={roundness > 0 ? "round" : "miter"}
      />
    </g>
  );
};

