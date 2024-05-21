import { SettingValues } from '../../types/SettingTypes';
import { ClosedCaptionsSettings } from './types';

export const buildAltText = (
  settings: SettingValues<ClosedCaptionsSettings>
) => {
  const { text, image } = settings;

  const normalisedText = text?.split('\n').join(' ').trim();

  if (!image || !image.src) {
    if (normalisedText) {
      return `Subtitles that say "${normalisedText}".`;
    } else {
      return 'A blank image.';
    }
  }

  if (normalisedText) {
    return `${image.description}, with subtitles that say "${normalisedText}".`;
  } else {
    return image.description;
  }
};
