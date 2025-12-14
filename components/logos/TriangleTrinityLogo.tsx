"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from '../shapes/ShapeRegistry';

export const TriangleTrinityLogo = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { primaryColor, secondaryColor, roundness } = config;

  // Three triangles in rotational symmetry
  const size = 25;
  const offset = 15;
  const strokeJoin = roundness > 50 ? "round" : "miter";
  
  // Triangle path centered at 0,0
  // Height of equilateral triangle = size * sqrt(3)/2
  const h = size * Math.sqrt(3) / 2;
  const trianglePath = `
    M 0 ${-2 * h / 3}
    L ${size / 2} ${h / 3}
    L ${-size / 2} ${h / 3}
    Z
  `;

  return (
    <g transform="translate(50, 50)">
      {[0, 120, 240].map((angle, i) => {
         const color = i === 0 ? primaryColor : (secondaryColor || primaryColor);
         return (
            <g key={i} transform={`rotate(${angle}) translate(0, -${offset})`}>
                <path
                    d={trianglePath}
                    fill={color}
                    stroke={color}
                    strokeWidth="4"
                    strokeLinejoin={strokeJoin}
                />
            </g>
         );
      })}
    </g>
  );
};

