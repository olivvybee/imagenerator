import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/drawMultilineText';
import { loadImage } from '../../utils/loadImage';
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

  const multilineText = new MultilineText(ctx, { fontSize: 48 });

  multilineText.drawText(firstPanel, {
    x: 16,
    y: 0,
    width: 485,
    height: 375,
  });
  multilineText.drawText(secondPanel, {
    x: 16,
    y: 381,
    width: 485,
    height: 370,
  });
  multilineText.drawText(thirdPanel, {
    x: 16,
    y: 757,
    width: 485,
    height: 367,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
    cache: {
      backgroundImage,
    },
  };
};
