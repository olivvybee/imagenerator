import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';

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

  multilineText.fontSize = FONT_SIZE;
  multilineText.font = 'Tahoma';
  multilineText.background = false;
  ctx.fillStyle = 'transparent';
  ctx.textBaseline = 'bottom';
  multilineText.align = 'left';
  multilineText.vAlign = 'top';
  multilineText.lineHeight = FONT_SIZE * 1.2;

  const textToMeasure = [text, button1, button2, button3]
    .filter((s) => !!s)
    .join('\n\n');

  const { height: textHeight } = multilineText.drawText(
    ctx,
    textToMeasure,
    bubbleX + BUBBLE_PADDING,
    BUBBLE_MARGIN + BUBBLE_PADDING,
    bubbleWidth - 2 * BUBBLE_PADDING,
    MAX_HEIGHT
  );

  const bubbleHeight =
    (textHeight <= MAX_HEIGHT ? textHeight : MAX_HEIGHT) + 2 * BUBBLE_PADDING;
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

  multilineText.fontSize = FONT_SIZE;
  multilineText.font = 'Tahoma';
  multilineText.background = false;
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'bottom';
  multilineText.align = 'left';
  multilineText.vAlign = 'middle';
  multilineText.lineHeight = FONT_SIZE * 1.2;

  const textToDraw = [text, button1, button2, button3]
    .filter((s) => !!s)
    .join('\n\n🔵 ');

  multilineText.drawText(
    ctx,
    textToDraw,
    bubbleX + BUBBLE_PADDING,
    bubbleY + BUBBLE_PADDING,
    bubbleWidth - 2 * BUBBLE_PADDING,
    bubbleHeight - 2 * BUBBLE_PADDING
  );

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
