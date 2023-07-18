import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { BoykisserSettings } from './types';

export const generate: GeneratorFunction<BoykisserSettings> = async (
  canvas,
  settings
) => {
  const { text } = settings;

  const image = await loadImage('/assets/boykisser.jpg');
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

  multilineText.fontSize = FONT_SIZE;
  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.background = false;
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'bottom';
  multilineText.vAlign = 'middle';
  multilineText.lineHeight = FONT_SIZE * 1.3;

  if (text) {
    multilineText.drawText(ctx, text, 5, 5, 784, 210);
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
