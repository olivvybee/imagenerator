import { SettingValues } from '../../types/SettingTypes';
import { IsThisAPigeonSettings } from './types';

export const buildAltText = (
  settings: SettingValues<IsThisAPigeonSettings>
) => {
  const { butterfly, person, bottomText } = settings;

  const personLabel = person
    ? `A man in glasses with a label above his head saying "${person}"`
    : 'A man in glasses';
  const personDesc = `${personLabel} is making an excited expression and gesturing towards`;

  const butterflyDesc = butterfly
    ? `a yellow butterfly labelled "${butterfly}"`
    : 'a yellow butterfly';

  const bottomTextDesc = bottomText
    ? `There's text at the bottom of the image that says "${bottomText}".`
    : '';

  return `The "is this a pigeon" meme made from a screenshot of an anime. ${personDesc} ${butterflyDesc}. ${bottomTextDesc}`;
};
