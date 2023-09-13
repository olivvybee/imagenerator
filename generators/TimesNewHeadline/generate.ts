import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadFont } from '../../utils/loadFont';

import { buildAltText } from './buildAltText';
import {
  BYLINE_FONT_SIZE,
  CATEGORY_FONT_SIZE,
  HEADLINE_FONT_SIZE,
} from './constants';
import { TimesNewHeadlineSettings } from './types';

export const generate: GeneratorFunction<TimesNewHeadlineSettings> = async (
  canvas,
  settings
) => {
  const { headline = '', byline = '', category = '' } = settings;

  await loadFont('NYT', '/fonts/nyt.woff2');

  canvas.width = 800;
  canvas.height = 800;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 900);

  if (category) {
    ctx.fillStyle = '#757575';
    ctx.font = `${CATEGORY_FONT_SIZE}px NYT`;
    ctx.fillText(category, 100, 100);
  }

  ctx.fillStyle = 'black';

  const multilineText = new MultilineText(ctx, {
    fontFace: 'NYT',
    fontSize: HEADLINE_FONT_SIZE,
    fontWeight: 'bold',
    align: 'left',
    vAlign: 'top',
  });

  const { height: headlineHeight } = multilineText.drawText(headline, {
    x: 100,
    y: 125,
    width: 600,
    height: 600,
  });

  if (byline) {
    const offset = headline ? headlineHeight : 0;

    ctx.fillStyle = '#333333';
    ctx.font = `${BYLINE_FONT_SIZE}px NYT`;
    ctx.fillText(byline, 100, 125 + offset + 85);
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
