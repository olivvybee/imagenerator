import { SettingValues } from '../../types/SettingTypes';
import { NotKiddingSettings } from './types';

export const buildAltText = (settings: SettingValues<NotKiddingSettings>) => {
  const { text } = settings;

  const textDescription = text
    ? `"I want ${text} and I'm not kidding"`
    : '"and I\'m not kidding"';

  return `A cartoon of sonic the hedgehog laying on his back with his legs crossed, saying ${textDescription}.`;
};
