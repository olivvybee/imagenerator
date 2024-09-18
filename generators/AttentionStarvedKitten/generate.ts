import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { setupCanvas } from '../../utils/setupCanvas';
import { buildAltText } from './buildAltText';
import { CANVAS_HEIGHT, CANVAS_WIDTH, FONT_SIZE } from './constants';
import { AttentionStarvedKittenSettings } from './types';

export const generate: GeneratorFunction<AttentionStarvedKittenSettings> = async (
  canvas,
  settings
) => {
  const { topCatLabel, bottomCatLabel } = settings;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const image = await loadImage('/assets/attention-starved-kitten.jpg');
  const ctx = await setupCanvas(canvas, { backgroundImage: image });
  if (!ctx) {
    return {
      success: false,
    };
  }

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
  });
  multilineText.drawText(topCatLabel, {
    x: 5,
    y: 380,
    width: CANVAS_WIDTH - 10,
    height: 200,
  });
  multilineText.drawText(bottomCatLabel, {
    x: 5,
    y: CANVAS_HEIGHT - 200,
    width: CANVAS_WIDTH - 10,
    height: 200,
    colour: '#FFFFFF',
    background: true,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
