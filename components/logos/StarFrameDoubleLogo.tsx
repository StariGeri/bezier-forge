"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const StarFrameDoubleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Double ring star frame - outer and inner frames with star cutouts
  const r = (roundness / 100) * 12;
  
  return (
    <g transform="translate(50, 50)">
      {/* Outer frame with larger star cutout */}
      <mask id="star-double-outer">
        <rect x="-42" y="-42" width="84" height="84" rx={r} fill="white" />
        <circle cx="-42" cy="0" r="28" fill="black" />
        <circle cx="42" cy="0" r="28" fill="black" />
        <circle cx="0" cy="-42" r="28" fill="black" />
        <circle cx="0" cy="42" r="28" fill="black" />
      </mask>
      <rect x="-42" y="-42" width="84" height="84" rx={r} fill={primaryColor} mask="url(#star-double-outer)" />
      
      {/* Inner frame with smaller star cutout */}
      <mask id="star-double-inner">
        <rect x="-25" y="-25" width="50" height="50" rx={r * 0.6} fill="white" />
        <circle cx="-25" cy="0" r="16" fill="black" />
        <circle cx="25" cy="0" r="16" fill="black" />
        <circle cx="0" cy="-25" r="16" fill="black" />
        <circle cx="0" cy="25" r="16" fill="black" />
      </mask>
      <rect x="-25" y="-25" width="50" height="50" rx={r * 0.6} fill={secondaryColor || primaryColor} mask="url(#star-double-inner)" />
    </g>
  );
};

