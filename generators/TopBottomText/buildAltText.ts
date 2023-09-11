import { SettingValues } from '../../types/SettingTypes';
import { TopBottomTextSettings } from './types';

export const buildAltText = (
  settings: SettingValues<TopBottomTextSettings>
) => {
  const { topText, bottomText, image } = settings;

  if (!topText && !bottomText) {
    return image.description;
  }

  if (topText && !bottomText) {
    return `A meme with the text "${topText}" above ${image.description}.`;
  }

  if (!topText && bottomText) {
    return `A meme with ${image.description} and text below it that says "${bottomText}".`;
  }

  return `A meme with text above and below an image. The text at the top says "${topText}". The image is ${image.description}. The text below the image says "${bottomText}".`;
};
