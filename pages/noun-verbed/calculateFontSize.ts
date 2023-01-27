const MAX_FONT_SIZE = 96;

export const calculateFontSize = (
  text: string,
  maxWidth: number,
  ctx: CanvasRenderingContext2D
) => {
  let fontSize = MAX_FONT_SIZE + 1;

  do {
    fontSize -= 1;
    ctx.font = `${fontSize}px 'Optimus Princeps'`;
  } while (ctx.measureText(text).width > maxWidth);

  return fontSize;
};
