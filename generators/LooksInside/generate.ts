import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { LooksInsideSettings } from './types';

export const generate: GeneratorFunction<LooksInsideSettings> = async (
  canvas,
  settings
) => {
  const { line1, line2, line3 } = settings;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  const image = await loadImage('/assets/looks-inside.jpg');
  const { width, height: imageHeight } = image;

  const textToDraw = [line1, line2, line3]
    .map((line) => `> ${line || ''}`)
    .join('\n\n');

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    colour: '#627e1b',
    align: 'left',
  });

  const { height: textHeight } = multilineText.drawText(textToDraw, {
    x: 0,
    y: 0,
    width,
    height: 1000,
  });

  canvas.width = width;
  canvas.height = imageHeight + textHeight + 50;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(image, 0, canvas.height - imageHeight);

  multilineText.drawText(textToDraw, {
    x: 25,
    y: 25,
    width: canvas.width - 50,
    height: textHeight,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
