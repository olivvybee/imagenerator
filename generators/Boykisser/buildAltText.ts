import { SettingValues } from '../../types/SettingTypes';
import { BoykisserSettings } from './types';

export const buildAltText = (settings: SettingValues<BoykisserSettings>) => {
  const { text } = settings;

  const textDescription = text
    ? ` There's text above that says "${text}".`
    : '';

  return `A line drawing of a cat making a smug face and blushing.${textDescription}`;
};
