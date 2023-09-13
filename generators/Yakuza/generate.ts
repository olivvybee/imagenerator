import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import { calculateImageSize } from '../../utils/resizeImage';
import { buildAltText } from './buildAltText';

import {
  MAX_NAME_FONT_SIZE,
  MAX_TITLE_FONT_SIZE,
  TARGET_SIZE,
  TEXT_COLOUR,
} from './constants';
import { drawText } from './drawText';
import { YakuzaSettings } from './types';

export const generate: GeneratorFunction<YakuzaSettings> = async (
  canvas,
  settings
) => {
  const { image, name = '', title = '' } = settings;

  if (!image.src) {
    return {
      success: false,
    };
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  const loadedImage = await loadImage(image.src);

  const { width, height } = calculateImageSize(loadedImage, TARGET_SIZE);
  const maxWidth = width - 64;

  canvas.width = width;
  canvas.height = height;
  ctx.drawImage(loadedImage, 0, 0, width, height);

  const nameFontSize = drawText(ctx, name, {
    x: width / 2,
    y: (height / 3) * 2,
    maxWidth,
    maxFontSize: MAX_NAME_FONT_SIZE,
    strokeWidth: 6,
  });

  drawText(ctx, title, {
    x: width / 2,
    y: (height / 3) * 2 + nameFontSize,
    maxWidth,
    maxFontSize: (nameFontSize / MAX_NAME_FONT_SIZE) * MAX_TITLE_FONT_SIZE,
    strokeWidth: (nameFontSize / MAX_NAME_FONT_SIZE) * 5,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
