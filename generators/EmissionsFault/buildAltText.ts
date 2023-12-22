import { SettingValues } from '../../types/SettingTypes';
import { EmissionsFaultSettings } from './types';

export const buildAltText = (
  settings: SettingValues<EmissionsFaultSettings>
) => {
  const { text = '' } = settings;

  const textDescription = text.length
    ? `a warning message that says "${text.replaceAll('\n', ' ').trim()}"`
    : 'a warning message with no text shown';

  return `The dashboard of a vehicle with a screen that has ${textDescription}. The vehicle is driving along a road at night, and out of the windscreen are the lights of other vehicles in the distance.`;
};
