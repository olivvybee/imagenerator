import Color from 'color';

import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';
import { calculateImageSize } from '../../utils/resizeImage';

import { buildAltText } from './buildAltText';
import { FONT_SIZE, OUTPUT_SIZE, SPACING } from './constants';
import { TopBottomTextSettings } from './types';
import { MultilineText } from '../../utils/drawMultilineText';

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

  const background = Color(backgroundColour.hex);
  const textColour = background.isLight() ? '#000000' : '#ffffff';

  const image = await loadImage(settings.image.src);
  const { width, height } = calculateImageSize(image, OUTPUT_SIZE);

  let topTextHeight = 0;
  let bottomTextHeight = 0;

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
    colour: textColour,
    vAlign: 'top',
  });

  if (topText) {
    const measurements = multilineText.drawText(topText, {
      x: 0,
      y: SPACING,
      width: width - SPACING,
      height: 1000,
    });
    topTextHeight = measurements.height;
  }

  if (bottomText) {
    const measurements = multilineText.drawText(bottomText, {
      x: 0,
      y: 0,
      width: width - SPACING,
      height: 1000,
    });
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

  if (topText) {
    multilineText.drawText(topText, {
      x: SPACING / 2,
      y: SPACING / 2,
      width: width - SPACING,
      height: topTextHeight,
    });
  }
  if (bottomText) {
    multilineText.drawText(bottomText, {
      x: SPACING / 2,
      y: imageTop + height + SPACING / 2,
      width: width - SPACING,
      height: bottomTextHeight,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
