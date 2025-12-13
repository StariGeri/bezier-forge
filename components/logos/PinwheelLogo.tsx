"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const PinwheelLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;
  
  // A 4-blade pinwheel.
  // Each blade is a quarter circle or rounded rect rotated around center.
  // We can construct this from 4 paths.
  
  // Max radius for corner rounding
  const r = (roundness / 100) * 20;
  
  return (
    <g transform="translate(50, 50)">
        {/* Top Left Blade */}
        <path d={`M -5 -5 L -35 -5 A 10 10 0 0 1 -35 -35 L -5 -35 Z`} fill={primaryColor} transform="rotate(0)" /> 
        {/* Actually, let's make it more like the image: square-ish blades radiating out */}
        
        {/* The image shows 4 L-shaped or curved blades. Let's approximate the top-left one. 
            It looks like a square with one corner rounded off, rotated. 
            Or rather, 4 sectors.
        */}

        {[0, 90, 180, 270].map((angle, i) => (
             <path 
                key={i}
                transform={`rotate(${angle})`}
                d={`M 2 2 L 40 2 A ${r} ${r} 0 0 1 40 40 L 2 40 Z`}
                fill={primaryColor}
             />
        ))}
    </g>
  );
};

