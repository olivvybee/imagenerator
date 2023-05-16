import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';
import { generateAltText } from './generateAltText';

import { InterruptingCrowSettings } from './types';

export const generate: GeneratorFunction<InterruptingCrowSettings> = async (
  canvas,
  settings
) => {
  const {
    topLeftText = '',
    topRightText1 = '',
    topRightText2 = '',
    bottomLeftText = '',
    bottomRightText = '',
  } = settings;

  const background = await loadImage('/assets/interrupting-crow-main.png');
  const bubble = await loadImage('/assets/interrupting-crow-bubble.png');
  const topRightBird = await loadImage(
    '/assets/interrupting-crow-top-right.png'
  );
  const bottomLeftBird = await loadImage(
    '/assets/interrupting-crow-bottom-left.png'
  );
  const bottomRightBird = await loadImage(
    '/assets/interrupting-crow-bottom-right.png'
  );

  const { width, height } = background;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return { success: false };
  }

  ctx.drawImage(background, 0, 0);

  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.fontSize = 32;
  multilineText.background = false;
  multilineText.align = 'center';
  multilineText.vAlign = 'middle';

  multilineText.drawText(ctx, topLeftText, 35, 20, 250, 80);
  multilineText.drawText(ctx, topRightText1, 485, 60, 250, 65);

  ctx.drawImage(bubble, 0, 0);

  multilineText.fontSize = 36;
  multilineText.vAlign = 'top';
  multilineText.drawText(ctx, topRightText2.toUpperCase(), 645, 10, 240, 150);

  ctx.drawImage(topRightBird, 0, 0);

  multilineText.drawText(ctx, bottomLeftText.toUpperCase(), 145, 450, 300, 180);

  ctx.drawImage(bottomLeftBird, 0, 0);

  multilineText.fontSize = 42;
  multilineText.drawText(
    ctx,
    bottomRightText.toUpperCase(),
    535,
    450,
    350,
    220
  );

  ctx.drawImage(bottomRightBird, 0, 0);

  const altText = generateAltText(settings);

  return {
    success: true,
    suggestedAltText: altText,
  };
};
