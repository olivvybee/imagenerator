import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/drawMultilineText';
import { loadImage } from '../../utils/loadImage';

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

  const multilineText = new MultilineText(ctx, { fontSize });

  if (text) {
    multilineText.drawText(`I want ${text}`, {
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
