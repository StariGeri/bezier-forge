"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const WaveBarsLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Horizontal bars with wave connection
  const r = (roundness / 100) * 5;
  
  return (
    <g transform="translate(50, 50)">
      {/* Top bar */}
      <rect x="-40" y="-38" width="35" height="12" rx={r} fill={primaryColor} />
      <rect x="5" y="-38" width="35" height="12" rx={r} fill={primaryColor} />
      
      {/* Wave connector top */}
      <path 
        d="M -5 -32 C -5 -20 5 -20 5 -8"
        fill="none"
        stroke={primaryColor}
        strokeWidth="12"
        strokeLinecap="round"
      />
      
      {/* Middle bars */}
      <rect x="-40" y="-6" width="35" height="12" rx={r} fill={primaryColor} />
      <rect x="5" y="-6" width="35" height="12" rx={r} fill={primaryColor} />
      
      {/* Wave connector bottom */}
      <path 
        d="M 5 0 C 5 12 -5 12 -5 24"
        fill="none"
        stroke={primaryColor}
        strokeWidth="12"
        strokeLinecap="round"
      />
      
      {/* Bottom bar */}
      <rect x="-40" y="26" width="35" height="12" rx={r} fill={primaryColor} />
      <rect x="5" y="26" width="35" height="12" rx={r} fill={primaryColor} />
    </g>
  );
};

