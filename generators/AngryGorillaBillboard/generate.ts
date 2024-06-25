import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { setupCanvas } from '../../utils/setupCanvas';

import { buildAltText } from './buildAltText';
import { CANVAS_HEIGHT, CANVAS_WIDTH, FONT_SIZE } from './constants';
import { AngryGorillaBillboardSettings } from './types';

export const generate: GeneratorFunction<
  AngryGorillaBillboardSettings
> = async (canvas, settings) => {
  const { text } = settings;

  const image = await loadImage('/assets/gorilla-billboard.jpg');
  const ctx = await setupCanvas(canvas, { backgroundImage: image });

  if (!ctx) {
    return {
      success: false,
    };
  }

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    lineHeight: 1.4,
  });

  multilineText.drawText(text, {
    x: 120,
    y: 440,
    width: 375,
    height: 225,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
