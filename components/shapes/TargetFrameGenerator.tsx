"use client";

import { useEditorStore } from '@/store/use-store';

export const TargetFrameGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation } = config;

  const cx = 50;
  const cy = 50;
  const frameSize = radius * 1.3;
  const circleRadius = radius * 0.7;
  const crossSize = radius * 0.25;
  const thickness = strokeWidth > 0 ? strokeWidth * 1.5 : 3;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {/* Outer square frame */}
      <rect
        x={cx - frameSize}
        y={cy - frameSize}
        width={frameSize * 2}
        height={frameSize * 2}
        fill={primaryColor}
        stroke={secondaryColor}
        strokeWidth={strokeWidth > 0 ? strokeWidth * 0.5 : 0}
      />
      
      {/* Inner circle */}
      <circle
        cx={cx}
        cy={cy}
        r={circleRadius}
        fill="none"
        stroke={secondaryColor}
        strokeWidth={thickness}
      />
      
      {/* Center plus/crosshair */}
      <line
        x1={cx - crossSize}
        y1={cy}
        x2={cx + crossSize}
        y2={cy}
        stroke={secondaryColor}
        strokeWidth={thickness}
      />
      <line
        x1={cx}
        y1={cy - crossSize}
        x2={cx}
        y2={cy + crossSize}
        stroke={secondaryColor}
        strokeWidth={thickness}
      />
    </g>
  );
};

