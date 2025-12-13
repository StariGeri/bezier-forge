"use client";

import { useEditorStore } from '@/store/use-store';

export const ChainLinkGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const cx = 50;
  const cy = 50;
  const height = radius * 1.3;
  const width = radius * 0.5;
  const thickness = strokeWidth > 0 ? strokeWidth * 2.5 : 5;
  const gap = radius * 0.15;

  // Two connected U shapes forming an S-curve chain link
  const leftU = `
    M ${cx - gap} ${cy - height}
    L ${cx - gap} ${cy}
    A ${width} ${width} 0 0 1 ${cx - gap - width * 2} ${cy}
    L ${cx - gap - width * 2} ${cy - height}
  `;

  const rightU = `
    M ${cx + gap} ${cy + height}
    L ${cx + gap} ${cy}
    A ${width} ${width} 0 0 1 ${cx + gap + width * 2} ${cy}
    L ${cx + gap + width * 2} ${cy + height}
  `;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      <path
        d={leftU}
        fill="none"
        stroke={primaryColor}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d={rightU}
        fill="none"
        stroke={primaryColor}
        strokeWidth={thickness}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

