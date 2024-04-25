import { SettingValues } from '../../types/SettingTypes';
import { NothingNewThereSettings } from './types';

export const buildAltText = (
  settings: SettingValues<NothingNewThereSettings>
) => {
  const { text } = settings;

  const textDesc = text
    ? `the newsreader is saying "${text}"`
    : `the newsreader has an empty speech bubble`;

  return (
    'A 4-panel comic where a dog is watching TV. ' +
    'In the first panel, a blob on the TV is saying "I am the news" and the dog is saying "oh". ' +
    'In the second panel, the newsreader is saying "breaking:" and the dog is saying "what". ' +
    `The third panel is a closeup on the TV and ${textDesc}. ` +
    'In the final panel, the dog has turned off the TV and is saying "nothing new there mate" while looking pleased.'
  );
};
