import { SettingValues } from '../../types/SettingTypes';
import { PleadingBoykisserSettings } from './types';

export const buildAltText = (settings: SettingValues<PleadingBoykisserSettings>) => {
  const { text } = settings;

  const imageDescription = `A drawing of a blushing, pleading cat pointing its fingers together in a bottomy fashion`;
  const textDescription = text
    ? `, with text above that says "${text}"`
    : '';

  return `${imageDescription}${textDescription}.`;
};
