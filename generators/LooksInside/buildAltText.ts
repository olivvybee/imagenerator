import { SettingValues } from '../../types/SettingTypes';
import { LooksInsideSettings } from './types';

export const buildAltText = (settings: SettingValues<LooksInsideSettings>) => {
  const { line1, line2, line3 } = settings;

  const lines = [line1, line2, line3].filter((line) => !!line).join('; ');
  const textDesc = lines.length
    ? `There's text in the greentext style above that says "${lines}".`
    : "There's meant to be greentext style text above, but it's empty.";

  return `A closeup of a cat peering down at the camera with its nose close to the lens. ${textDesc}`;
};
