import { GeneratorFunction } from '../../types/GeneratorTypes';
import { loadFont } from '../../utils/loadFont';
import multilineText from '../../utils/multilineText';

import { buildAltText } from './buildAltText';
import { LARGE_FONT_SIZE, SMALL_FONT_SIZE } from './constants';
import { NowThatsWhatICallSettings } from './types';

export const generate: GeneratorFunction<NowThatsWhatICallSettings> = async (
  canvas,
  settings
) => {
  const {
    text1 = '',
    text2 = '',
    text3 = '',
    fillColour,
    strokeColour,
  } = settings;

  canvas.width = 800;
  canvas.height = 800;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  await loadFont('Arial Black');

  const text = [text1, text2, text3].map((s) => s.toUpperCase());

  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, 800, 800);

  multilineText.fontSize = 190;
  multilineText.font = 'Arial Black';
  multilineText.align = 'center';
  multilineText.vAlign = 'middle';
  multilineText.background = false;

  ctx.fillStyle = fillColour.hex;
  ctx.strokeStyle = strokeColour.hex;
  ctx.lineWidth = 15;

  ctx.font = `${LARGE_FONT_SIZE}px Arial Black`;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'bottom';
  ctx.strokeText('NOW', 390, 320);
  ctx.fillText('NOW', 390, 320);

  ctx.strokeRect(25, 260, 750, 120);
  ctx.fillRect(25, 260, 750, 120);

  ctx.fillStyle = strokeColour.hex;
  ctx.font = `${SMALL_FONT_SIZE}px Arial Bold`;
  ctx.textBaseline = 'middle';
  ctx.fillText("THAT'S WHAT I CALL", 400, 320);

  const fontSizes = text.map((s) => {
    if (s) {
      let fontSize = LARGE_FONT_SIZE;
      let width = 999;
      while (width > 760) {
        fontSize -= 1;
        ctx.font = `${fontSize}px Arial Black`;
        width = ctx.measureText(s).width;
      }
      return fontSize;
    } else {
      return LARGE_FONT_SIZE;
    }
  });

  ctx.textBaseline = 'middle';
  ctx.fillStyle = fillColour.hex;
  ctx.strokeStyle = strokeColour.hex;

  let y = 400;
  text.forEach((s, index) => {
    const fontSize = fontSizes[index];
    const previousFontSize = index > 0 ? fontSizes[index - 1] : 0;

    y += previousFontSize / 2 + fontSize / 2;

    ctx.font = `${fontSize}px Arial Black`;
    ctx.lineWidth = 15 * (fontSize / LARGE_FONT_SIZE);

    ctx.strokeText(s, 400, y);
    ctx.fillText(s, 400, y);
  });

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
