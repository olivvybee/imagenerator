import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { NothingNewThereSettings } from './types';

export const nothingNewThereGenerator: Generator<NothingNewThereSettings> = {
  name: 'Nothing new there',
  description: "It's not breaking news if we already knew it",
  helpText: 'Enter text for the newsreader to say in the third panel.',
  generate,
  settings: {
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {},
    },
  },
};
