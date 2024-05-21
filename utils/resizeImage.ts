import { Size } from '../types/UtilTypes';

export const calculateImageSize = (
  image: HTMLImageElement,
  targetSize: number | Size
): Size => {
  const { width, height } = image;

  const ratio = width / height;

  if (typeof targetSize === 'number') {
    const newWidth = width > height ? targetSize : targetSize * ratio;
    const newHeight = height > width ? targetSize : targetSize / ratio;

    return { width: newWidth, height: newHeight };
  }

  const targetRatio = targetSize.width / targetSize.height;

  if (targetRatio < ratio) {
    return {
      width: targetSize.width,
      height: targetSize.width / ratio,
    };
  } else {
    return {
      width: targetSize.height * ratio,
      height: targetSize.height,
    };
  }
};
