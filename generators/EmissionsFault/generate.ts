import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';
import { MultilineText } from '../../utils/MultilineText';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { EmissionsFaultSettings } from './types';

export const generate: GeneratorFunction<EmissionsFaultSettings> = async (
  canvas,
  settings
) => {
  const { text } = settings;

  await loadFont('Pixellari', '/fonts/Pixellari.woff2');
  const image = await loadImage('/assets/emissions-fault.jpg');

  const { width, height } = image;

  canvas.width = image.width;
  canvas.height = image.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(image, 0, 0);

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    fontFace: 'Pixellari',
    colour: 'white',
  });
  multilineText.drawText(text, {
    x: 470,
    y: 675,
    width: 340,
    height: 135,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
