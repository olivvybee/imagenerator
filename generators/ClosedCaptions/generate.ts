import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { calculateImageSize } from '../../utils/resizeImage';
import { setupCanvas } from '../../utils/setupCanvas';

import { buildAltText } from './buildAltText';
import {
  CANVAS_WIDTH,
  CANVAS_HEIGHT,
  FONT_SIZE,
  POSITIONS,
  FONTS,
} from './constants';
import { ClosedCaptionsSettings } from './types';
import { loadChosenFont } from './utils';

export const generate: GeneratorFunction<ClosedCaptionsSettings> = async (
  canvas,
  settings
) => {
  const { image, text, font, textPosition } = settings;

  const chosenFont = FONTS[font];
  await loadChosenFont(font);

  const ctx = await setupCanvas(canvas, {
    width: CANVAS_WIDTH,
    height: CANVAS_HEIGHT,
  });
  if (!ctx) {
    return {
      success: false,
    };
  }

  if (image.src) {
    const loadedImage = await loadImage(image.src);
    const { width, height } = calculateImageSize(loadedImage, {
      width: CANVAS_WIDTH,
      height: CANVAS_HEIGHT,
    });

    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    const x = (CANVAS_WIDTH - width) / 2;
    const y = (CANVAS_HEIGHT - height) / 2;
    ctx.drawImage(loadedImage, x, y, width, height);
  }

  const { vAlign } = POSITIONS[textPosition];

  const multilineText = new MultilineText(ctx, {
    fontFace: chosenFont.name,
    fontSize: FONT_SIZE,
    vAlign,
    background: true,
    backgroundPadding: 16,
    ...chosenFont,
  });

  const textToDraw = chosenFont.allCaps ? text.toUpperCase() : text;

  multilineText.drawText(textToDraw, {
    x: 32,
    y: 32,
    width: canvas.width - 64,
    height: canvas.height - 64,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
