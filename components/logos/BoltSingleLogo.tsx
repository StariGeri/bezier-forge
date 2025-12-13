"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const BoltSingleLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor } = config;
  
  // Single parallelogram/bolt shape
  
  return (
    <g transform="translate(50, 50)">
      <path 
        d="M 40 20 L -10 20 L -40 -20 L 10 -20 Z"
        fill={primaryColor}
      />
    </g>
  );
};

