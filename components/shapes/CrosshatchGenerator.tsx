"use client";

import { useEditorStore } from '@/store/use-store';

export const CrosshatchGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, primaryColor, strokeWidth, rotation } = config;

  const lines = Math.max(3, count);
  const spacing = 100 / (lines + 1);
  const cx = 50;
  const cy = 50;

  const diagonalLines1 = [];
  const diagonalLines2 = [];

  for (let i = 0; i < lines; i++) {
    const offset = spacing * (i + 1);
    // First diagonal set (top-left to bottom-right)
    diagonalLines1.push(
      <line
        key={`d1-${i}`}
        x1={offset}
        y1={0}
        x2={offset + 50}
        y2={100}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
    );
    // Second diagonal set (top-right to bottom-left)
    diagonalLines2.push(
      <line
        key={`d2-${i}`}
        x1={100 - offset}
        y1={0}
        x2={100 - offset - 50}
        y2={100}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
      />
    );
  }

  return (
    <g transform={`rotate(${rotation} ${cx} ${cy})`}>
      {diagonalLines1}
      {diagonalLines2}
    </g>
  );
};

