import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { SisyphusSettings } from './types';

export const generate: GeneratorFunction<SisyphusSettings> = async (
  canvas,
  settings,
) => {
  const { boulder, sisyphus } = settings;

  const image = await loadImage('/assets/sisyphus.jpg');

  const { width, height } = image;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.clearRect(0, 0, width, height);

  ctx.drawImage(image, 0, 0, width, height);

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
  });

  multilineText.drawText(boulder, {
    x: 285,
    y: 20,
    width: 380,
    height: 380,
    align: 'center',
    vAlign: 'middle',
    colour: 'white',
  });

  if (sisyphus) {
    multilineText.drawText(sisyphus, {
      x: 75,
      y: 340,
      width: 380,
      height: 150,
      align: 'center',
      vAlign: 'middle',
      colour: 'white',
      background: true,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
