import { convertToPixelCrop, Crop } from 'react-image-crop';
import { loadImage } from './loadImage';

export const applyCrop = async (imageSrc: string, crop: Crop) => {
  const image = await loadImage(imageSrc);

  const pixelCrop = convertToPixelCrop(crop, image.width, image.height);

  const canvas = document.createElement('canvas');
  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return undefined;
  }

  ctx.translate(-pixelCrop.x, -pixelCrop.y);
  ctx.drawImage(image, 0, 0);

  return canvas.toDataURL('image/png');
};
