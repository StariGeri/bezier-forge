"use client";

import { useEditorStore } from '@/store/use-store';
import { isometricToCartesian } from '@/lib/geometry';

export const HexStackGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor } = config;

  // Hexagon in isometric is just a cube viewed from corner
  // Let's make a grid of cubes
  const gridSize = Math.ceil(Math.sqrt(count));
  const size = radius / 2;
  
  const cubes = [];
  for(let x=0; x<gridSize; x++) {
      for(let y=0; y<gridSize; y++) {
          cubes.push({ x, y });
      }
  }

  return (
    <g transform="translate(0, -20)"> 
        {cubes.map((c, i) => {
             const cx = c.x * size * 1.5;
             const cy = c.y * size * 1.5;
             
             // Top Face
             const t1 = isometricToCartesian(-size + cx, -size + cy, size, 50, 50);
             const t2 = isometricToCartesian(size + cx, -size + cy, size, 50, 50);
             const t3 = isometricToCartesian(size + cx, size + cy, size, 50, 50);
             const t4 = isometricToCartesian(-size + cx, size + cy, size, 50, 50);
             
             // Side faces would be needed for true 3D effect
             const r2 = isometricToCartesian(size + cx, size + cy, -size, 50, 50); // bottom right corner
             const r3 = t3;
             const r4 = t2;
             const r1 = isometricToCartesian(size + cx, -size + cy, -size, 50, 50);
             
             return (
                 <g key={i}>
                    {/* Right side */}
                    <path
                        d={`M ${r1.x} ${r1.y} L ${r4.x} ${r4.y} L ${r3.x} ${r3.y} L ${r2.x} ${r2.y} Z`}
                        fill={secondaryColor}
                    />
                    {/* Top */}
                    <path
                        d={`M ${t1.x} ${t1.y} L ${t2.x} ${t2.y} L ${t3.x} ${t3.y} L ${t4.x} ${t4.y} Z`}
                        fill={primaryColor}
                        stroke="rgba(0,0,0,0.1)"
                    />
                 </g>
             )
        })}
    </g>
  );
};

