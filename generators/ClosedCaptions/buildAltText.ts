import { SettingValues } from '../../types/SettingTypes';
import { ClosedCaptionsSettings } from './types';

export const buildAltText = (
  settings: SettingValues<ClosedCaptionsSettings>
) => {
  const { text, image } = settings;

  if (!image || !image.src) {
    if (text) {
      return `Subtitles that say "${text}".`;
    } else {
      return 'A blank image.';
    }
  }

  if (text) {
    return `${image.description}, with subtitles that say "${text}".`;
  } else {
    return image.description;
  }
};
