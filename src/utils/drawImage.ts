export const drawImage = async (ctx: CanvasRenderingContext2D, url: string) => {
  const image = new Image();
  await new Promise((resolve) => {
    image.onload = resolve;
    image.src = url;
  });
  ctx.drawImage(image, 0, 0);
};
