"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const OrbitRingLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;

  // Central dot with split orbiting rings
  const centerRadius = 12;
  const ringGap = 8;
  const ringWidth = 6;
  
  // Calculate ring radii
  const innerRingR = centerRadius + ringGap + ringWidth/2;
  const outerRingR = innerRingR + ringGap + ringWidth;
  
  const cap = roundness > 50 ? "round" : "butt";

  return (
    <g transform="translate(50, 50)">
      {/* Center Dot */}
      <circle r={centerRadius} fill={primaryColor} />
      
      {/* Inner Ring - Split top/bottom */}
      <path
        d={`M ${-innerRingR} 0 A ${innerRingR} ${innerRingR} 0 0 1 ${innerRingR} 0`}
        fill="none"
        stroke={secondaryColor || primaryColor}
        strokeWidth={ringWidth}
        strokeLinecap={cap}
        transform="rotate(-20)"
      />
      <path
        d={`M ${innerRingR} 0 A ${innerRingR} ${innerRingR} 0 0 1 ${-innerRingR} 0`}
        fill="none"
        stroke={secondaryColor || primaryColor}
        strokeWidth={ringWidth}
        strokeLinecap={cap}
        transform="rotate(-20)"
      />

      {/* Outer Ring - Split left/right - offset rotation */}
       <path
        d={`M 0 ${-outerRingR} A ${outerRingR} ${outerRingR} 0 0 1 0 ${outerRingR}`}
        fill="none"
        stroke={primaryColor}
        strokeWidth={ringWidth}
        strokeLinecap={cap}
        transform="rotate(45)"
      />
       <path
        d={`M 0 ${outerRingR} A ${outerRingR} ${outerRingR} 0 0 1 0 ${-outerRingR}`}
        fill="none"
        stroke={primaryColor}
        strokeWidth={ringWidth}
        strokeLinecap={cap}
        transform="rotate(45)"
      />
    </g>
  );
};

