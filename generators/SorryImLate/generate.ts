import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/drawMultilineText';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { SorryImLateSettings } from './types';

export const generate: GeneratorFunction<SorryImLateSettings> = async (
  canvas,
  settings
) => {
  const { panel1Text = '', panel2Text } = settings;

  const image = await loadImage('/assets/sorry-im-late.jpg');
  const { width, height } = image;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.drawImage(image, 0, 0);

  const multilineText = new MultilineText(ctx, { fontSize: FONT_SIZE });

  if (panel1Text) {
    multilineText.drawText(panel1Text, {
      x: 530,
      y: 220,
      width: 350,
      height: 130,
    });
  }

  if (panel2Text) {
    multilineText.drawText(panel2Text, {
      x: 155,
      y: 650,
      width: 200,
      height: 90,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
