import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { FONTS } from './constants';
import { NotKiddingSettings } from './types';

export const generate: GeneratorFunction<NotKiddingSettings> = async (
  canvas,
  settings
) => {
  const { text, fontSize, font } = settings;

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

  const chosenFont = FONTS[font];

  const multilineText = new MultilineText(ctx, {
    fontSize,
    fontFace: chosenFont,
  });

  if (text) {
    multilineText.drawText(text, {
      x: 25,
      y: 13,
      width: 550,
      height: 190,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
