import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { TapTheSignSettings } from './types';

export const generate: GeneratorFunction<TapTheSignSettings> = async (
  canvas,
  settings
) => {
  const { text } = settings;

  const image = await loadImage('/assets/tap-the-sign.jpg');
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

  const multilineText = new MultilineText(ctx, { fontSize: FONT_SIZE });

  if (text) {
    multilineText.drawText(text, { x: 90, y: 530, width: 460, height: 295 });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
