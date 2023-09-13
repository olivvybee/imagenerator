import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
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

  const multilineText = new MultilineText(ctx);

  multilineText.drawText(topLeftText, {
    x: 35,
    y: 20,
    width: 250,
    height: 80,
    fontSize: 32,
  });
  multilineText.drawText(topRightText1, {
    x: 485,
    y: 60,
    width: 250,
    height: 65,
    fontSize: 32,
  });

  ctx.drawImage(bubble, 0, 0);

  multilineText.drawText(topRightText2.toUpperCase(), {
    x: 645,
    y: 10,
    width: 240,
    height: 150,
    vAlign: 'top',
    fontSize: 36,
  });

  ctx.drawImage(topRightBird, 0, 0);

  multilineText.drawText(bottomLeftText.toUpperCase(), {
    x: 145,
    y: 450,
    width: 300,
    height: 180,
    vAlign: 'top',
    fontSize: 36,
  });

  ctx.drawImage(bottomLeftBird, 0, 0);

  multilineText.drawText(bottomRightText.toUpperCase(), {
    x: 535,
    y: 450,
    width: 350,
    height: 220,
    vAlign: 'top',
    fontSize: 42,
  });

  ctx.drawImage(bottomRightBird, 0, 0);

  const altText = generateAltText(settings);

  return {
    success: true,
    suggestedAltText: altText,
  };
};
