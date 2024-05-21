import { SettingValues } from '../../types/SettingTypes';
import { ClosedCaptionsSettings } from './types';

export const buildAltText = (
  settings: SettingValues<ClosedCaptionsSettings>
) => {
  const { text, image } = settings;

  if (!image || !image.src) {
    return `Subtitles that say "${text}".`;
  }

  return `${image.description}, with subtitles that say "${text}".`;
};
