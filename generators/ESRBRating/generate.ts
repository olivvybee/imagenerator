import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  DESCRIPTION_FONT_SIZE,
  INITIALS_FONT_SIZE,
  RATING_FONT_SIZE,
  RATING_OPTIONS,
} from './constants';
import { ESRBRatingSettings } from './types';
import {
  getCustomInitials,
  hasCustomRating as settingsHaveCustomRating,
} from './utils';

export const generate: GeneratorFunction<ESRBRatingSettings> = async (
  canvas,
  settings,
) => {
  const { rating, customRating, text1, text2, text3, text4, text5 } = settings;
  const hasCustomRating = settingsHaveCustomRating(settings);

  const ratingText = (
    hasCustomRating ? customRating || '' : rating
  ).toUpperCase();

  const imagePath = `/assets/esrb/${RATING_OPTIONS[rating]}.svg`;
  const ratingImage = await loadImage(imagePath);

  await loadFont('Antonio', '/fonts/Antonio.woff2');

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  ctx.fillStyle = 'black';
  ctx.fillRect(5, 4, CANVAS_WIDTH - 10, CANVAS_HEIGHT - 8);

  if (ratingImage) {
    ctx.drawImage(ratingImage, 0, 0, (CANVAS_HEIGHT / 3) * 2, CANVAS_HEIGHT);
  }

  if (hasCustomRating) {
    ctx.fillStyle = 'black';
    ctx.font = `bolder ${RATING_FONT_SIZE}px Antonio`;

    const { width: ratingWidth } = ctx.measureText(ratingText);
    const ratingScale = 240 / ratingWidth;
    ctx.save();
    ctx.scale(ratingScale, 1);
    ctx.fillText(ratingText, 20 / ratingScale, 75);
    ctx.restore();

    const initials = getCustomInitials(ratingText);

    ctx.font = `bolder ${INITIALS_FONT_SIZE}px Antonio`;
    ctx.textAlign = 'center';

    ctx.save();
    ctx.rotate(-(15 * Math.PI) / 180);
    ctx.fillText(initials, 75, 355);
    ctx.restore();
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(280, 20, 600, 390);

  const multilineText = new MultilineText(ctx, {
    fontFace: 'Arial',
    fontSize: DESCRIPTION_FONT_SIZE,
    align: 'left',
    vAlign: 'middle',
    lineHeight: 1.25,
  });

  const descriptionText = [text1, text2, text3, text4, text5]
    .filter((str) => !!str)
    .join('\n');

  multilineText.drawText(descriptionText, {
    x: 300,
    y: 40,
    width: 560,
    height: 350,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
