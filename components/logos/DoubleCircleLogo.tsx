"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const DoubleCircleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor } = config;
  
  // Roundness doesn't apply to circles, but maybe we can use it for stroke width or overlap?
  // Let's stick to simple circles for now as requested.
  
  return (
    <g transform="translate(50, 50)">
      <circle cx="-15" cy="0" r="30" fill={primaryColor} />
      {/* Cutout effect or overlay */}
      <circle cx="15" cy="0" r="30" fill={secondaryColor} fillOpacity="0.8" style={{ mixBlendMode: 'multiply' }} />
    </g>
  );
};
