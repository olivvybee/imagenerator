import { clamp } from '../../utils/clamp';
import { bayer8 } from './constants';

export const applyDithering = (
  pixels: ImageData,
  brightness: number,
  contrast: number
) => {
  const { data, width, height } = pixels;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Location in the pixel array for the start of the current pixel
      // Each pixel is represented by 4 values in the array (hence multiplying by 4)
      const i = (x + y * width) * 4;

      // Look up the bayer constant for this pixel
      const bayer = bayer8[y % 8][x % 8];

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const greyscale = r * 0.3 + g * 0.59 + b * 0.11;

      const withContrast = (greyscale / 255 - 0.5) * contrast + 0.5;
      const withBrightness =
        Math.pow(clamp(withContrast, 0, 1), brightness) * 255;
      const levelled = clamp(withBrightness, 0, 255);

      // Apply the bayer filter
      const filtered = clamp(levelled + (bayer - 32) * 0.75, 0, 255);

      // Quantise to 4 possible values
      // 64 is 256 / 4 so dividing the greyscale values by 64 and rounding
      // gives results in the range 0-3.
      // Multiplying by 64 again spreads the four values out across 0-255.
      const quantised = clamp(Math.round(filtered / 64), 0, 3) * 64;

      const finalValue = quantised;

      data[i] = finalValue;
      data[i + 1] = finalValue;
      data[i + 2] = finalValue;
    }
  }

  return pixels;
};
