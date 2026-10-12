import { GeneratorFunction } from '../../types/GeneratorTypes';
import { applyCrop } from '../../utils/applyCrop';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { HeLooksVeryPoliteSettings } from './types';

export const generate: GeneratorFunction<HeLooksVeryPoliteSettings> = async (
  canvas,
  settings,
) => {
  const { image } = settings;

  const background = await loadImage('/assets/very-polite.jpg');

  canvas.width = background.width;
  canvas.height = background.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(background, 0, 0);

  const croppedImageSrc =
    image?.src && image?.crop
      ? await applyCrop(image.src, image.crop)
      : undefined;

  const croppedImage = croppedImageSrc
    ? await loadImage(croppedImageSrc)
    : undefined;

  const imageWidth = croppedImage
    ? (393 / croppedImage.height) * croppedImage.width
    : 210;
  const imageX = 438 - imageWidth;

  ctx.save();

  ctx.beginPath();
  ctx.roundRect(imageX, 200, imageWidth - 5, 393, 43);
  ctx.roundRect(418, 544, 50, 50, 50);
  ctx.clip();

  if (croppedImage) {
    ctx.drawImage(croppedImage, imageX, 200, imageWidth, 393);
  }

  ctx.restore();

  // White roundrect to clip off the "pointer" on the bubble
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.roundRect(433, 420, 200, 200, 50);
  ctx.fill();

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
