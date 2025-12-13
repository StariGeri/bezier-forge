"use client";

import { useEditorStore } from '@/store/use-store';
import { isometricToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const IsoCubeGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor } = config;

  const size = radius;
  
  // Top Face (z = size)
  const t1 = isometricToCartesian(-size, -size, size, 50, 50);
  const t2 = isometricToCartesian(size, -size, size, 50, 50);
  const t3 = isometricToCartesian(size, size, size, 50, 50);
  const t4 = isometricToCartesian(-size, size, size, 50, 50);
  
  // Right Face (x = size)
  const r1 = t2;
  const r2 = t3;
  const r3 = isometricToCartesian(size, size, -size, 50, 50);
  const r4 = isometricToCartesian(size, -size, -size, 50, 50);
  
  // Left Face (y = size) - actually standard isometric view is usually left/right/top visible
  const l1 = t4;
  const l2 = t3;
  const l3 = r3;
  const l4 = isometricToCartesian(-size, size, -size, 50, 50);

  return (
    <g>
        {/* Top Face */}
        <path
            d={`M ${t1.x} ${t1.y} L ${t2.x} ${t2.y} L ${t3.x} ${t3.y} L ${t4.x} ${t4.y} Z`}
            fill={primaryColor}
        />
        {/* Right Face */}
        <path
            d={`M ${r1.x} ${r1.y} L ${r2.x} ${r2.y} L ${r3.x} ${r3.y} L ${r4.x} ${r4.y} Z`}
            fill={secondaryColor}
            opacity={0.8}
        />
        {/* Left Face */}
        <path
            d={`M ${l1.x} ${l1.y} L ${l2.x} ${l2.y} L ${l3.x} ${l3.y} L ${l4.x} ${l4.y} Z`}
            fill={secondaryColor}
            opacity={0.6}
        />
    </g>
  );
};

