export const seededRandom = (seed: number) => {
  // Mulberry32 algorithm - deterministic and platform independent
  let t = seed + 0x6D2B79F5;
  t = Math.imul(t ^ t >>> 15, t | 1);
  t ^= t + Math.imul(t ^ t >>> 7, t | 61);
  return ((t ^ t >>> 14) >>> 0) / 4294967296;
};

export const randomRange = (min: number, max: number, seed: number) => {
  const random = seededRandom(seed);
  return Math.floor(random * (max - min + 1)) + min;
};
