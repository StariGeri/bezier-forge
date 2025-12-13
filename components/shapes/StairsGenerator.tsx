"use client";

import { useEditorStore } from '@/store/use-store';
import { isometricToCartesian } from '@/lib/geometry';

export const StairsGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor } = config;

  const steps = Math.max(3, count);
  const stepSize = radius / 2;
  
  return (
    <g>
        {Array.from({ length: steps }).map((_, i) => {
            const offset = i * stepSize;
            
            // Top face
            const t1 = isometricToCartesian(0 + offset, 0 + offset, stepSize + offset, 50 - steps*5, 50);
            const t2 = isometricToCartesian(stepSize + offset, 0 + offset, stepSize + offset, 50 - steps*5, 50);
            const t3 = isometricToCartesian(stepSize + offset, stepSize + offset, stepSize + offset, 50 - steps*5, 50);
            const t4 = isometricToCartesian(0 + offset, stepSize + offset, stepSize + offset, 50 - steps*5, 50);
            
            // Right face (riser)
            const r1 = t2;
            const r2 = t3;
            const r3 = isometricToCartesian(stepSize + offset, stepSize + offset, 0 + offset, 50 - steps*5, 50);
            const r4 = isometricToCartesian(stepSize + offset, 0 + offset, 0 + offset, 50 - steps*5, 50);

            return (
                <g key={i}>
                    <path
                        d={`M ${r1.x} ${r1.y} L ${r2.x} ${r2.y} L ${r3.x} ${r3.y} L ${r4.x} ${r4.y} Z`}
                        fill={secondaryColor}
                    />
                    <path
                        d={`M ${t1.x} ${t1.y} L ${t2.x} ${t2.y} L ${t3.x} ${t3.y} L ${t4.x} ${t4.y} Z`}
                        fill={primaryColor}
                    />
                </g>
            )
        })}
    </g>
  );
};

