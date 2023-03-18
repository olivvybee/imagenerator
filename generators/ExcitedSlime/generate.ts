import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';
import { setupCanvas } from '../../utils/setupCanvas';

import { buildAltText } from './buildAltText';
import { ExcitedSlimeSettings, ExcitedSlimeCache } from './types';

export const generate: GeneratorFunction<
  ExcitedSlimeSettings,
  ExcitedSlimeCache
> = async (canvas, settings, cache) => {
  const backgroundImage =
    cache?.backgroundImage || (await loadImage('/assets/excited-slime.jpg'));

  const ctx = await setupCanvas(canvas, { backgroundImage });
  if (!ctx) {
    return {
      success: false,
    };
  }

  const { firstPanel = '', secondPanel = '', thirdPanel = '' } = settings;

  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.fontSize = 48;
  multilineText.background = false;
  multilineText.drawText(ctx, firstPanel, 16, 0, 485, 375);
  multilineText.drawText(ctx, secondPanel, 16, 381, 485, 370);
  multilineText.drawText(ctx, thirdPanel, 16, 757, 485, 367);

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
    cache: {
      backgroundImage,
    },
  };
};
