import Color from 'color';

import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import multilineText from '../../utils/multilineText';
import { calculateImageSize } from '../../utils/resizeImage';

import { buildAltText } from './buildAltText';
import { FONT_SIZE, OUTPUT_SIZE, SPACING } from './constants';
import { TopBottomTextSettings } from './types';

export const generate: GeneratorFunction<TopBottomTextSettings> = async (
  canvas,
  settings
) => {
  const { topText, bottomText, backgroundColour } = settings;

  if (!settings.image.src) {
    return {
      success: false,
    };
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  const image = await loadImage(settings.image.src);
  const { width, height } = calculateImageSize(image, OUTPUT_SIZE);

  let topTextHeight = 0;
  let bottomTextHeight = 0;

  multilineText.fontSize = FONT_SIZE;
  multilineText.font = 'Atkinson Hyperlegible';
  multilineText.background = false;

  if (topText) {
    const measurements = multilineText.drawText(
      ctx,
      topText,
      0,
      SPACING,
      width - SPACING,
      1000
    );
    topTextHeight = measurements.height;
  }

  if (bottomText) {
    const measurements = multilineText.drawText(
      ctx,
      bottomText,
      0,
      0,
      width - SPACING,
      1000
    );
    bottomTextHeight = measurements.height;
  }

  const topSpacing = topTextHeight ? SPACING : 0;
  const bottomSpacing = bottomTextHeight ? SPACING : 0;
  const totalHeight =
    height + topTextHeight + topSpacing + bottomTextHeight + bottomSpacing;

  canvas.width = width;
  canvas.height = totalHeight;

  ctx.fillStyle = backgroundColour.hex;
  ctx.fillRect(0, 0, width, totalHeight);

  const imageTop = topTextHeight + topSpacing;
  ctx.drawImage(image, 0, imageTop, width, height);

  const background = Color(backgroundColour.hex);
  const textColour = background.isLight() ? '#000000' : '#ffffff';

  ctx.fillStyle = textColour;
  ctx.textBaseline = 'bottom';
  multilineText.vAlign = 'top';

  if (topText) {
    multilineText.drawText(
      ctx,
      topText,
      SPACING / 2,
      SPACING / 2,
      width - SPACING,
      topTextHeight
    );
  }
  if (bottomText) {
    multilineText.drawText(
      ctx,
      bottomText,
      SPACING / 2,
      imageTop + height + SPACING / 2,
      width - SPACING,
      bottomTextHeight
    );
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
