import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';

import { buildAltText } from './buildAltText';
import { NotKiddingSettings } from './types';

export const generate: GeneratorFunction<NotKiddingSettings> = async (
  canvas,
  settings
) => {
  const { text, fontSize } = settings;

  const image = await loadImage('/assets/not-kidding.png');

  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.drawImage(image, 0, 0);

  multilineText.fontSize = fontSize;
  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.background = false;
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'bottom';
  multilineText.vAlign = 'middle';

  if (text) {
    multilineText.drawText(ctx, `I want ${text}`, 25, 13, 550, 190);
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
