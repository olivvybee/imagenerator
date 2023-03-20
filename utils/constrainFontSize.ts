interface Options {
  font: string;
  targetSize: number;
  maxWidth?: number;
}

export const constrainFontSize = (
  ctx: CanvasRenderingContext2D,
  text: string,
  options: Options
) => {
  const { font, targetSize, maxWidth = ctx.canvas.width } = options;

  let size: number;
  for (size = targetSize; size > 0; size--) {
    ctx.font = `${size}px ${font}`;
    if (ctx.measureText(text).width <= maxWidth) {
      break;
    }
  }

  return size;
};
