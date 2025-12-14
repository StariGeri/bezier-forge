"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ArrowStackLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;

  // Two vertically stacked arrowheads pointing right
  // Based on bottom-right logo
  
  const width = 30;
  const height = 25;
  const strokeWidth = 14;
  const gap = 15;
  
  const createArrow = (yOffset: number) => (
      <path
        d={`
            M ${-width/2} ${yOffset - height/2}
            L ${width/2} ${yOffset}
            L ${-width/2} ${yOffset + height/2}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap={roundness > 50 ? "round" : "butt"}
        strokeLinejoin={roundness > 0 ? "round" : "miter"}
      />
  );

  return (
    <g transform="translate(50, 50)">
      {createArrow(-gap)}
      {createArrow(gap)}
    </g>
  );
};

