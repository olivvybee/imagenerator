import { GeneratorFunction } from '../../types/GeneratorTypes';
import { constrainFontSize } from '../../utils/constrainFontSize';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';
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
  const { width, height } = loadedImage;

  const ratio = width / height;

  const newWidth = width > height ? TARGET_SIZE : TARGET_SIZE * ratio;
  const newHeight = height > width ? TARGET_SIZE : TARGET_SIZE / ratio;
  const maxWidth = newWidth - 64;

  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.drawImage(loadedImage, 0, 0, newWidth, newHeight);

  const nameFontSize = drawText(ctx, name, {
    x: newWidth / 2,
    y: (newHeight / 3) * 2,
    maxWidth,
    maxFontSize: MAX_NAME_FONT_SIZE,
    strokeWidth: 6,
  });

  drawText(ctx, title, {
    x: newWidth / 2,
    y: (newHeight / 3) * 2 + nameFontSize,
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
