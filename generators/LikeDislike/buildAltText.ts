import { SettingValues } from '../../types/SettingTypes';
import { CHARACTERS } from './constants';
import { LikeDislikeSettings } from './types';

export const buildAltText = (settings: SettingValues<LikeDislikeSettings>) => {
  const { character, topText, bottomText } = settings;

  const pronoun = CHARACTERS[character].pronoun;

  const topTextDesc = topText ? `text that says "${topText}"` : 'a blank panel';
  const bottomTextDesc = bottomText
    ? `text that says "${bottomText}"`
    : 'a blank panel';

  return (
    `A four-panel meme arranged into two rows, featuring ${character}. ` +
    `In the top row, ${pronoun} is turned away and is holding up a hand in distaste at ${topTextDesc}. ` +
    `In the bottom row, ${pronoun} is looking happy and pointing with acceptance at ${bottomTextDesc}.`
  );
};
