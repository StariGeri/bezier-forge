"use client";

import { useEditorStore } from '@/store/use-store';
import { polarToCartesian } from '@/lib/geometry';
import { createSpline } from '@/lib/spline';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const FlowerGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { count, radius, primaryColor, rotation } = config;

  const petals = Math.max(3, count);
  const points = [];
  
  // To make a smooth flower, we alternate between tips and inner points
  for (let i = 0; i < petals; i++) {
      const angle = (i / petals) * 360 + rotation;
      const nextAngle = ((i + 1) / petals) * 360 + rotation;
      const midAngle = (angle + nextAngle) / 2;
      
      // Tip
      points.push(polarToCartesian(50, 50, radius, angle));
      
      // Inner control point
      points.push(polarToCartesian(50, 50, radius * 0.2, midAngle));
  }
  
  const pathData = createSpline(points, 1, true);

  return (
    <path
      d={pathData}
      fill={primaryColor}
    />
  );
};

