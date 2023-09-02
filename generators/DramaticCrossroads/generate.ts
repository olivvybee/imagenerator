import { GeneratorFunction } from '../../types/GeneratorTypes';
import { applyCrop } from '../../utils/applyCrop';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { DramaticCrossroadsSettings, Variant } from './types';

export const generate: GeneratorFunction<DramaticCrossroadsSettings> = async (
  canvas,
  settings
) => {
  const { leftPath = '', rightPath = '', person = '', variant } = settings;

  const imagePath = getImagePath(variant);
  const image = await loadImage(imagePath);

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

  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.fontSize = FONT_SIZE;
  multilineText.align = 'center';
  multilineText.vAlign = 'top';
  multilineText.background = true;

  if (leftPath) {
    multilineText.drawText(
      ctx,
      leftPath,
      15,
      15,
      width / 2 - 30,
      height / 3 - 30
    );
  }

  if (rightPath) {
    multilineText.drawText(
      ctx,
      rightPath,
      width / 2 + 15,
      15,
      width / 2 - 30,
      height / 3 - 30
    );
  }

  if (person) {
    multilineText.vAlign = 'middle';
    multilineText.drawText(
      ctx,
      person,
      width / 2 - 150,
      height - 125 - 15,
      300,
      125
    );
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};

const getImagePath = (variant: string) => {
  switch (variant) {
    case Variant.GoodAndEvil:
      return '/assets/crossroads.png';
    case Variant.BothEvil:
      return '/assets/crossroads-dark.png';
    case Variant.BothGood:
      return '/assets/crossroads-light.png';
    default:
      return '';
  }
};
