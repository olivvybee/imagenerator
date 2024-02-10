import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CIRCLE_COLOURS,
  FONT_SIZE,
} from './constants';
import { VennDiagramSettings } from './types';

const RADIUS = Math.min(CANVAS_WIDTH, CANVAS_HEIGHT) * 0.4;

export const generate: GeneratorFunction<VennDiagramSettings> = async (
  canvas,
  settings
) => {
  const {
    leftCircle,
    rightCircle,
    overlap,
    leftCircleColour,
    rightCircleColour,
  } = settings;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  fillCircle(
    ctx,
    CANVAS_WIDTH / 3,
    CANVAS_HEIGHT / 2,
    CIRCLE_COLOURS[leftCircleColour]
  );
  fillCircle(
    ctx,
    (2 * CANVAS_WIDTH) / 3,
    CANVAS_HEIGHT / 2,
    CIRCLE_COLOURS[rightCircleColour]
  );

  strokeCircle(ctx, CANVAS_WIDTH / 3, CANVAS_HEIGHT / 2);
  strokeCircle(ctx, (2 * CANVAS_WIDTH) / 3, CANVAS_HEIGHT / 2);

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    background: true,
    align: 'center',
  });

  multilineText.drawText(leftCircle, {
    x: CANVAS_WIDTH / 3 - RADIUS + 16,
    y: CANVAS_HEIGHT / 2 - RADIUS / 2,
    width: RADIUS,
    height: RADIUS,
  });

  multilineText.drawText(rightCircle, {
    x: (2 * CANVAS_WIDTH) / 3 - 16,
    y: CANVAS_HEIGHT / 2 - RADIUS / 2,
    width: RADIUS,
    height: RADIUS,
  });

  const overlapWidth = RADIUS * 0.75;

  multilineText.drawText(overlap, {
    x: CANVAS_WIDTH / 2 - overlapWidth / 2,
    y: CANVAS_HEIGHT / 2 - RADIUS / 2,
    width: overlapWidth,
    height: RADIUS,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};

const fillCircle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  colour: string
) => {
  ctx.globalAlpha = 0.75;
  ctx.fillStyle = colour;

  ctx.beginPath();
  ctx.ellipse(x, y, RADIUS, RADIUS, 0, 0, 2 * Math.PI);

  ctx.fill();

  ctx.globalAlpha = 1;
};

const strokeCircle = (ctx: CanvasRenderingContext2D, x: number, y: number) => {
  ctx.beginPath();
  ctx.ellipse(x, y, RADIUS, RADIUS, 0, 0, 2 * Math.PI);

  ctx.strokeStyle = '#000000';
  ctx.stroke();
};
