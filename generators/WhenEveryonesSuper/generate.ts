import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { setupCanvas } from '../../utils/setupCanvas';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { WhenEveryonesSuperSettings } from './types';

export const generate: GeneratorFunction<WhenEveryonesSuperSettings> = async (
  canvas,
  settings
) => {
  const { topText, bottomText } = settings;

  const image = await loadImage('/assets/syndrome.jpg');
  const ctx = await setupCanvas(canvas, { backgroundImage: image });
  if (!ctx) {
    return { success: false }
  }

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    background: true,
    align: 'center',
  });

  if (topText) {
    multilineText.drawText(topText, {
      x: 25,
      y: 265,
      width: 850,
      height: 100,
    });
  }

  if (bottomText) {
    multilineText.drawText(bottomText, {
      x: 25,
      y: 640,
      width: 850,
      height: 100
    })
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
