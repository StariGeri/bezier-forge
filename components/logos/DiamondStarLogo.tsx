"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const DiamondStarLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Diamond is a rotated square. Roundness affects corners.
  const r = (roundness / 100) * 15;
  
  return (
    <g transform="translate(50, 50)">
      <rect x="-35" y="-35" width="70" height="70" rx={r} transform="rotate(45)" fill={primaryColor} />
      {/* Star cutout (simulated with rotated squares) */}
      <g transform="rotate(45)">
         <rect x="-10" y="-10" width="20" height="20" rx={r/2} fill={secondaryColor} />
         <rect x="-10" y="-10" width="20" height="20" rx={r/2} transform="rotate(45)" fill={secondaryColor} />
      </g>
    </g>
  );
};
