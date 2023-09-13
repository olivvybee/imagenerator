import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import { MultilineText } from '../../utils/drawMultilineText';

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

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    vAlign: 'top',
    background: true,
  });

  if (leftPath) {
    multilineText.drawText(leftPath, {
      x: 15,
      y: 15,
      width: width / 2 - 30,
      height: height / 3 - 30,
    });
  }

  if (rightPath) {
    multilineText.drawText(rightPath, {
      x: width / 2 + 15,
      y: 15,
      width: width / 2 - 30,
      height: height / 3 - 30,
    });
  }

  if (person) {
    multilineText.drawText(person, {
      x: width / 2 - 150,
      y: height - 125 - 15,
      width: 300,
      height: 125,
      vAlign: 'middle',
    });
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
