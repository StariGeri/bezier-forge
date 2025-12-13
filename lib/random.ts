export const seededRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
};

export const randomRange = (min: number, max: number, seed: number) => {
  const random = seededRandom(seed);
  return Math.floor(random * (max - min + 1)) + min;
};

