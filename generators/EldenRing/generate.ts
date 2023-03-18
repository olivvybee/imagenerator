import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';

import { buildText } from './buildText';
import { WIDTH, HEIGHT } from './constants';
import {
  drawBackground,
  drawBorders,
  drawButtons,
  drawText,
} from './drawElements';
import { EldenRingSettings, EldenRingCache } from './types';

export const generate: GeneratorFunction<
  EldenRingSettings,
  EldenRingCache
> = async (canvas, settings, cache) => {
  const font =
    cache?.font || (await loadFont('Garamond', '/fonts/EB-Garamond.woff2'));
  const icon = cache?.icon || (await loadImage('/assets/elden-ring-icon.png'));

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  drawBackground(ctx);
  drawBorders(ctx);
  drawButtons(ctx);

  ctx.drawImage(icon, 56, 60);

  const text = buildText(settings);
  drawText(ctx, text);

  const singleLineText = text.replaceAll('\n', ' ');
  const suggestedAltText = `An Elden Ring message box that says "${singleLineText}".`;

  return {
    success: true,
    suggestedAltText,
    cache: {
      font,
      icon,
    },
  };
};
