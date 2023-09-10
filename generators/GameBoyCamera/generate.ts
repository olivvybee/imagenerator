import { GeneratorFunction } from '../../types/GeneratorTypes';
import { applyCrop } from '../../utils/applyCrop';
import { loadImage } from '../../utils/loadImage';

import { applyDithering } from './applyDithering';
import { buildAltText } from './buildAltText';
import {
  BRIGHTNESS_MAP,
  CONTRAST_MAP,
  OUTPUT_SIZE,
  TARGET_SIZE,
} from './constants';
import { recolour } from './recolour';
import { GameBoyCameraSettings } from './types';
import { upscale } from './upscale';

export const generate: GeneratorFunction<GameBoyCameraSettings> = async (
  canvas,
  settings
) => {
  if (!settings.image.src || !settings.image.crop) {
    return {
      success: false,
    };
  }

  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  const croppedImageSrc = await applyCrop(
    settings.image.src,
    settings.image.crop
  );

  if (!croppedImageSrc) {
    return {
      success: false,
    };
  }

  const croppedImage = await loadImage(croppedImageSrc);

  if (!croppedImage) {
    return {
      success: false,
    };
  }

  ctx.drawImage(croppedImage, 0, 0, TARGET_SIZE, TARGET_SIZE);

  const pixels = ctx.getImageData(0, 0, TARGET_SIZE, TARGET_SIZE);
  const { brightness, contrast, palette } = settings;

  applyDithering(pixels, BRIGHTNESS_MAP[brightness], CONTRAST_MAP[contrast]);
  recolour(pixels, palette);

  ctx.putImageData(upscale(pixels), 0, 0);

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
