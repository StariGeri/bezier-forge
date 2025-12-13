"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';

export const PropellerGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, rotation } = config;

  const blades = Math.max(2, Math.min(count, 6));
  const cx = 50;
  const cy = 50;
  const bladeWidth = 8;

  const bladePaths = [];
  
  for (let i = 0; i < blades; i++) {
    const angle = (i / blades) * 360 + rotation;
    
    // Create curved blade shape
    const tip = polarToCartesian(cx, cy, radius, angle);
    const leftBase = polarToCartesian(cx, cy, 5, angle - 30);
    const rightBase = polarToCartesian(cx, cy, 5, angle + 30);
    const leftMid = polarToCartesian(cx, cy, radius * 0.6, angle - 15);
    const rightMid = polarToCartesian(cx, cy, radius * 0.6, angle + 5);
    
    const pathData = `
      M ${leftBase.x} ${leftBase.y}
      Q ${leftMid.x} ${leftMid.y} ${tip.x} ${tip.y}
      Q ${rightMid.x} ${rightMid.y} ${rightBase.x} ${rightBase.y}
      Z
    `;
    
    bladePaths.push(
      <path
        key={i}
        d={pathData}
        fill={primaryColor}
        opacity={0.8 + (i / blades) * 0.2}
      />
    );
  }

  return (
    <g>
      {bladePaths}
      <circle cx={cx} cy={cy} r={6} fill={secondaryColor} />
      <circle cx={cx} cy={cy} r={3} fill={primaryColor} />
    </g>
  );
};

