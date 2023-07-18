import { GeneratorFunction } from '../../types/GeneratorTypes';
import { applyCrop } from '../../utils/applyCrop';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { BoykisserSettings } from './types';

export const generate: GeneratorFunction<BoykisserSettings> = async (
  canvas,
  settings
) => {
  const { text, image, faceBackground } = settings;

  const face = await loadImage('/assets/boykisser-face.png');
  const defaultImage = await loadImage('/assets/boykisser-outline.jpg');

  canvas.width = 800;
  canvas.height = 900;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 900);

  if (image && image.src && image.crop) {
    const croppedImageSrc = await applyCrop(image.src, image.crop);

    if (!croppedImageSrc) {
      return {
        success: false,
      };
    }

    const croppedImage = await loadImage(croppedImageSrc);

    ctx.drawImage(croppedImage, 50, 200, 700, 700);
  } else {
    ctx.drawImage(defaultImage, 50, 200);
  }

  if (faceBackground === 'White') {
    ctx.fillStyle = 'white';
    ctx.fillRect(190, 455, 415, 190);
  }

  ctx.drawImage(face, 190, 455);

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
