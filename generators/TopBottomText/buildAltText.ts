import { SettingValues } from '../../types/SettingTypes';
import { TopBottomTextSettings } from './types';

export const buildAltText = (
  settings: SettingValues<TopBottomTextSettings>
) => {
  const { topText, bottomText } = settings;

  if (!topText && !bottomText) {
    return '{{userImage}}';
  }

  if (topText && !bottomText) {
    return `A meme with the text "${topText}" above an image of {{userImage}}.`;
  }

  if (!topText && bottomText) {
    return `A meme with an image of {{userImage}} and text below it that says "${bottomText}".`;
  }

  return `A meme with text above and below an image. The text at the top says "${topText}". The image is {{userImage}}. The text below the image says "${bottomText}".`;
};
