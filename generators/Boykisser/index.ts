import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { BoykisserSettings } from './types';

export const boykisserGenerator: Generator<BoykisserSettings> = {
  name: 'Boykisser',
  description: "You like making memes, don't you?",
  helpText: 'Enter some text to show at the top.',
  generate,
  settings: {
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {},
    },
  },
};
