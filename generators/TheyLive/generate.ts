import { GeneratorFunction } from '../../types/GeneratorTypes';
import { applyCrop } from '../../utils/applyCrop';
import { loadImage } from '../../utils/loadImage';
import { buildAltText } from './buildAltText';
import { BORDER_WIDTH, IMAGE_SIZE, OUTPUT_SIZE } from './constants';
import { convertToGreyscale } from './convertToGreyscale';
import { TheyLiveCache, TheyLiveSettings } from './types';

export const generate: GeneratorFunction<
  TheyLiveSettings,
  TheyLiveCache
> = async (canvas, settings, cache) => {
  const { topImage, bottomImage } = settings;

  const topStaticImage =
    cache?.topStaticImage || (await loadImage('/assets/they-live-top.jpg'));
  const bottomStaticImage =
    cache?.bottomStaticImage ||
    (await loadImage('/assets/they-live-bottom.jpg'));

  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, OUTPUT_SIZE, OUTPUT_SIZE);

  ctx.drawImage(
    topStaticImage,
    BORDER_WIDTH,
    BORDER_WIDTH,
    IMAGE_SIZE,
    IMAGE_SIZE
  );
  ctx.drawImage(
    bottomStaticImage,
    BORDER_WIDTH,
    2 * BORDER_WIDTH + IMAGE_SIZE,
    IMAGE_SIZE,
    IMAGE_SIZE
  );

  if (topImage.src && topImage.crop) {
    const newTopImage = await applyCrop(topImage.src, topImage.crop);
    if (newTopImage) {
      const croppedTopImage = await loadImage(newTopImage);
      ctx.drawImage(
        croppedTopImage,
        2 * BORDER_WIDTH + IMAGE_SIZE,
        BORDER_WIDTH,
        IMAGE_SIZE,
        IMAGE_SIZE
      );
    }
  }

  if (bottomImage.src && bottomImage.crop) {
    const newBottomImage = await applyCrop(bottomImage.src, bottomImage.crop);
    if (newBottomImage) {
      const croppedBottomImage = await loadImage(newBottomImage);
      ctx.drawImage(
        croppedBottomImage,
        2 * BORDER_WIDTH + IMAGE_SIZE,
        2 * BORDER_WIDTH + IMAGE_SIZE,
        IMAGE_SIZE,
        IMAGE_SIZE
      );

      const pixels = ctx.getImageData(
        2 * BORDER_WIDTH + IMAGE_SIZE,
        2 * BORDER_WIDTH + IMAGE_SIZE,
        IMAGE_SIZE,
        IMAGE_SIZE
      );
      const greyPixels = convertToGreyscale(pixels);
      ctx.putImageData(
        greyPixels,
        2 * BORDER_WIDTH + IMAGE_SIZE,
        2 * BORDER_WIDTH + IMAGE_SIZE
      );
    }
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
    cache: {
      topStaticImage,
      bottomStaticImage,
    },
  };
};
