"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const BridgeArchLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, roundness } = config;

  // Symmetric connector shape resembling "H" or bridge
  // Based on the top-left logo in the reference
  
  const width = 60;
  const height = 40;
  const strokeWidth = 14;
  const r = (roundness / 100) * (strokeWidth / 2);
  
  const halfW = width / 2;
  const halfH = height / 2;
  
  // Curved legs
  const legOffset = 15;
  
  return (
    <g transform="translate(50, 50)">
      {/* Horizontal Bar */}
      <rect 
        x={-halfW} 
        y={-strokeWidth/2} 
        width={width} 
        height={strokeWidth} 
        rx={r} 
        fill={primaryColor} 
      />
      
      {/* Vertical/Curved Legs - Top */}
      <path
        d={`
            M ${-halfW + strokeWidth/2} ${-strokeWidth/2}
            L ${-halfW + strokeWidth/2} ${-halfH}
            M ${halfW - strokeWidth/2} ${-strokeWidth/2}
            L ${halfW - strokeWidth/2} ${-halfH}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap={roundness > 50 ? "round" : "butt"}
      />

       {/* Bottom Legs - Curved outward */}
       <path
        d={`
            M ${-halfW + strokeWidth/2} ${strokeWidth/2}
            Q ${-halfW + strokeWidth/2} ${halfH} ${-halfW - legOffset} ${halfH}
            
            M ${halfW - strokeWidth/2} ${strokeWidth/2}
            Q ${halfW - strokeWidth/2} ${halfH} ${halfW + legOffset} ${halfH}
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap={roundness > 50 ? "round" : "butt"}
      />
    </g>
  );
};

