import { SettingValues } from '../../types/SettingTypes';
import { TopBottomTextSettings } from './types';

export const buildAltText = (
  settings: SettingValues<TopBottomTextSettings>
) => {
  const { topText, bottomText, image } = settings;

  const imageDesc = image.altText || '{{userImage}}';

  if (!topText && !bottomText) {
    return imageDesc;
  }

  if (topText && !bottomText) {
    return `A meme with the text "${topText}" above ${imageDesc}.`;
  }

  if (!topText && bottomText) {
    return `A meme with ${imageDesc} and text below it that says "${bottomText}".`;
  }

  return `A meme with text above and below an image. The text at the top says "${topText}". The image is ${imageDesc}. The text below the image says "${bottomText}".`;
};
