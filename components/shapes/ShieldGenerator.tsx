"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const ShieldGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation, roundness } = config;

  const width = radius * 0.9;
  const height = radius * 1.2;
  const cornerRadius = roundness * 2;
  
  // Shield shape using bezier curves
  const top = 50 - height / 2;
  const bottom = 50 + height / 2;
  const left = 50 - width;
  const right = 50 + width;
  const shoulderY = top + height * 0.15;
  const curveControl = height * 0.3;

  const path = `
    M 50 ${top}
    L ${right - cornerRadius} ${top}
    Q ${right} ${top} ${right} ${top + cornerRadius}
    L ${right} ${shoulderY}
    Q ${right} ${shoulderY + curveControl} 50 ${bottom}
    Q ${left} ${shoulderY + curveControl} ${left} ${shoulderY}
    L ${left} ${top + cornerRadius}
    Q ${left} ${top} ${left + cornerRadius} ${top}
    Z
  `;

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      <path
        d={path}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      {/* Inner shield detail */}
      <path
        d={`
          M 50 ${top + height * 0.15}
          L ${right - width * 0.3} ${top + height * 0.15}
          L ${right - width * 0.3} ${shoulderY + height * 0.1}
          Q ${right - width * 0.3} ${shoulderY + curveControl * 0.6} 50 ${bottom - height * 0.15}
          Q ${left + width * 0.3} ${shoulderY + curveControl * 0.6} ${left + width * 0.3} ${shoulderY + height * 0.1}
          L ${left + width * 0.3} ${top + height * 0.15}
          Z
        `}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth * 0.5}
        opacity={0.5}
      />
    </g>
  );
};

