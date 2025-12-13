"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const LinkSquareLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Two interlocking square links (bottom right image)
  // Bold, thick strokes.
  
  const r = (roundness / 100) * 10;
  const stroke = 12;
  const offset = 10;
  
  return (
    <g transform="translate(50, 50) rotate(45)">
        {/* Link 1 */}
        <rect 
            x={-30 - offset} 
            y={-15} 
            width={45} 
            height={30} 
            rx={r} 
            fill="none" 
            stroke={primaryColor} 
            strokeWidth={stroke} 
        />
        
        {/* Link 2 - Interlocking illusion */}
        {/* Draw bottom part of Link 2 */}
        <mask id="link-mask">
            <rect x="-100" y="-100" width="200" height="200" fill="white" />
            <rect 
                x={-30 - offset} 
                y={-15} 
                width={45} 
                height={30} 
                rx={r} 
                fill="none" 
                stroke="black" 
                strokeWidth={stroke + 4} 
            />
        </mask>
        
        <rect 
            x={-15 + offset} 
            y={-15} 
            width={45} 
            height={30} 
            rx={r} 
            fill="none" 
            stroke={secondaryColor || primaryColor} 
            strokeWidth={stroke}
            mask="url(#link-mask)"
        />
        
        {/* Draw top part of Link 2 to cover Link 1 at intersection */}
        {/* Actually, simple overlap is fine for flat logo style */}
         <rect 
            x={-15 + offset} 
            y={-15} 
            width={45} 
            height={30} 
            rx={r} 
            fill="none" 
            stroke={secondaryColor || primaryColor} 
            strokeWidth={stroke}
            clipPath="inset(0 0 50% 0)"
        />
    </g>
  );
};
