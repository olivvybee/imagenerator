import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { drawImage } from '../../utils/drawImage';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  CHARACTERS,
  DIVIDER_WIDTH,
  FONT_SIZE,
  TEXT_MARGIN,
} from './constants';
import { LikeDislikeSettings } from './types';

export const generate: GeneratorFunction<LikeDislikeSettings> = async (
  canvas,
  settings,
) => {
  const { character, topText, bottomText } = settings;

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const characterKey = CHARACTERS[character].key;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  if (!characterKey) {
    throw new Error(`Unknown character "${character}"`);
  }

  const imagePath = `/assets/like-dislike/${characterKey}`;

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  await drawImage(ctx, `${imagePath}/dislike.jpg`);
  await drawImage(ctx, `${imagePath}/like.jpg`, { y: 500 });

  ctx.fillStyle = 'black';
  ctx.fillRect(
    0,
    CANVAS_HEIGHT / 2 - DIVIDER_WIDTH / 2,
    CANVAS_WIDTH,
    DIVIDER_WIDTH,
  );
  ctx.fillRect(
    CANVAS_WIDTH / 2 - DIVIDER_WIDTH / 2,
    0,
    DIVIDER_WIDTH,
    CANVAS_HEIGHT,
  );

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
  });
  multilineText.drawText(topText, {
    x: CANVAS_WIDTH / 2 + DIVIDER_WIDTH / 2 + TEXT_MARGIN,
    y: TEXT_MARGIN,
    width: CANVAS_WIDTH / 2 - DIVIDER_WIDTH / 2 - TEXT_MARGIN * 2,
    height: CANVAS_HEIGHT / 2 - DIVIDER_WIDTH / 2 - TEXT_MARGIN * 2,
  });
  multilineText.drawText(bottomText, {
    x: CANVAS_WIDTH / 2 + DIVIDER_WIDTH / 2 + TEXT_MARGIN,
    y: CANVAS_HEIGHT / 2 + DIVIDER_WIDTH / 2 + TEXT_MARGIN,
    width: CANVAS_WIDTH / 2 - DIVIDER_WIDTH / 2 - TEXT_MARGIN * 2,
    height: CANVAS_HEIGHT / 2 - DIVIDER_WIDTH / 2 - TEXT_MARGIN * 2,
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
