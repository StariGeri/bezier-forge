"use client";

import { useEditorStore } from '@/store/use-store';

export const ArchGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, secondaryColor } = config;

  const arches = Math.max(1, Math.min(count, 10));
  const gap = radius / arches;

  return (
    <g transform="translate(50, 60)">
        {Array.from({ length: arches }).map((_, i) => {
            const w = radius - i * gap;
            const h = w * 1.2;
            
            if (w <= 0) return null;

            return (
                <path
                    key={i}
                    d={`M ${-w} ${h} L ${-w} 0 A ${w} ${w} 0 0 1 ${w} 0 L ${w} ${h}`}
                    fill="none"
                    stroke={i % 2 === 0 ? primaryColor : secondaryColor}
                    strokeWidth={gap * 0.4}
                    strokeLinecap="square"
                />
            )
        })}
    </g>
  );
};

