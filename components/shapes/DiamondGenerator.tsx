"use client";

import { useEditorStore } from '@/store/use-store';

export const DiamondGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, rotation } = config;

  const cx = 50;
  const cy = 50;
  const width = radius * 1.2;
  const height = radius * 1.6;

  // Diamond facets
  const top = { x: cx, y: cy - height / 2 };
  const left = { x: cx - width / 2, y: cy - height / 6 };
  const right = { x: cx + width / 2, y: cy - height / 6 };
  const bottom = { x: cx, y: cy + height / 2 };
  const midLeft = { x: cx - width / 3, y: cy };
  const midRight = { x: cx + width / 3, y: cy };

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {/* Top facets */}
      <path d={`M ${top.x} ${top.y} L ${left.x} ${left.y} L ${cx} ${cy - height / 6} Z`} fill={primaryColor} />
      <path d={`M ${top.x} ${top.y} L ${right.x} ${right.y} L ${cx} ${cy - height / 6} Z`} fill={secondaryColor} />
      
      {/* Side facets */}
      <path d={`M ${left.x} ${left.y} L ${midLeft.x} ${midLeft.y} L ${cx} ${cy - height / 6} Z`} fill={secondaryColor} opacity={0.8} />
      <path d={`M ${right.x} ${right.y} L ${midRight.x} ${midRight.y} L ${cx} ${cy - height / 6} Z`} fill={primaryColor} opacity={0.8} />
      
      {/* Bottom facets */}
      <path d={`M ${midLeft.x} ${midLeft.y} L ${bottom.x} ${bottom.y} L ${cx} ${cy - height / 6} Z`} fill={primaryColor} opacity={0.6} />
      <path d={`M ${midRight.x} ${midRight.y} L ${bottom.x} ${bottom.y} L ${cx} ${cy - height / 6} Z`} fill={secondaryColor} opacity={0.6} />
    </g>
  );
};

