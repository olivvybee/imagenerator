import { SettingValues } from '../../types/SettingTypes';
import { TomScottSettings } from './types';

export const buildAltText = (settings: SettingValues<TomScottSettings>) => {
  const { image, text } = settings;

  const textDesc = text
    ? `with text on top with a red background that says "${text.toLowerCase()}"`
    : 'with an empty red rectangle on top';

  return `${image.description} ${textDesc} and a small arrow. It's designed to look like a thumbnail for a Tom Scott video.`;
};
