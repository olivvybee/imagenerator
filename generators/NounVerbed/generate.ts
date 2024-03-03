import { GeneratorFunction } from '../../types/GeneratorTypes';
import { constrainFontSize } from '../../utils/constrainFontSize';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';
import { calculateImageSize } from '../../utils/resizeImage';
import { buildAltText } from './buildAltText';

import { TARGET_SIZE, MAX_FONT_SIZE } from './constants';
import { NounVerbedSettings } from './types';

export const generate: GeneratorFunction<NounVerbedSettings> = async (
  canvas,
  settings
) => {
  const { text = '', colour, image, textPosition } = settings;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  await loadFont('Optimus Princeps', '/fonts/OptimusPrincepsSemiBold.woff2');

  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (image?.src) {
    const loadedImage = await loadImage(image.src);

    const { width, height } = calculateImageSize(loadedImage, TARGET_SIZE);

    canvas.width = width;
    canvas.height = height;

    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(loadedImage, 0, 0, width, height);
  } else {
    canvas.width = TARGET_SIZE;
    canvas.height = (TARGET_SIZE / 16) * 9;

    ctx.clearRect(0, 0, 1280, 720);
  }

  const { width, height } = canvas;

  const uppercaseText = text.toUpperCase();
  const x = width / 2;
  const y = (height / 100) * textPosition;
  const maxWidth = width - 64;

  const fontSize = constrainFontSize(ctx, uppercaseText, {
    font: 'Optimus Princeps',
    targetSize: MAX_FONT_SIZE,
    maxWidth,
  });

  const bannerHeight = fontSize * 2;
  const bannerTop = y - bannerHeight / 2;
  const bannerBottom = y + bannerHeight / 2;

  const gradient = ctx.createLinearGradient(0, bannerTop, 0, bannerBottom);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.2, 'rgba(0, 0, 0, 0.7)');
  gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.7)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, bannerTop, width, bannerHeight);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = colour.hex;

  ctx.globalAlpha = 0.07;
  for (let i = 1.15; i > 1; i -= 0.01) {
    ctx.font = `${fontSize * i}px 'Optimus Princeps'`;
    ctx.fillText(uppercaseText, x, y);
  }
  ctx.globalAlpha = 1;

  ctx.font = `${fontSize} 'Optimus Princeps'`;
  ctx.fillText(uppercaseText, width / 2, (height / 100) * textPosition);

  const suggestedAltText = buildAltText(settings);

  return {
    suggestedAltText,
  };
};
