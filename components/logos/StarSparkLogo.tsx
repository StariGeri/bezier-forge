"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const StarSparkLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;
  
  // Four pointed star / spark inside a container (top right image)
  // Actually looks like a solid shape with 4 concave sides?
  // Or a central diamond with circle cutouts on corners?
  
  // Let's do a central diamond shape with inverted rounded corners.
  
  // Or: Square with circle cutouts on sides?
  
  const cutoutR = 30 + (roundness / 100) * 10;
  
  return (
    <g transform="translate(50, 50)">
      <mask id="spark-mask">
         <rect x="-50" y="-50" width="100" height="100" fill="white" />
         <circle cx="0" cy="-50" r={cutoutR} fill="black" />
         <circle cx="50" cy="0" r={cutoutR} fill="black" />
         <circle cx="0" cy="50" r={cutoutR} fill="black" />
         <circle cx="-50" cy="0" r={cutoutR} fill="black" />
      </mask>
      
      <rect x="-35" y="-35" width="70" height="70" fill={primaryColor} mask="url(#spark-mask)" rx={5} />
      
      {/* Optional center accent */}
      <circle cx="0" cy="0" r={5} fill={secondaryColor} />
    </g>
  );
};

