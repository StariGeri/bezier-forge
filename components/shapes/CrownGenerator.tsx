"use client";

import { useEditorStore } from '@/store/use-store';
import { ShapeGeneratorProps } from './ShapeRegistry';

export const CrownGenerator = ({ config: overrideConfig }: ShapeGeneratorProps) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation, count } = config;

  const scale = radius / 30;
  const cx = 50;
  const cy = 50;

  // Crown dimensions
  const width = 36 * scale;
  const height = 28 * scale;
  const points = Math.max(3, Math.min(Math.floor(count / 2), 7)); // 3-7 crown points

  const left = cx - width / 2;
  const right = cx + width / 2;
  const top = cy - height / 2;
  const bottom = cy + height / 2;
  const bandHeight = 6 * scale;

  // Generate crown points path
  let crownPath = `M ${left} ${bottom - bandHeight}`;
  
  // Left side going up
  crownPath += ` L ${left} ${bottom - bandHeight - 4 * scale}`;

  // Generate crown peaks
  const peakWidth = width / points;
  for (let i = 0; i < points; i++) {
    const peakX = left + peakWidth * (i + 0.5);
    const valleyLeftX = left + peakWidth * i;
    const valleyRightX = left + peakWidth * (i + 1);
    
    // Valley
    if (i > 0) {
      crownPath += ` L ${valleyLeftX} ${bottom - bandHeight - 4 * scale}`;
    }
    
    // Peak with slight curves
    const peakY = top + 2 * scale;
    crownPath += ` Q ${valleyLeftX + peakWidth * 0.25} ${bottom - bandHeight - 8 * scale}, ${peakX} ${peakY}`;
    crownPath += ` Q ${valleyRightX - peakWidth * 0.25} ${bottom - bandHeight - 8 * scale}, ${valleyRightX} ${bottom - bandHeight - 4 * scale}`;
  }

  // Right side going down
  crownPath += ` L ${right} ${bottom - bandHeight}`;
  
  // Close the crown body
  crownPath += ` Z`;

  // Jewel decorations on peaks
  const jewels: React.ReactElement[] = [];
  for (let i = 0; i < points; i++) {
    const jewelX = left + peakWidth * (i + 0.5);
    const jewelY = top + 4 * scale;
    
    jewels.push(
      <circle
        key={`jewel-${i}`}
        cx={jewelX}
        cy={jewelY}
        r={2 * scale}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
      />
    );
  }

  // Band jewels
  const bandJewelCount = Math.max(2, points - 1);
  for (let i = 0; i < bandJewelCount; i++) {
    const jewelX = left + (width / (bandJewelCount + 1)) * (i + 1);
    const jewelY = bottom - bandHeight / 2;
    
    jewels.push(
      <rect
        key={`band-jewel-${i}`}
        x={jewelX - 1.5 * scale}
        y={jewelY - 1.5 * scale}
        width={3 * scale}
        height={3 * scale}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 3}
        transform={`rotate(45, ${jewelX}, ${jewelY})`}
      />
    );
  }

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {/* Crown body */}
      <path
        d={crownPath}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
        fillOpacity={0.3}
      />
      
      {/* Crown band */}
      <rect
        x={left}
        y={bottom - bandHeight}
        width={width}
        height={bandHeight}
        fill={secondaryColor}
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        rx={1 * scale}
        fillOpacity={0.5}
      />
      
      {/* Band decorative lines */}
      <line
        x1={left + 2 * scale}
        y1={bottom - bandHeight + 1.5 * scale}
        x2={right - 2 * scale}
        y2={bottom - bandHeight + 1.5 * scale}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
      />
      <line
        x1={left + 2 * scale}
        y1={bottom - 1.5 * scale}
        x2={right - 2 * scale}
        y2={bottom - 1.5 * scale}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
      />
      
      {/* Jewels */}
      {jewels}
    </g>
  );
};

