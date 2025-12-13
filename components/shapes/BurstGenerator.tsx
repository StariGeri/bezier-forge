"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';

export const BurstGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, rotation, primaryColor, roundness } = config;
  
  // Star burst shape
  const spikes = Math.max(3, count * 2);
  const innerRadius = radius * (roundness / 200 + 0.2); // inner radius based on roundness
  
  let pathData = "";
  
  for (let i = 0; i < spikes; i++) {
      const angle = (i / spikes) * 360 + rotation;
      // Alternate between outer and inner radius
      const r = i % 2 === 0 ? radius : innerRadius;
      const { x, y } = polarToCartesian(50, 50, r, angle);
      
      pathData += (i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`) + " ";
  }
  
  pathData += "Z";

  return (
    <path
      d={pathData}
      fill={primaryColor}
    />
  );
};

