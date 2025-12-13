import { spline } from "@georgedoescode/spline";

export const createSpline = (
  points: { x: number; y: number }[],
  tension: number = 1,
  closePath: boolean = true
) => {
  const path = spline(points, tension, closePath);
  
  // Round all numbers in the path string to 3 decimal places
  // This helps avoid hydration mismatches due to floating point differences
  return path.replace(/[-+]?\d*\.?\d+/g, (match) => {
    const num = parseFloat(match);
    if (isNaN(num)) return match;
    return (Math.round(num * 1000) / 1000).toString();
  });
};
