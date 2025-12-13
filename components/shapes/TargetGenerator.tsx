"use client";

import { useEditorStore } from '@/store/use-store';

export const TargetGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const rings = Math.max(2, Math.min(6, count));
  const maxRadius = radius * 1.1;
  const crosshairExtend = radius * 0.3;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      {/* Concentric rings */}
      {Array.from({ length: rings }).map((_, i) => {
        const r = maxRadius * ((i + 1) / rings);
        return (
          <circle
            key={i}
            cx={50}
            cy={50}
            r={r}
            fill="none"
            stroke={i % 2 === 0 ? primaryColor : secondaryColor}
            strokeWidth={strokeWidth}
          />
        );
      })}
      
      {/* Crosshair lines */}
      <line
        x1={50}
        y1={50 - maxRadius - crosshairExtend}
        x2={50}
        y2={50 + maxRadius + crosshairExtend}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
      <line
        x1={50 - maxRadius - crosshairExtend}
        y1={50}
        x2={50 + maxRadius + crosshairExtend}
        y2={50}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
      
      {/* Center dot */}
      <circle
        cx={50}
        cy={50}
        r={strokeWidth}
        fill={primaryColor}
      />
    </g>
  );
};

