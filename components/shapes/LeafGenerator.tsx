"use client";

import { useEditorStore } from '@/store/use-store';

export const LeafGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, rotation, strokeWidth } = config;

  const cx = 50;
  const cy = 50;
  const leafWidth = radius * 0.6;
  const leafHeight = radius * 1.5;

  // Leaf outline using bezier curves
  const leafPath = `
    M ${cx} ${cy - leafHeight / 2}
    Q ${cx + leafWidth} ${cy - leafHeight / 4} ${cx + leafWidth} ${cy}
    Q ${cx + leafWidth} ${cy + leafHeight / 3} ${cx} ${cy + leafHeight / 2}
    Q ${cx - leafWidth} ${cy + leafHeight / 3} ${cx - leafWidth} ${cy}
    Q ${cx - leafWidth} ${cy - leafHeight / 4} ${cx} ${cy - leafHeight / 2}
    Z
  `;

  // Central vein
  const veinPath = `M ${cx} ${cy - leafHeight / 2} L ${cx} ${cy + leafHeight / 2}`;

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      <path d={leafPath} fill={primaryColor} />
      <path d={veinPath} stroke={secondaryColor} strokeWidth={strokeWidth} fill="none" />
    </g>
  );
};

