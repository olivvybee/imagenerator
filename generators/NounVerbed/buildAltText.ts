import { SettingValues } from '../../types/SettingTypes';
import { NounVerbedSettings } from './types';

export const buildAltText = (settings: SettingValues<NounVerbedSettings>) => {
  const { image, text, colour } = settings;

  const colourName = colour.name.toLowerCase();

  if (image?.src) {
    const textDesc = text
      ? `with the text "${text.toUpperCase()}" on top in a ${colourName} font, to look like a Dark Souls "YOU DIED" screenshot.`
      : 'with an empty translucent banner across it.';

    return `${image.description} ${textDesc}`;
  }

  return text
    ? `A banner with "${text.toUpperCase()}" in a ${colourName} font, to look like a Dark Souls "YOU DIED" banner.`
    : 'An empty Dark Souls "YOU DIED" banner.';
};
