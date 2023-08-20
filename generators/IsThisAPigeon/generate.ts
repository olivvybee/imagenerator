import { GeneratorFunction } from '../../types/GeneratorTypes';
import { drawTextWithBackground } from '../../utils/drawText';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { BOTTOM_FONT_SIZE, OVERLAY_FONT_SIZE } from './constants';
import { IsThisAPigeonSettings } from './types';

export const generate: GeneratorFunction<IsThisAPigeonSettings> = async (
  canvas,
  settings
) => {
  const { butterfly, person, bottomText } = settings;

  const image = await loadImage('/assets/pigeon.jpg');
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
  ctx.textBaseline = 'middle';

  ctx.font = `${OVERLAY_FONT_SIZE}px "Atkinson Hyperlegible"`;

  if (butterfly) {
    drawTextWithBackground(ctx, butterfly, { x: 900, y: 190 });
  }

  if (person) {
    drawTextWithBackground(ctx, person, { x: 420, y: 250 });
  }

  ctx.font = `${BOTTOM_FONT_SIZE}px "Atkinson Hyperlegible"`;

  if (bottomText) {
    drawTextWithBackground(ctx, bottomText, { y: 740 });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
