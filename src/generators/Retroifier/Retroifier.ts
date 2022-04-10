/**
 * This code is heavily based on the original by maple "mavica" syrup (https://maple.pet)
 * and is used under the "beerware license".
 * https://github.com/Lana-chan/webgbcam
 */

import { Generator } from '../types';

import { PALETTES } from './palettes';
import { RetroifierConfigurator } from './RetroifierConfigurator';
import { bayer8 } from './constants';
import { Palette, RetroifierConfig } from './types';
import { chunkString, clamp } from './utils';

export const Retroifier: Generator<RetroifierConfig> = {
  name: 'Retroifier',
  route: '/retroifier',

  defaultConfig: {
    brightness: 1,
    contrast: 1.5,
    palette: PALETTES[0],
  },
  Configurator: RetroifierConfigurator,

  getCanvasSize: () => ({ width: 512, height: 512 }),

  generate: (image, ctx, config) => {
    const pixels = cropToSquare(image, ctx);
    retroify(pixels, config.brightness, config.contrast);
    recolour(pixels, config.palette);

    ctx.putImageData(upscale(pixels, 512), 0, 0);
  },
};

const cropToSquare = (
  image: HTMLImageElement,
  ctx: CanvasRenderingContext2D
) => {
  const { width, height } = image;

  const size = Math.min(width, height);

  const x = (width - size) / 2;
  const y = (height - size) / 2;

  ctx.drawImage(image, x, y, size, size, 0, 0, 128, 128);
  return ctx.getImageData(0, 0, 128, 128);
};

const retroify = (pixels: ImageData, brightness: number, contrast: number) => {
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

const recolour = (pixels: ImageData, palette: Palette) => {
  const { data } = pixels;
  const { colours } = palette;

  for (let i = 0; i < data.length; i += 4) {
    const colourIndex = Math.floor(data[i] / 64);

    const hex = colours[colourIndex];
    const [r, g, b] = chunkString(hex.slice(1), 2).map((str) =>
      parseInt(str, 16)
    );

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  return pixels;
};

const upscale = (pixels: ImageData, targetSize: number) => {
  const oldData = pixels.data;
  const oldSize = pixels.width;

  const newPixels = new ImageData(targetSize, targetSize);
  const newData = newPixels.data;

  const scaleFactor = targetSize / oldSize;

  let newIndex = 0;

  for (let y = 0; y < targetSize; y++) {
    for (let x = 0; x < targetSize; x++) {
      const oldX = Math.floor(x / scaleFactor);
      const oldY = Math.floor(y / scaleFactor);

      const oldIndex = (oldX + oldY * oldSize) * 4;

      newData[newIndex] = oldData[oldIndex];
      newData[newIndex + 1] = oldData[oldIndex + 1];
      newData[newIndex + 2] = oldData[oldIndex + 2];
      newData[newIndex + 3] = oldData[oldIndex + 3];

      newIndex += 4;
    }
  }

  return newPixels;
};
