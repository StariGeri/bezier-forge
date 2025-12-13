"use client";

import { useEditorStore } from '@/store/use-store';

export const BadgeGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, rotation, strokeWidth } = config;

  const cx = 50;
  const cy = 50;
  const width = radius * 1.4;
  const height = radius * 1.6;

  // Shield/badge shape
  const shieldPath = `
    M ${cx} ${cy - height / 2}
    L ${cx + width / 2} ${cy - height / 3}
    L ${cx + width / 2} ${cy + height / 6}
    Q ${cx + width / 2} ${cy + height / 2} ${cx} ${cy + height / 2}
    Q ${cx - width / 2} ${cy + height / 2} ${cx - width / 2} ${cy + height / 6}
    L ${cx - width / 2} ${cy - height / 3}
    Z
  `;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      <path d={shieldPath} fill={primaryColor} />
      <path
        d={shieldPath}
        fill="none"
        stroke={secondaryColor}
        strokeWidth={strokeWidth}
      />
    </g>
  );
};

