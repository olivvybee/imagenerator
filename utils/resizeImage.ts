import { Size } from '../types/UtilTypes';

export const calculateImageSize = (
  image: HTMLImageElement,
  targetSize: number
): Size => {
  const { width, height } = image;

  const ratio = width / height;

  const newWidth = width > height ? targetSize : targetSize * ratio;
  const newHeight = height > width ? targetSize : targetSize / ratio;

  return { width: newWidth, height: newHeight };
};
