import { constrainFontSize } from '../../utils/constrainFontSize';
import { TEXT_COLOUR } from './constants';

interface Options {
  x: number;
  y: number;
  maxWidth: number;
  maxFontSize: number;
  strokeWidth: number;
}

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  { x, y, maxWidth, maxFontSize, strokeWidth }: Options
) => {
  const fontSize = constrainFontSize(ctx, text, {
    font: 'Yakuza',
    maxWidth,
    targetSize: maxFontSize,
  });

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  ctx.strokeStyle = 'white';
  ctx.lineWidth = (fontSize / maxFontSize) * strokeWidth;
  ctx.strokeText(text, x, y);

  ctx.fillStyle = TEXT_COLOUR;
  ctx.fillText(text, x, y);

  return fontSize;
};
