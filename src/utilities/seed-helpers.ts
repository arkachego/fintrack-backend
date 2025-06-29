export const getRandomInt: (max: number, min?: number) => number = (max, min = 0) => {
  return Math.floor(Math.random() * max) + min;
};
