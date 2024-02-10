// @ts-nocheck
import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { CANVAS_HEIGHT, CANVAS_WIDTH, FONT_SIZE } from './constants';
import { XXXSettings } from './types';

export const generate: GeneratorFunction<XXXSettings> = async (
  canvas,
  settings
) => {
  const { text, image } = settings;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  if (image && image.src) {
    const loadedImage = await loadImage(image.src);
    ctx.drawImage(loadedImage, 0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
  });
  multilineText.drawText(text, {
    x: 5,
    y: 5,
    width: CANVAS_WIDTH - 10,
    height: 200,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
