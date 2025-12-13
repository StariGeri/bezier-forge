"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ChainLinkLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor } = config;
  
  // Two mirrored S-curves connected - the exact design from the SVG
  // Scaled from 256 to 100 viewBox
  
  return (
    <g transform="translate(50, 50) scale(0.35)">
      <path 
        d={`
          M 63.173 0.005 
          C 28.208 0.448 0 28.93 0 64 
          C 0 99.346 28.654 128 64 128 
          L 128 128 
          L 128 88 
          L 64 88 
          C 50.745 88 40 77.255 40 64 
          C 40 50.745 50.745 40 64 40 
          L 128 40 
          L 128 -40 
          L 64 -40 
          C 50.745 -40 40 -50.745 40 -64 
          C 40 -77.255 50.745 -88 64 -88 
          L 128 -88 
          L 128 -128 
          L 64 -128 
          C 28.654 -128 0 -99.346 0 -64 
          C 0 -28.654 28.654 0 64 0 
          Z 
          M -128 -88 
          L -64 -88 
          C -50.745 -88 -40 -77.255 -40 -64 
          C -40 -50.745 -50.745 -40 -64 -40 
          L -128 -40 
          L -128 40 
          L -64 40 
          C -50.745 40 -40 50.745 -40 64 
          C -40 77.255 -50.745 88 -64 88 
          L -128 88 
          L -128 128 
          L -64 128 
          C -28.654 128 0 99.346 0 64 
          C 0 28.93 -28.208 0.448 -63.173 0.005 
          L -64 0 
          C -28.654 0 0 -28.654 0 -64 
          C 0 -99.346 -28.654 -128 -64 -128 
          L -128 -128 
          Z
        `}
        fill={primaryColor}
      />
    </g>
  );
};

