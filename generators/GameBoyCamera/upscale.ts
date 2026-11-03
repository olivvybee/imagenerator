import { SCALE_FACTOR } from './constants';

export const upscale = (pixels: ImageData) => {
  const oldData = pixels.data;
  const oldWidth = pixels.width;

  const newWidth = pixels.width * SCALE_FACTOR;
  const newHeight = pixels.height * SCALE_FACTOR;

  const newPixels = new ImageData(newWidth, newHeight);
  const newData = newPixels.data;

  let newIndex = 0;

  for (let y = 0; y < newHeight; y++) {
    for (let x = 0; x < newWidth; x++) {
      const oldX = Math.floor(x / SCALE_FACTOR);
      const oldY = Math.floor(y / SCALE_FACTOR);

      const oldIndex = (oldX + oldY * oldWidth) * 4;

      newData[newIndex] = oldData[oldIndex];
      newData[newIndex + 1] = oldData[oldIndex + 1];
      newData[newIndex + 2] = oldData[oldIndex + 2];
      newData[newIndex + 3] = oldData[oldIndex + 3];

      newIndex += 4;
    }
  }

  return newPixels;
};
