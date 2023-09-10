import { SettingValues } from '../../types/SettingTypes';
import { NounVerbedSettings } from './types';

export const buildAltText = (settings: SettingValues<NounVerbedSettings>) => {
  const { image, text, colour } = settings;

  const imageDesc = image.altText || '{{userImage}}';

  const colourName = colour.name.toLowerCase();
  const textDesc = text
    ? `with the text "${text.toUpperCase()}" on top in a ${colourName} font, to look like a Dark Souls "YOU DIED" screenshot.`
    : 'with an empty translucent banner across it.';

  return `${imageDesc} ${textDesc}`;
};
