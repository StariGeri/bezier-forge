"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const CrossCurveLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Two curved lines forming a stylized X or bowtie shape.
  // Like two C shapes back to back or intersecting?
  // Looking at the image (top row, 3rd), it's like > < shapes merging.
  
  const curve = 10 + (roundness / 100) * 20;

  return (
    <g transform="translate(50, 50)">
       <path 
         d={`M -40 -30 Q ${-curve} 0 -40 30 L -10 30 Q ${curve} 0 -10 -30 Z`}
         fill={primaryColor}
       />
       <path 
         d={`M 40 -30 Q ${curve} 0 40 30 L 10 30 Q ${-curve} 0 10 -30 Z`}
         fill={primaryColor}
       />
    </g>
  );
};

