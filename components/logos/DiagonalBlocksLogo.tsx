"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const DiagonalBlocksLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;

  // Diagonal rectangular blocks
  // Based on top-mid-right logo
  
  const width = 20;
  const height = 45;
  const gap = 10;
  const r = (roundness / 100) * (width / 2);
  
  // Create 4 blocks arranged diagonally
  return (
    <g transform="translate(50, 50) rotate(-45)">
      {/* Top Left Row */}
      <rect x={-width - gap/2} y={-height - gap/2} width={width} height={height} rx={r} fill={primaryColor} />
      <rect x={gap/2} y={-height - gap/2} width={width} height={height} rx={r} fill={primaryColor} />
      
      {/* Bottom Right Row - Offset to create checkerboard-ish feel */}
      <rect x={-width - gap/2} y={gap/2} width={width} height={height} rx={r} fill={primaryColor} />
      <rect x={gap/2} y={gap/2} width={width} height={height} rx={r} fill={primaryColor} />
    </g>
  );
};

