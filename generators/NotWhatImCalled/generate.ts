import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { calculateImageSize } from '../../utils/resizeImage';
import { setupCanvas } from '../../utils/setupCanvas';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { NotWhatImCalledSettings } from './types';

export const generate: GeneratorFunction<NotWhatImCalledSettings> = async (
  canvas,
  settings
) => {
  const { name, image } = settings;

  const backgroundImage = await loadImage('/assets/not-what-im-called.jpg');

  await setupCanvas(canvas, { backgroundImage });

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  if (image && image.src) {
    const loadedImage = await loadImage(image.src);

    const { width, height } = calculateImageSize(loadedImage, 512);
    const y = (canvas.height - height) / 2;

    ctx.drawImage(loadedImage, 625, y, width, height);
  }

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
  });
  multilineText.drawText(name, {
    x: 15,
    y: 105,
    width: 420,
    height: 150,
    colour: 'black',
    background: true,
    opaqueBackground: true,
    backgroundColour: '#313237',
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
