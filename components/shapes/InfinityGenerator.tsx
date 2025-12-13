"use client";

import { useEditorStore } from '@/store/use-store';

export const InfinityGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, strokeWidth, rotation } = config;

  // Lemniscate of Bernoulli (figure-8 / infinity symbol)
  const scale = radius * 0.9;
  const points: string[] = [];
  const resolution = 100;

  for (let i = 0; i <= resolution; i++) {
    const t = (i / resolution) * Math.PI * 2;
    // Parametric equations for lemniscate
    const denominator = 1 + Math.sin(t) * Math.sin(t);
    const x = 50 + (scale * Math.cos(t)) / denominator;
    const y = 50 + (scale * Math.sin(t) * Math.cos(t)) / denominator;
    points.push(`${i === 0 ? 'M' : 'L'} ${x.toFixed(2)} ${y.toFixed(2)}`);
  }

  return (
    <g transform={`rotate(${rotation}, 50, 50)`}>
      <path
        d={points.join(' ') + ' Z'}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </g>
  );
};

