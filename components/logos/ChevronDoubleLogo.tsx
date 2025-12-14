"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ChevronDoubleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;

  // Bold double chevrons pointing right
  // Based on top-right logo
  
  const width = 30;
  const height = 60; // Total height of chevron
  const thickness = 20;
  const gap = 15;
  const r = (roundness / 100) * 10;
  
  // Custom path for a thick chevron
  const createChevron = (xOffset: number) => {
      // Points for a right-pointing chevron
      // We'll use a path with lineTo/arcTo if we want true rounded corners, 
      // or stroke-linejoin for simplicity with a thick stroke.
      // But to match the blocky feel, explicit path is better.
      
      const halfH = height / 2;
      const innerX = xOffset;
      const outerX = xOffset + thickness;
      const tipX = xOffset + width;
      
      // Let's use a thick stroke polyline instead for easier rounded joints
      return (
          <path
            d={`M ${innerX} ${-halfH} L ${tipX} 0 L ${innerX} ${halfH}`}
            fill="none"
            stroke={primaryColor}
            strokeWidth={thickness}
            strokeLinecap={roundness > 50 ? "round" : "butt"}
            strokeLinejoin={roundness > 0 ? "round" : "miter"}
          />
      );
  };

  return (
    <g transform="translate(50, 50)">
      {createChevron(-width/2 - gap/2)}
      {createChevron(width/2 - gap/2)}
    </g>
  );
};

