import { loadImage } from './loadImage';

interface DrawImageOptions {
  x?: number;
  y?: number;
  width?: number;
  height?: number;
}

export const drawImage = async (
  ctx: CanvasRenderingContext2D,
  url: string,
  options: DrawImageOptions = {}
) => {
  const image = await loadImage(url);
  ctx.drawImage(image, options.x || 0, options.y || 0);
};
