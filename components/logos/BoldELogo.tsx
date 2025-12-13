"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const BoldELogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  const r = (roundness / 100) * 10;
  
  return (
    <g transform="translate(50, 50)">
      {/* Spine */}
      <rect x="-30" y="-40" width="20" height="80" rx={r} fill={primaryColor} />
      {/* Top Bar */}
      <rect x="-10" y="-40" width="40" height="20" rx={r} fill={primaryColor} />
      {/* Middle Bar */}
      <rect x="-10" y="-10" width="30" height="20" rx={r} fill={primaryColor} />
      {/* Bottom Bar */}
      <rect x="-10" y="20" width="40" height="20" rx={r} fill={primaryColor} />
    </g>
  );
};
