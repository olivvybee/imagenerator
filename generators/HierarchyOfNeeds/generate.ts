import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadFont } from '../../utils/loadFont';
import multilineText from '../../utils/multilineText';

import { buildAltText } from './buildAltText';
import {
  WIDTH,
  HEIGHT,
  BACKGROUND_COLOUR,
  SEGMENT_COLOURS,
  SEGMENT_MAP,
  TEXT_BOXES,
} from './constants';
import { HierarchyOfNeedsSettings, HierarchyOfNeedsCache } from './types';

export const generate: GeneratorFunction<
  HierarchyOfNeedsSettings,
  HierarchyOfNeedsCache
> = async (canvas, settings, cache) => {
  const font = cache?.font || (await loadFont());

  const {
    numberOfSegments,
    segment1 = '',
    segment2 = '',
    segment3 = '',
    segment4 = '',
    segment5 = '',
  } = settings;

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = BACKGROUND_COLOUR;
  ctx.fillRect(0, 0, WIDTH, HEIGHT);

  const triangleWidth = WIDTH - 150;
  const triangleHeight = HEIGHT - 60;

  ctx.fillStyle = SEGMENT_COLOURS[0];
  ctx.fillRect(0, 30, WIDTH, (2 * triangleHeight) / 6);

  const blocks = SEGMENT_MAP[numberOfSegments];
  for (let i = 0; i < blocks.length; i++) {
    const colour = SEGMENT_COLOURS[blocks[i]];
    ctx.fillStyle = colour;
    ctx.fillRect(
      0,
      30 + (i + 2) * (triangleHeight / 6),
      WIDTH,
      triangleHeight / 6
    );
  }

  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2, 30);
  ctx.lineTo(30, 30 + triangleHeight);
  ctx.lineTo(30 + triangleWidth, 30 + triangleHeight);
  ctx.closePath();
  ctx.stroke();

  ctx.fillStyle = BACKGROUND_COLOUR;
  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2, 0);
  ctx.lineTo(30 + triangleWidth / 2, 30);
  ctx.lineTo(30, 30 + triangleHeight);
  ctx.lineTo(0, HEIGHT);
  ctx.lineTo(0, 0);
  ctx.fill();

  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2, 0);
  ctx.lineTo(30 + triangleWidth / 2, 30);
  ctx.lineTo(30 + triangleWidth, 30 + triangleHeight);
  ctx.lineTo(WIDTH, HEIGHT);
  ctx.lineTo(WIDTH, 0);
  ctx.fill();

  ctx.strokeStyle = 'black';
  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2 + 40, 30);
  ctx.lineTo(30 + triangleWidth + 40, 30 + triangleHeight);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(30 + triangleWidth / 2 + 10, 30);
  ctx.lineTo(30 + triangleWidth / 2 + 40, 30);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(740, 30 + (2 * triangleHeight) / 6);
  ctx.lineTo(770, 30 + (2 * triangleHeight) / 6);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(915, 30 + (4 * triangleHeight) / 6);
  ctx.lineTo(945, 30 + (4 * triangleHeight) / 6);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(1090, 30 + triangleHeight);
  ctx.lineTo(1120, 30 + triangleHeight);
  ctx.stroke();

  ctx.font = "32px 'Atkinson Hyperlegible'";
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'black';

  ctx.fillText('Self-fulfillment', 740, 15 + triangleHeight / 6);
  ctx.fillText('needs', 740, 45 + triangleHeight / 6);
  ctx.beginPath();
  ctx.moveTo(730, 30 + triangleHeight / 6);
  ctx.lineTo(682, 30 + triangleHeight / 6);
  ctx.stroke();

  ctx.fillText('Psychological', 915, 15 + (3 * triangleHeight) / 6);
  ctx.fillText('needs', 915, 45 + (3 * triangleHeight) / 6);
  ctx.beginPath();
  ctx.moveTo(905, 30 + (3 * triangleHeight) / 6);
  ctx.lineTo(857, 30 + (3 * triangleHeight) / 6);
  ctx.stroke();

  ctx.fillText('Basic', 1090, 15 + (5 * triangleHeight) / 6);
  ctx.fillText('needs', 1090, 45 + (5 * triangleHeight) / 6);
  ctx.beginPath();
  ctx.moveTo(1080, 30 + (5 * triangleHeight) / 6);
  ctx.lineTo(1032, 30 + (5 * triangleHeight) / 6);
  ctx.stroke();

  const segments = [segment1, segment2, segment3, segment4, segment5].slice(
    0,
    numberOfSegments
  );

  const textBoxes = TEXT_BOXES[numberOfSegments];
  textBoxes.forEach((textBox, index) => {
    const { x, y, width, height } = textBox;
    const text = segments[index];

    ctx.textBaseline = 'bottom';

    multilineText.fontSize = 48;
    multilineText.drawText(ctx, text, x, y, width, height);
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
    cache: {
      font,
    },
  };
};
