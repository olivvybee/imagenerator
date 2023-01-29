interface DrawTextOptions {
  x?: number;
  y: number;
  padding?: number;
  strokeWidth?: number;
  opaque?: boolean;
}

export const drawTextWithBackground = (
  ctx: CanvasRenderingContext2D,
  text: string,
  options: DrawTextOptions
) => {
  const canvasWidth = ctx.canvas.width;

  const { width, actualBoundingBoxAscent, actualBoundingBoxDescent } =
    ctx.measureText(text);

  const {
    x = canvasWidth / 2,
    y,
    padding = 16,
    strokeWidth,
    opaque = false,
  } = options;

  ctx.textAlign = 'center';

  ctx.fillStyle = 'rgba(0, 0, 0)';
  ctx.globalAlpha = opaque ? 1 : 0.5;
  ctx.fillRect(
    x - width / 2 - padding,
    y - actualBoundingBoxAscent - padding,
    width + padding * 2,
    actualBoundingBoxAscent + actualBoundingBoxDescent + padding * 2
  );
  ctx.globalAlpha = 1;

  ctx.fillStyle = 'white';
  ctx.fillText(text, x, y);
  if (strokeWidth) {
    ctx.strokeStyle = `${strokeWidth}px black`;
    ctx.strokeText(text, x - strokeWidth / 2, y);
  }
};
