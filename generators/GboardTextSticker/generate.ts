import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { drawImage } from '../../utils/drawImage';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import {
  CANVAS_HEIGHT,
  CANVAS_WIDTH,
  COLOURS,
  Decoration,
  FONT_NAME,
} from './constants';
import { GboardTextStickerSettings } from './types';

export const generate: GeneratorFunction<GboardTextStickerSettings> = async (
  canvas,
  settings
) => {
  const {
    text = '',
    colour,
    fontSize,
    decoration,
    decorationColour,
  } = settings;

  await loadFont(FONT_NAME, '/fonts/DynaPuff.woff2');

  canvas.width = CANVAS_WIDTH;
  canvas.height = CANVAS_HEIGHT;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

  const multilineText = new MultilineText(ctx, {
    fontFace: FONT_NAME,
    fontSize,
    fontWeight: 'bolder',
    colour: colour.hex,
    align: 'center',
    vAlign: decoration === Decoration.Hat ? 'top' : 'middle',
  });

  const hat = await loadImage('/assets/gboard-hat.png');

  const maxHeight =
    CANVAS_HEIGHT - 10 - (decoration === Decoration.Hat ? hat.height - 25 : 0);

  const { width: textWidth, height: textHeight } = multilineText.drawText(
    text.toUpperCase(),
    {
      x: 5,
      y: CANVAS_HEIGHT - maxHeight - 5,
      width: CANVAS_WIDTH - 10,
      height: maxHeight,
    }
  );

  const colourIndex = COLOURS.findIndex(
    (colourOption) => colourOption.hex === colour.hex
  );
  const decorationColourIndex = (colourIndex + 1) % COLOURS.length;
  const defaultDecorationColour = COLOURS[decorationColourIndex];
  const decorationColourHex =
    decorationColour?.hex || defaultDecorationColour.hex;

  if (decoration === Decoration.Underline) {
    const x = (CANVAS_WIDTH - textWidth) / 2;
    const y = CANVAS_HEIGHT / 2 + textHeight / 2;

    ctx.fillStyle = decorationColourHex;
    ctx.beginPath();
    ctx.roundRect(x, y, textWidth, 30, 30);
    ctx.fill();
  }

  if (decoration === Decoration.Hat) {
    await drawImage(ctx, '/assets/gboard-hat.png', {
      x: (CANVAS_WIDTH - hat.width) / 2,
      y: 5,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
