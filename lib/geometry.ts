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

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
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

  return {
    x: centerX + isoX * scale,
    y: centerY + isoY * scale,
  };
};

// Generates points for a regular polygon
export const getRegularPolygonPoints = (
  sides: number,
  radius: number,
  centerX: number = 50,
  centerY: number = 50,
  rotationOffset: number = 0
) => {
  const points = [];
  for (let i = 0; i < sides; i++) {
    const angle = (i / sides) * 360 + rotationOffset;
    points.push(polarToCartesian(centerX, centerY, radius, angle));
  }
  return points;
};

// Generates points for a spiral
export const getSpiralPoints = (
  turns: number,
  pointsPerTurn: number,
  maxRadius: number,
  centerX: number = 50,
  centerY: number = 50,
  rotationOffset: number = 0
) => {
  const points = [];
  const totalPoints = turns * pointsPerTurn;
  
  for (let i = 0; i < totalPoints; i++) {
    const progress = i / totalPoints;
    const angle = progress * turns * 360 + rotationOffset;
    const radius = progress * maxRadius;
    points.push(polarToCartesian(centerX, centerY, radius, angle));
  }
  return points;
};
