"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const RoundedXLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  const r = (roundness / 100) * 12.5;
  
  return (
    <g transform="translate(50, 50)">
      <rect x="-40" y="-12.5" width="80" height="25" rx={r} transform="rotate(45)" fill={primaryColor} />
      <rect x="-40" y="-12.5" width="80" height="25" rx={r} transform="rotate(-45)" fill={primaryColor} />
    </g>
  );
};
