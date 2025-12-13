"use client";

import { useEditorStore } from '@/store/use-store';
import { seededRandom } from '@/lib/random';

export const HourglassGenerator = ({ config: overrideConfig }: { config?: any }) => {
  const store = useEditorStore();
  const config = overrideConfig || store.config;
  const { radius, primaryColor, secondaryColor, strokeWidth, rotation, seed, count } = config;

  const scale = radius / 30;
  const cx = 50;
  const cy = 50;

  // Hourglass dimensions
  const width = 24 * scale;
  const height = 36 * scale;
  const neckWidth = 4 * scale;
  const frameThickness = 3 * scale;

  // Frame coordinates
  const top = cy - height / 2;
  const bottom = cy + height / 2;
  const left = cx - width / 2;
  const right = cx + width / 2;

  // Sand fill level based on seed (0 to 1)
  const sandLevel = seededRandom(seed) * 0.8 + 0.1;

  // Generate sand particles
  const sandParticles: JSX.Element[] = [];
  const particleCount = Math.max(5, count / 2);

  for (let i = 0; i < particleCount; i++) {
    const t = seededRandom(seed + i * 7);
    const x = cx + (seededRandom(seed + i * 13) - 0.5) * neckWidth * 0.8;
    const y = cy - 2 * scale + t * 4 * scale;
    sandParticles.push(
      <circle
        key={`particle-${i}`}
        cx={x}
        cy={y}
        r={0.8 * scale}
        fill={secondaryColor}
        opacity={0.7}
      />
    );
  }

  // Glass bulb paths using bezier curves
  const topBulbPath = `
    M ${left + frameThickness} ${top + frameThickness}
    L ${right - frameThickness} ${top + frameThickness}
    Q ${right - frameThickness} ${cy - neckWidth}, ${cx + neckWidth / 2} ${cy}
    L ${cx - neckWidth / 2} ${cy}
    Q ${left + frameThickness} ${cy - neckWidth}, ${left + frameThickness} ${top + frameThickness}
    Z
  `;

  const bottomBulbPath = `
    M ${cx - neckWidth / 2} ${cy}
    Q ${left + frameThickness} ${cy + neckWidth}, ${left + frameThickness} ${bottom - frameThickness}
    L ${right - frameThickness} ${bottom - frameThickness}
    Q ${right - frameThickness} ${cy + neckWidth}, ${cx + neckWidth / 2} ${cy}
    L ${cx - neckWidth / 2} ${cy}
    Z
  `;

  // Sand in top bulb (draining)
  const sandTopPath = `
    M ${left + frameThickness + 2 * scale} ${top + frameThickness + height * 0.15 * sandLevel}
    L ${right - frameThickness - 2 * scale} ${top + frameThickness + height * 0.15 * sandLevel}
    Q ${right - frameThickness - 4 * scale} ${cy - neckWidth * 1.2}, ${cx + neckWidth / 2} ${cy}
    L ${cx - neckWidth / 2} ${cy}
    Q ${left + frameThickness + 4 * scale} ${cy - neckWidth * 1.2}, ${left + frameThickness + 2 * scale} ${top + frameThickness + height * 0.15 * sandLevel}
    Z
  `;

  // Sand in bottom bulb (accumulating)
  const sandBottomHeight = (1 - sandLevel) * 0.35 * height;
  const sandBottomPath = `
    M ${left + frameThickness + 2 * scale} ${bottom - frameThickness}
    L ${right - frameThickness - 2 * scale} ${bottom - frameThickness}
    L ${right - frameThickness - 2 * scale - sandBottomHeight * 0.3} ${bottom - frameThickness - sandBottomHeight}
    Q ${cx} ${bottom - frameThickness - sandBottomHeight - 2 * scale}, ${left + frameThickness + 2 * scale + sandBottomHeight * 0.3} ${bottom - frameThickness - sandBottomHeight}
    Z
  `;

  return (
    <g transform={`rotate(${rotation}, ${cx}, ${cy})`}>
      {/* Top frame */}
      <rect
        x={left}
        y={top}
        width={width}
        height={frameThickness}
        fill={primaryColor}
        rx={1 * scale}
      />
      
      {/* Bottom frame */}
      <rect
        x={left}
        y={bottom - frameThickness}
        width={width}
        height={frameThickness}
        fill={primaryColor}
        rx={1 * scale}
      />
      
      {/* Glass bulbs outline */}
      <path
        d={topBulbPath}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      <path
        d={bottomBulbPath}
        fill="none"
        stroke={primaryColor}
        strokeWidth={strokeWidth}
        strokeLinejoin="round"
      />
      
      {/* Sand in top */}
      <path
        d={sandTopPath}
        fill={secondaryColor}
        opacity={0.6}
      />
      
      {/* Sand in bottom */}
      <path
        d={sandBottomPath}
        fill={secondaryColor}
        opacity={0.8}
      />
      
      {/* Falling sand particles */}
      {sandParticles}
      
      {/* Side supports */}
      <line
        x1={left}
        y1={top + frameThickness}
        x2={left}
        y2={bottom - frameThickness}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
      />
      <line
        x1={right}
        y1={top + frameThickness}
        x2={right}
        y2={bottom - frameThickness}
        stroke={primaryColor}
        strokeWidth={strokeWidth / 2}
      />
    </g>
  );
};

