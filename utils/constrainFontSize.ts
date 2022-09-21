interface Options {
  x: number;
  y: number;
  font: string;
  targetSize: number;
  maxWidth?: number;
}

export const constrainFontSize = (
  ctx: CanvasRenderingContext2D,
  text: string,
  options: Options
) => {
  const { x, y, font, targetSize, maxWidth = ctx.canvas.width } = options;

  let size: number;
  for (size = targetSize; size > 0; size--) {
    ctx.font = `${size}px ${font}`;
    if (ctx.measureText(text).width <= maxWidth) {
      break;
    }
  }

  const prevBaseline = ctx.textBaseline;

  ctx.textBaseline = 'middle';
  ctx.fillText(text, x, y);

  ctx.textBaseline = prevBaseline;
};
