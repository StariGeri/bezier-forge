"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const ExpandArrowsLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // Four arrows pointing out from center (bottom third image)
  // X shape with arrowheads.
  
  const r = (roundness / 100) * 5;
  
  return (
    <g transform="translate(50, 50)">
       {[0, 90, 180, 270].map((angle, i) => (
         <g key={i} transform={`rotate(${angle}) translate(10, 10)`}>
            {/* Arrow Head */}
            <path 
              d="M 0 0 L 20 0 L 20 20" 
              fill="none" 
              stroke={primaryColor} 
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            {/* Arrow Shaft */}
            <line x1="20" y1="20" x2="5" y2="5" stroke={primaryColor} strokeWidth="8" strokeLinecap="round" />
         </g>
       ))}
    </g>
  );
};

