export const convertToGreyscale = (pixels: ImageData) => {
  const { data, width, height } = pixels;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Location in the pixel array for the start of the current pixel
      // Each pixel is represented by 4 values in the array (hence multiplying by 4)
      const i = (x + y * width) * 4;

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const greyscale = r * 0.3 + g * 0.59 + b * 0.11;

      data[i] = greyscale;
      data[i + 1] = greyscale;
      data[i + 2] = greyscale;
    }
  }

  return pixels;
};
