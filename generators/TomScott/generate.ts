import { GeneratorFunction } from '../../types/GeneratorTypes';
import { applyCrop } from '../../utils/applyCrop';
import { loadImage } from '../../utils/loadImage';
import { calculateImageSize } from '../../utils/resizeImage';
import multilineText from '../../utils/multilineText';

import {
  ARROW_PADDING,
  ARROW_SIZE,
  BACKGROUND_COLOUR,
  FONT_SIZE,
  OUTPUT_SIZE,
  TEXT_PADDING,
} from './constants';
import { TomScottSettings } from './types';
import { buildAltText } from './buildAltText';

export const generate: GeneratorFunction<TomScottSettings> = async (
  canvas,
  settings
) => {
  const {
    text = '',
    image,
    verticalPosition,
    horizontalPosition,
    arrowHorizontalPosition,
  } = settings;

  if (!image.src || !image.crop) {
    return {
      success: false,
    };
  }

  const croppedImageSrc = await applyCrop(image.src, image.crop);

  if (!croppedImageSrc) {
    return {
      success: false,
    };
  }

  const croppedImage = await loadImage(croppedImageSrc);

  const { width, height } = calculateImageSize(croppedImage, OUTPUT_SIZE);

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.clearRect(0, 0, width, height);
  ctx.drawImage(croppedImage, 0, 0, width, height);

  const lowercaseText = text.toLowerCase();

  // const arrowX =
  //   horizontalPosition === 'left'
  //     ? width / 2 - ARROW_SIZE - 2 * ARROW_PADDING
  //     : width / 2;

  const textX =
    horizontalPosition === 'left' ? TEXT_PADDING : width / 2 + TEXT_PADDING;

  const textY = (verticalPosition / 100) * height;

  const textMaxWidth = width / 2 - 2 * TEXT_PADDING;

  multilineText.align = 'left';
  multilineText.vAlign = 'top';
  multilineText.fontSize = FONT_SIZE;
  multilineText.font = 'Arial Black';
  multilineText.background = false;

  const { height: textHeight } = multilineText.drawText(
    ctx,
    lowercaseText,
    textX,
    textY,
    textMaxWidth,
    height
  );

  ctx.fillStyle = BACKGROUND_COLOUR;
  ctx.fillRect(
    textX - TEXT_PADDING,
    textY,
    width / 2,
    textHeight + 2 * TEXT_PADDING
  );

  const arrowWidth = ARROW_SIZE + ARROW_PADDING * 2;

  const useBottomArrow = verticalPosition < 50;

  const arrowX =
    (horizontalPosition === 'left' ? width / 2 : width) -
    arrowWidth -
    ((100 - arrowHorizontalPosition) / 100) * (width / 2 - arrowWidth);

  const arrowY = useBottomArrow
    ? textY + textHeight + 2 * TEXT_PADDING
    : textY - ARROW_SIZE - 2 * ARROW_PADDING;

  ctx.fillStyle = BACKGROUND_COLOUR;
  ctx.fillRect(arrowX, arrowY, arrowWidth, arrowWidth);

  const arrowDirectionX = horizontalPosition === 'left' ? 'right' : 'left';
  const arrowDirectionY = useBottomArrow ? 'down' : 'up';

  const arrowImage = await loadImage(
    `/assets/tom-scott-arrow-${arrowDirectionY}-${arrowDirectionX}.jpg`
  );

  ctx.drawImage(arrowImage, arrowX + ARROW_PADDING, arrowY + ARROW_PADDING);

  ctx.restore();

  ctx.fillStyle = 'black';
  multilineText.drawText(
    ctx,
    lowercaseText,
    textX,
    textY + 3,
    textMaxWidth,
    height
  );

  ctx.fillStyle = 'white';
  multilineText.drawText(
    ctx,
    lowercaseText,
    textX,
    textY,
    textMaxWidth,
    height
  );

  const suggestedAltText = buildAltText(settings);

  return {
    success: true,
    suggestedAltText,
  };
};
