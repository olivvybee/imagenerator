import Color from 'color';
import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadImage } from '../../utils/loadImage';

import { buildAltText } from './buildAltText';
import { TradeOfferSettings } from './types';
import { drawTextWithBackground } from '../../utils/drawText';
import { MultilineText } from '../../utils/MultilineText';

export const generate: GeneratorFunction<TradeOfferSettings> = async (
  canvas,
  settings
) => {
  const { iReceive, youReceive, character, characterLabel, backgroundColour } =
    settings;

  canvas.width = 650;
  canvas.height = 900;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.fillStyle = backgroundColour.hex;
  ctx.fillRect(0, 0, 650, 900);

  const imagePath = `/assets/trade-offer-${character.toLowerCase()}.png`;
  const image = await loadImage(imagePath);

  const { width: imageWidth, height: imageHeight } = image;
  ctx.drawImage(image, (650 - imageWidth) / 2, 900 - imageHeight);

  ctx.fillStyle = '#df3b3a';
  ctx.beginPath();
  ctx.roundRect(115, 20, 420, 75, 20);
  ctx.fill();

  ctx.font = '40px "Atkinson Hyperlegible"';
  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.fillText('⚠️ TRADE OFFER ⚠️', 325, 70);

  const background = new Color(backgroundColour.hex);
  ctx.fillStyle = background.isLight() ? 'black' : 'white';

  ctx.font = '40px "Atkinson Hyperlegible"';
  ctx.fillText('I receive:', 155, 150);
  ctx.fillText('You receive:', 495, 150);

  const multilineText = new MultilineText(ctx, { fontSize: 32, vAlign: 'top' });

  if (iReceive) {
    multilineText.drawText(iReceive, {
      x: 5,
      y: 180,
      width: 300,
      height: 270,
    });
  }
  if (youReceive) {
    multilineText.drawText(youReceive, {
      x: 345,
      y: 180,
      width: 300,
      height: 270,
    });
  }

  ctx.font = '40px "Atkinson Hyperlegible"';
  if (characterLabel) {
    let y = 0;
    switch (character) {
      case 'Amity':
        y = 510;
        break;

      case 'Makima':
        y = 475;
        break;

      case 'Ash':
        y = 485;
        break;
    }

    drawTextWithBackground(ctx, characterLabel, {
      y,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
