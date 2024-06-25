import { SettingValues } from '../../types/SettingTypes';
import { AngryGorillaBillboardSettings } from './types';

export const buildAltText = (
  settings: SettingValues<AngryGorillaBillboardSettings>
) => {
  const { text } = settings;

  const textDesc = text
    ? `a drive-in movie screen with text overlaid that says "${text}"`
    : 'a blank drive-in movie screen';

  return `A giant sculpture of an angry gorilla raising its fists and shouting, standing over ${textDesc}.`;
};
