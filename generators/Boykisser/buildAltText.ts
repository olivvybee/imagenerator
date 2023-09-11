import { SettingValues } from '../../types/SettingTypes';
import { BoykisserSettings } from './types';

export const buildAltText = (settings: SettingValues<BoykisserSettings>) => {
  const { text, image } = settings;

  const imageDescription = image.src
    ? `${image.description} with a smug face on top that's blushing`
    : 'A line drawing of a cat making a smug face and blushing';

  const textDescription = text
    ? ` There's text above that says "${text}".`
    : '';

  return `${imageDescription}.${textDescription}`;
};
