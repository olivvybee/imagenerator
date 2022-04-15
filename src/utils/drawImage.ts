interface DrawImageOptions {
  x?: number;
  y?: number;
}

export const drawImage = async (
  ctx: CanvasRenderingContext2D,
  url: string,
  options: DrawImageOptions = {}
) => {
  const image = new Image();
  await new Promise((resolve) => {
    image.onload = resolve;
    image.src = url;
  });
  ctx.drawImage(image, options.x || 0, options.y || 0);
};
