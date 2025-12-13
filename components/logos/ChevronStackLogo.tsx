"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ChevronStackLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Map roundness (0-100) to corner radius
  const r = (roundness / 100) * 10;
  
  return (
    <g transform="translate(50, 50)">
      {/* Top Chevron */}
      <path
        d="M-25 -15 L0 10 L25 -15"
        fill="none"
        stroke={primaryColor}
        strokeWidth="12"
        strokeLinecap={roundness > 50 ? "round" : "butt"}
        strokeLinejoin={roundness > 50 ? "round" : "miter"}
      />
      {/* Bottom Chevron */}
      <path
        d="M-25 10 L0 35 L25 10"
        fill="none"
        stroke={primaryColor}
        strokeWidth="12"
        strokeLinecap={roundness > 50 ? "round" : "butt"}
        strokeLinejoin={roundness > 50 ? "round" : "miter"}
      />
    </g>
  );
};
