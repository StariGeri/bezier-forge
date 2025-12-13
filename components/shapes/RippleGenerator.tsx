"use client";

import { useEditorStore } from '@/store/use-store';

export const RippleGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, strokeWidth } = config;

  const rings = Math.max(2, count);
  const cx = 50;
  const cy = 50;

  return (
    <g>
      {Array.from({ length: rings }).map((_, i) => {
        const r = (radius / rings) * (i + 1);
        const opacity = 1 - (i / rings) * 0.6;
        return (
          <circle
            key={i}
            cx={cx}
            cy={cy}
            r={r}
            fill="none"
            stroke={primaryColor}
            strokeWidth={strokeWidth}
            opacity={opacity}
          />
        );
      })}
    </g>
  );
};

