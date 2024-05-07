import { GeneratorFunction } from '../../types/GeneratorTypes';
import { MultilineText } from '../../utils/MultilineText';
import { loadImage } from '../../utils/loadImage';
import { setupCanvas } from '../../utils/setupCanvas';

import { buildAltText } from './buildAltText';
import { FONT_SIZE } from './constants';
import { QuestioningGooseSettings } from './types';

export const generate: GeneratorFunction<QuestioningGooseSettings> = async (
  canvas,
  settings
) => {
  const { offscreenText, topPanelText, bottomPanelText } = settings;

  const image = await loadImage('/assets/questioning-goose.jpg');
  const ctx = await setupCanvas(canvas, { backgroundImage: image });

  if (!ctx) {
    return {
      success: false,
    };
  }

  const multilineText = new MultilineText(ctx, {
    fontSize: FONT_SIZE,
  });

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 2;

  if (offscreenText) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(30, 90);
    ctx.arcTo(60, 110, 110, 115, 180);
    ctx.stroke();

    multilineText.drawText(offscreenText, {
      x: 120,
      y: 65,
      width: canvas.width - 150,
      height: 100,
      align: 'left',
    });
  }

  if (topPanelText) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(520, 255);
    ctx.arcTo(490, 240, 410, 280, 80);
    ctx.stroke();

    multilineText.drawText(topPanelText, {
      x: 25,
      y: 270,
      width: 430,
      height: 200,
      vAlign: 'top',
      align: 'right',
    });
  }

  if (bottomPanelText) {
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(560, 900);
    ctx.arcTo(550, 860, 580, 800, 140);
    ctx.stroke();

    multilineText.drawText(bottomPanelText.toUpperCase(), {
      x: 370,
      y: 600,
      width: 430,
      height: 200,
      vAlign: 'bottom',
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
