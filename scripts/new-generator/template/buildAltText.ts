// @ts-nocheck
import { SettingValues } from '../../types/SettingTypes';
import { XXXSettings } from './types';

export const buildAltText = (settings: SettingValues<XXXSettings>) => {
  const { text, image } = settings;

  return `An image of ${image.description} with text that says ${text}.`;
};
