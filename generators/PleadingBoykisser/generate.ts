import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { setupCanvas } from '../../utils/setupCanvas';
import { loadFont } from '../../utils/loadFont';


import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { PleadingBoykisserSettings } from './types';

export const generate: GeneratorFunction<PleadingBoykisserSettings> = async (
  canvas,
  settings
) => {
  const { text } = settings;

  await loadFont('Grandstander', '/fonts/Grandstander-Regular.woff2');

  const image = await loadImage('/assets/pleading-boykisser.jpg');
  const ctx = await setupCanvas(canvas, { backgroundImage: image });

  if (!ctx) {
    return {
      success: false,
    };
  }

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    fontFace: 'Grandstander',
  });
  multilineText.drawText(text, {
    x: 10,
    y: 10,
    width: canvas.width - 20,
    height: 150,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
