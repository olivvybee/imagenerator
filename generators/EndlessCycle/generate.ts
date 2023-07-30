import { GeneratorFunction } from '../../types/GeneratorTypes';
import multilineText from '../../utils/multilineText';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { EndlessCycleSettings } from './types';

const TEXT_WIDTH = 350;
const TEXT_HEIGHT = 250;

interface Text {
  x: number;
  y: number;
  align?: 'top' | 'middle' | 'bottom';
}

const TEXT_POSITIONS: Text[][] = [
  [
    { x: 275, y: 25, align: 'bottom' },
    { x: 275, y: 625, align: 'top' },
  ],
  [
    { x: 275, y: 75 },
    { x: 525, y: 525 },
    { x: 25, y: 525 },
  ],
  [
    { x: 275, y: 25 },
    { x: 525, y: 325 },
    { x: 275, y: 625 },
    { x: 25, y: 325 },
  ],
];

enum ArrowDirection {
  Up,
  Down,
  Left,
  Right,
  UpLeft,
  UpRight,
  DownLeft,
  DownRight,
}

interface Arrow {
  start: { x: number; y: number };
  end: { x: number; y: number };
  controlPoint: { x: number; y: number };
  direction: ArrowDirection;
}

const ARROW_POSITIONS: Arrow[][] = [
  [
    {
      start: { x: 675, y: 300 },
      end: { x: 675, y: 600 },
      controlPoint: { x: 800, y: 450 },
      direction: ArrowDirection.DownLeft,
    },
    {
      start: { x: 225, y: 600 },
      end: { x: 225, y: 300 },
      controlPoint: { x: 75, y: 450 },
      direction: ArrowDirection.UpRight,
    },
  ],
  [
    {
      start: { x: 675, y: 200 },
      end: { x: 775, y: 500 },
      controlPoint: { x: 800, y: 200 },
      direction: ArrowDirection.Down,
    },
    {
      start: { x: 675, y: 800 },
      end: { x: 250, y: 800 },
      controlPoint: { x: 450, y: 950 },
      direction: ArrowDirection.UpLeft,
    },
    {
      start: { x: 125, y: 500 },
      end: { x: 225, y: 200 },
      controlPoint: { x: 100, y: 200 },
      direction: ArrowDirection.Right,
    },
  ],
  [
    {
      start: { x: 650, y: 150 },
      end: { x: 750, y: 300 },
      controlPoint: { x: 765, y: 175 },
      direction: ArrowDirection.Down,
    },
    {
      start: { x: 750, y: 600 },
      end: { x: 650, y: 750 },
      controlPoint: { x: 750, y: 750 },
      direction: ArrowDirection.Left,
    },
    {
      start: { x: 250, y: 750 },
      end: { x: 150, y: 600 },
      controlPoint: { x: 135, y: 750 },
      direction: ArrowDirection.Up,
    },
    {
      start: { x: 150, y: 300 },
      end: { x: 250, y: 150 },
      controlPoint: { x: 150, y: 150 },
      direction: ArrowDirection.Right,
    },
  ],
];

const drawArrow = (ctx: CanvasRenderingContext2D, arrow: Arrow) => {
  ctx.lineWidth = 10;
  ctx.strokeStyle = 'black';

  const { start, end, controlPoint, direction } = arrow;

  ctx.beginPath();
  ctx.moveTo(start.x, start.y);
  ctx.quadraticCurveTo(controlPoint.x, controlPoint.y, end.x, end.y);
  ctx.stroke();

  ctx.beginPath();
  switch (direction) {
    case ArrowDirection.Up:
      ctx.moveTo(end.x + 2.5, end.y);
      ctx.lineTo(end.x - 15, end.y + 15);
      ctx.moveTo(end.x - 2.5, end.y);
      ctx.lineTo(end.x + 15, end.y + 15);
      break;

    case ArrowDirection.UpLeft:
      ctx.moveTo(end.x, end.y - 5);
      ctx.lineTo(end.x, end.y + 30);
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x + 30, end.y);
      break;

    case ArrowDirection.UpRight:
      ctx.moveTo(end.x, end.y - 5);
      ctx.lineTo(end.x, end.y + 30);
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x - 30, end.y);
      break;

    case ArrowDirection.Down:
      ctx.moveTo(end.x + 5, end.y);
      ctx.lineTo(end.x - 15, end.y - 15);
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x + 15, end.y - 15);
      break;

    case ArrowDirection.DownRight:
      ctx.moveTo(end.x, end.y + 5);
      ctx.lineTo(end.x, end.y - 30);
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x - 30, end.y);
      break;

    case ArrowDirection.DownLeft:
      ctx.moveTo(end.x, end.y + 5);
      ctx.lineTo(end.x, end.y - 30);
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x + 30, end.y);
      break;

    case ArrowDirection.Left:
      ctx.moveTo(end.x, end.y + 5);
      ctx.lineTo(end.x + 15, end.y - 15);
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x + 15, end.y + 15);
      break;

    case ArrowDirection.Right:
      ctx.moveTo(end.x, end.y + 5);
      ctx.lineTo(end.x - 15, end.y - 15);
      ctx.moveTo(end.x, end.y);
      ctx.lineTo(end.x - 15, end.y + 15);
      break;
  }
  ctx.stroke();
};

export const generate: GeneratorFunction<EndlessCycleSettings> = async (
  canvas,
  settings
) => {
  const {
    numberOfSteps,
    step1 = '',
    step2 = '',
    step3 = '',
    step4 = '',
  } = settings;

  canvas.width = 900;
  canvas.height = 900;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 900, 900);

  multilineText.fontSize = FONT_SIZE;
  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.background = false;
  ctx.fillStyle = '#000000';
  ctx.textBaseline = 'bottom';
  multilineText.vAlign = 'middle';

  const textPositions = TEXT_POSITIONS[numberOfSteps - 2];
  const arrowPosition = ARROW_POSITIONS[numberOfSteps - 2];
  const steps = [step1, step2, step3, step4];

  for (let i = 0; i < numberOfSteps; i++) {
    const text = steps[i];
    const { x, y, align = 'middle' } = textPositions[i];
    multilineText.vAlign = align;
    multilineText.drawText(ctx, text, x, y, TEXT_WIDTH, TEXT_HEIGHT);

    drawArrow(ctx, arrowPosition[i]);
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
