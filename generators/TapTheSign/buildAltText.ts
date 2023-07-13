import { SettingValues } from '../../types/SettingTypes';
import { TapTheSignSettings } from './types';

export const buildAltText = (settings: SettingValues<TapTheSignSettings>) => {
  const { text } = settings;

  const signDescription = text ? `says "${text}"` : `is blank`;

  return (
    'A meme made from two screenshots from an episode of The Simpsons. The top image is a view of a bus driver from behind and the driver is saying "Don\'t make me tap the sign".' +
    `The bottom image shows the driver's finger pointing at a sign that ${signDescription}.`
  );
};
