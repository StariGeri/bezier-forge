"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const CornerCircleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;

  // Circle nested in a corner
  // Based on bottom-left logo
  
  const size = 60;
  const thickness = 18;
  const circleRadius = 16;
  
  // Corner frame (L-shape)
  const frameLength = size;
  const r = (roundness / 100) * (thickness / 2);

  return (
    <g transform="translate(50, 50)">
      {/* L-Frame */}
      <path
        d={`
            M ${-size/2} ${-size/2} 
            L ${size/2} ${-size/2} 
            L ${size/2} ${size/2}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={thickness}
        strokeLinecap={roundness > 50 ? "round" : "butt"}
        strokeLinejoin={roundness > 0 ? "round" : "miter"}
      />
      
      {/* Circle nestled in the corner */}
      <circle 
        cx={-size/2 + thickness/2 + circleRadius/2} 
        cy={size/2 - thickness/2 - circleRadius/2} 
        r={circleRadius} 
        fill={secondaryColor || primaryColor} 
      />
    </g>
  );
};

