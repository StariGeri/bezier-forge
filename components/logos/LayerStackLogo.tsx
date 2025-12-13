"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const LayerStackLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Stacked layer cards with offset
  const r = (roundness / 100) * 6;
  
  return (
    <g transform="translate(50, 50)">
      {/* Back layer */}
      <rect 
        x="-30"
        y="-25"
        width="50"
        height="35"
        rx={r}
        fill={secondaryColor || primaryColor}
        opacity="0.5"
        transform="translate(15, -15)"
      />
      {/* Middle layer */}
      <rect 
        x="-30"
        y="-25"
        width="50"
        height="35"
        rx={r}
        fill={secondaryColor || primaryColor}
        opacity="0.75"
        transform="translate(7.5, -7.5)"
      />
      {/* Front layer */}
      <rect 
        x="-30"
        y="-25"
        width="50"
        height="35"
        rx={r}
        fill={primaryColor}
      />
    </g>
  );
};

