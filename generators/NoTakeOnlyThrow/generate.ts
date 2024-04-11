import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { setupCanvas } from '../../utils/setupCanvas';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { NoTakeOnlyThrowSettings } from './types';

export const generate: GeneratorFunction<NoTakeOnlyThrowSettings> = async (
  canvas,
  settings
) => {
  const { panel1, panel2, panel3 } = settings;

  const image = await loadImage('/assets/no-take-only-throw.jpg');
  const ctx = await setupCanvas(canvas, { backgroundImage: image });

  if (!ctx) {
    return {
      success: false,
    };
  }

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
  });

  multilineText.drawText(panel1, { x: 20, y: 20, width: 175, height: 100 });
  multilineText.drawText(panel2, { x: 233, y: 20, width: 175, height: 100 });
  multilineText.drawText(panel3, { x: 446, y: 20, width: 175, height: 100 });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
