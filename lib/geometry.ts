export const degreesToRadians = (degrees: number) => {
  return (degrees * Math.PI) / 180;
};

export const radiansToDegrees = (radians: number) => {
  return (radians * 180) / Math.PI;
};

export const polarToCartesian = (
  centerX: number,
  centerY: number,
  radius: number,
  angleInDegrees: number
) => {
  const angleInRadians = degreesToRadians(angleInDegrees);

  // Round to 3 decimal places to avoid hydration mismatches
  const x = centerX + radius * Math.cos(angleInRadians);
  const y = centerY + radius * Math.sin(angleInRadians);

  return {
    x: Math.round(x * 1000) / 1000,
    y: Math.round(y * 1000) / 1000,
  };
};

export const mapRange = (
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

// 3D Isometric Projection Helper
// Maps 3D coordinates (x, y, z) to 2D screen coordinates
export const isometricToCartesian = (
  x: number,
  y: number,
  z: number,
  centerX: number = 50,
  centerY: number = 50,
  scale: number = 1
) => {
  // Simple isometric projection:
  // x axis: -30 degrees
  // y axis: +30 degrees
  // z axis: vertical up
  
  // Angle of 30 degrees for iso projection
  const angle = 30 * (Math.PI / 180);
  
  const isoX = (x - y) * Math.cos(angle);
  const isoY = (x + y) * Math.sin(angle) - z;

  const finalX = centerX + isoX * scale;
  const finalY = centerY + isoY * scale;

  return {
    x: Math.round(finalX * 1000) / 1000,
    y: Math.round(finalY * 1000) / 1000,
  };
};

// Generates points for a regular polygon
export const getRegularPolygonPoints = (
  radius: number,
  sides: number,
  centerX: number = 50,
  centerY: number = 50,
  rotation: number = 0
) => {
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * 360 + rotation;
    points.push(polarToCartesian(centerX, centerY, radius, angle));
  }
  return points;
};

export const getSpiralPoints = (
  turns: number,
  pointsPerTurn: number,
  maxRadius: number,
  centerX: number = 50,
  centerY: number = 50,
  rotation: number = 0
) => {
  const points = [];
  const totalPoints = Math.floor(turns * pointsPerTurn);
  
  for (let i = 0; i < totalPoints; i++) {
    const t = i / totalPoints; // 0 to 1
    const angle = t * turns * 360 + rotation;
    const radius = t * maxRadius;
    points.push(polarToCartesian(centerX, centerY, radius, angle));
  }
  return points;
};
