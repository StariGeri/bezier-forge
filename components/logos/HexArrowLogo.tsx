"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const HexArrowLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Hexagonal G-shape / Arrow (Bottom row, 2nd from left)
  // It looks like a hexagon with a quarter cut out and an arrow head inward.
  
  const r = (roundness / 100) * 5;
  
  return (
    <g transform="translate(50, 50)">
      {/* 
         Draw a path that traces the hex shape but turns inward to form an arrow/G.
         Start top-right, go CCW.
      */}
      <path 
        d={`
          M 20 -35
          L -20 -35
          L -40 0
          L -20 35
          L 20 35
          L 40 0
          L 10 0
          L 10 15
          L -10 0
          L 10 -15
          L 10 -10
          L 25 -10
          L 25 -20
          Z
        `}
        fill={primaryColor}
        strokeLinejoin={roundness > 0 ? "round" : "miter"}
        strokeWidth={roundness > 0 ? r * 2 : 0}
        stroke={primaryColor}
      />
    </g>
  );
};
