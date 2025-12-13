"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';

export const ScallopGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, rotation } = config;

  const scallops = Math.max(6, count);
  const cx = 50;
  const cy = 50;

  let pathData = '';
  for (let i = 0; i < scallops; i++) {
    const angle = (i / scallops) * 360 + rotation;
    const nextAngle = ((i + 1) / scallops) * 360 + rotation;
    const midAngle = (angle + nextAngle) / 2;
    
    const start = polarToCartesian(cx, cy, radius * 0.7, angle);
    const peak = polarToCartesian(cx, cy, radius, midAngle);
    const end = polarToCartesian(cx, cy, radius * 0.7, nextAngle);
    
    if (i === 0) {
      pathData += `M ${start.x} ${start.y}`;
    }
    
    pathData += ` Q ${peak.x} ${peak.y} ${end.x} ${end.y}`;
  }
  pathData += ' Z';

  return (
    <path
      d={pathData}
      fill={primaryColor}
    />
  );
};

