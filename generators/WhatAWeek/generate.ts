import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { COMIC_FONT_SIZE, REGULAR_FONT_SIZE } from './constants';
import { WhatAWeekSettings } from './types';

export const generate: GeneratorFunction<WhatAWeekSettings> = async (
  canvas,
  settings
) => {
  const { captainHaddock, tintin, font } = settings;

  const useComicFont = font === 'Comic';

  await loadFont('Komika', '/fonts/Komika.woff2');

  const image = await loadImage('/assets/what-a-week.jpg');
  const { width, height } = image;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.drawImage(image, 0, 0);

  const multilineText = new MultilineText(ctx, {
    fontSize: useComicFont ? COMIC_FONT_SIZE : REGULAR_FONT_SIZE,
    fontFace: useComicFont ? 'Komika' : 'Atkinson Hyperlegible',
  });

  multilineText.drawText(captainHaddock, {
    x: 88,
    y: useComicFont ? 72 : 77,
    width: 720,
    height: 130,
  });

  multilineText.drawText(tintin, {
    x: 85,
    y: useComicFont ? 222 : 227,
    width: 505,
    height: 80,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
