import { GeneratorFunction } from '../../types/GeneratorTypes';
import { clamp } from '../../utils/clamp';
import { MultilineText } from '../../utils/drawMultilineText';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import {
  BUBBLE_MARGIN,
  BUBBLE_PADDING,
  BUTTON_SPACING,
  FONT_SIZE,
  MAX_HEIGHT,
  MAX_WIDTH,
  MIN_WIDTH,
} from './constants';
import { ClippySettings } from './types';

export const generate: GeneratorFunction<ClippySettings> = async (
  canvas,
  settings
) => {
  const { text = ' ', button1 = '', button2 = '', button3 = '' } = settings;

  await loadFont('Tahoma', '/fonts/Tahoma.woff2');

  const image = await loadImage('/assets/clippy.png');

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.font = `${FONT_SIZE}px Tahoma`;
  const measuredText = ctx.measureText(text);
  const textWidth = Math.max(measuredText.width, MIN_WIDTH);

  const bubbleWidth =
    (textWidth <= MAX_WIDTH ? textWidth : MAX_WIDTH) + 2 * BUBBLE_PADDING;
  const bubbleX = MAX_WIDTH - bubbleWidth + BUBBLE_MARGIN + 2 * BUBBLE_PADDING;

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    fontFace: 'Tahoma',
    align: 'left',
    vAlign: 'top',
  });

  const textToMeasure = [text, button1, button2, button3]
    .filter((s) => !!s)
    .join('\n\n');

  const { height: textHeight } = multilineText.drawText(textToMeasure, {
    x: bubbleX + BUBBLE_PADDING,
    y: BUBBLE_MARGIN + BUBBLE_PADDING,
    width: bubbleWidth - 2 * BUBBLE_PADDING,
    height: MAX_HEIGHT,
  });

  const measuredHeight = clamp(textHeight, FONT_SIZE, MAX_HEIGHT);

  const bubbleHeight = measuredHeight + 2 * BUBBLE_PADDING;
  const bubbleY =
    MAX_HEIGHT - bubbleHeight + BUBBLE_MARGIN + 2 * BUBBLE_PADDING;

  canvas.width = 800;
  canvas.height = 800;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 800);

  ctx.drawImage(image, 800 - image.width - 10, 800 - image.height - 10);

  ctx.fillStyle = '#ffffcc';
  ctx.strokeStyle = 'black';
  ctx.lineWidth = 4;
  ctx.beginPath();
  ctx.roundRect(bubbleX, bubbleY, bubbleWidth, bubbleHeight, 25);
  ctx.moveTo(575, 535);
  ctx.lineTo(575, 600);
  ctx.lineTo(515, 535);
  ctx.stroke();
  ctx.fill();

  const textToDraw = [text, button1, button2, button3]
    .filter((s) => !!s)
    .join('\n\n🔵 ');

  multilineText.drawText(textToDraw, {
    x: bubbleX + BUBBLE_PADDING,
    y: bubbleY + BUBBLE_PADDING,
    width: bubbleWidth - 2 * BUBBLE_PADDING,
    height: bubbleHeight - 2 * BUBBLE_PADDING,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
