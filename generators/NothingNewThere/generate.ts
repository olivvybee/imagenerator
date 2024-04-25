import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';
import { setupCanvas } from '../../utils/setupCanvas';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { NothingNewThereSettings } from './types';

export const generate: GeneratorFunction<NothingNewThereSettings> = async (
  canvas,
  settings
) => {
  const { text } = settings;

  await loadFont('Momo', '/fonts/Momo.woff2');

  const image = await loadImage('/assets/nothing-new-there.png');
  const ctx = await setupCanvas(canvas, { backgroundImage: image });

  if (!ctx) {
    return {
      success: false,
    };
  }

  const multilineText = new MultilineText(ctx, {
    fontFace: 'Momo',
    fontSize: FONT_SIZE,
    colour: '#65205D',
  });

  if (text) {
    multilineText.drawText(text, {
      x: 50,
      y: 650,
      width: 540,
      height: 130,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
