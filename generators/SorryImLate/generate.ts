import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { SorryImLateSettings } from './types';

export const generate: GeneratorFunction<SorryImLateSettings> = async (
  canvas,
  settings
) => {
  const { panel1Text, panel2Text } = settings;

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

  multilineText.fontSize = FONT_SIZE;
  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.background = false;
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'bottom';
  multilineText.vAlign = 'middle';

  multilineText.drawText(
    ctx,
    `Sorry I'm late ${panel1Text || ''}`,
    530,
    220,
    350,
    130
  );

  if (panel2Text) {
    multilineText.drawText(ctx, panel2Text, 155, 650, 200, 90);
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
