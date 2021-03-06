// 8 x 8 Bayer constants Matrix
export const bayer8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

export const BRIGHTNESS_STEPS = [2.5, 2, 1.5, 1, 0.8, 0.6, 0.4];
export const CONTRAST_STEPS = [0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4];
