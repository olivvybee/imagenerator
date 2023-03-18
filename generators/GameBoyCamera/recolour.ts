import { chunkString } from '../../utils/chunkString';

import { Palette } from './types';

export const recolour = (pixels: ImageData, palette: Palette) => {
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
