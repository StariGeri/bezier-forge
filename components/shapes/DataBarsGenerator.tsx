"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';

export const DataBarsGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation } = config;

  const bars = Math.max(4, count * 2);
  
  return (
    <g transform="translate(50, 50)">
        {Array.from({ length: bars }).map((_, i) => {
            const angle = (i / bars) * 360 + rotation;
            const h = radius * (0.5 + Math.abs(Math.sin(i * 132))); // Random-ish height
            
            return (
                <rect
                    key={i}
                    x={-2} // Width 4
                    y={-radius/4} // inner offset
                    width={4}
                    height={h}
                    fill={i % 2 === 0 ? primaryColor : secondaryColor}
                    transform={`rotate(${angle}) translate(0, -${radius/2})`}
                    rx={2}
                />
            )
        })}
    </g>
  );
};

