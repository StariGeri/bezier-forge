"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const WaveCircleGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, rotation, strokeWidth } = config;

  // count determines frequency of waves
  const points = [];
  const resolution = 100; // Number of points to draw the circle
  const waveAmplitude = 5;
  
  for (let i = 0; i <= resolution; i++) {
      const angle = (i / resolution) * 360;
      // Add sine wave to radius
      const wave = Math.sin((angle * count * Math.PI) / 180) * waveAmplitude;
      const r = radius + wave;
      
      const { x, y } = polarToCartesian(50, 50, r, angle + rotation);
      points.push({ x, y });
  }
  
  const pathData = points.map((p, i) => 
    (i === 0 ? `M ${p.x} ${p.y}` : `L ${p.x} ${p.y}`)
  ).join(' ') + ' Z';

  return (
    <path
      d={pathData}
      fill="none"
      stroke={primaryColor}
      strokeWidth={strokeWidth}
    />
  );
};

