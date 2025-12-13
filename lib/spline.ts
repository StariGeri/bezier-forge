import { spline } from "@georgedoescode/spline";

export const createSpline = (
  points: { x: number; y: number }[],
  tension: number = 1,
  closePath: boolean = true
) => {
  return spline(points, tension, closePath);
};

