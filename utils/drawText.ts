interface DrawTextOptions {
  x?: number;
  y: number;
  padding: number;
  strokeWidth?: number;
}

export const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  options: DrawTextOptions
) => {
  const canvasWidth = ctx.canvas.width;

  const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
    ctx.measureText(text);

  const { x = canvasWidth / 2, y, padding, strokeWidth } = options;

  ctx.textAlign = 'center';

  ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
  ctx.fillRect(
    x - width / 2 - padding,
    y - actualBoundingBoxAscent - padding,
    width + padding * 2,
    actualBoundingBoxAscent + actualBoundingBoxDescent + padding * 2
  );

  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y);
  if (strokeWidth) {
    ctx.strokeStyle = `${strokeWidth}px black`;
    ctx.strokeText(text, x - strokeWidth / 2, y);
  }
};
