import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { PleadingBoykisserSettings } from './types';

export const pleadingBoykisserGenerator: Generator<PleadingBoykisserSettings> = {
  name: 'Pleading Boykisser',
  description: 'can.. can I make a meme?',
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
