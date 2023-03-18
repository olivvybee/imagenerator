import { GeneratorFunction } from '../../types/GeneratorTypes';
import { drawTextWithBackground } from '../../utils/drawText';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';

import { TuxedoMaskSettings, TuxedoMaskCache } from './types';

export const generate: GeneratorFunction<
  TuxedoMaskSettings,
  TuxedoMaskCache
> = async (canvas, settings, cache) => {
  const background =
    cache?.background || (await loadImage('/assets/tuxedo-mask.jpg'));
  const font = cache?.font || (await loadFont());

  const { rose = '', tuxedoMask = '', sailorMoon = '' } = settings;

  canvas.width = background.width;
  canvas.height = background.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.drawImage(background, 0, 0);

  ctx.font = "48px 'Atkinson Hyperlegible'";

  drawTextWithBackground(ctx, 'My job here is done', {
    y: 765,
    opaque: true,
  });
  drawTextWithBackground(ctx, "But you didn't do anything", {
    y: 1160,
    opaque: true,
  });

  if (rose) {
    drawTextWithBackground(ctx, rose, {
      x: 570,
      y: 240,
    });
  }

  if (tuxedoMask) {
    drawTextWithBackground(ctx, tuxedoMask, {
      x: 460,
      y: 530,
    });
  }

  if (sailorMoon) {
    drawTextWithBackground(ctx, sailorMoon, {
      x: 895,
      y: 935,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    suggestedAltText,
    cache: {
      background,
      font,
    },
  };
};
