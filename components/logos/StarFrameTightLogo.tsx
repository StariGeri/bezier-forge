"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const StarFrameTightLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Tighter star frame - larger circle cutouts create sharper star points
  const r = (roundness / 100) * 10;
  
  return (
    <g transform="translate(50, 50)">
      <mask id="star-tight-mask">
        <rect x="-38" y="-38" width="76" height="76" rx={r} fill="white" />
        {/* Larger cutouts for sharper star */}
        <circle cx="-38" cy="0" r="32" fill="black" />
        <circle cx="38" cy="0" r="32" fill="black" />
        <circle cx="0" cy="-38" r="32" fill="black" />
        <circle cx="0" cy="38" r="32" fill="black" />
      </mask>
      <rect x="-38" y="-38" width="76" height="76" rx={r} fill={primaryColor} mask="url(#star-tight-mask)" />
    </g>
  );
};

