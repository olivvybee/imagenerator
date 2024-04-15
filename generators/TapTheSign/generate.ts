import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { calculateImageSize } from '../../utils/resizeImage';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { TapTheSignSettings } from './types';

export const generate: GeneratorFunction<TapTheSignSettings> = async (
  canvas,
  settings
) => {
  const { text, image } = settings;

  const backgroundImage = await loadImage('/assets/tap-the-sign.jpg');
  const { width, height } = backgroundImage;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.drawImage(backgroundImage, 0, 0);

  const multilineText = new MultilineText(ctx, { fontSize: FONT_SIZE });

  if (image.src) {
    const loadedImage = await loadImage(image.src);
    const imageSize = calculateImageSize(loadedImage, {
      width: 460,
      height: 295,
    });
    const x = 90 + (460 - imageSize.width) / 2;
    const y = 530 + (295 - imageSize.height) / 2;
    ctx.drawImage(loadedImage, x, y, imageSize.width, imageSize.height);
  } else if (text) {
    multilineText.drawText(text, { x: 90, y: 530, width: 460, height: 295 });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
