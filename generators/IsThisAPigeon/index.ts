import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { IsThisAPigeonSettings } from './types';

export const isThisAPigeonGenerator: Generator<IsThisAPigeonSettings> = {
  name: 'Is this a pigeon?',
  description: 'Generate a meme to show what an easy mistake it is to make.',
  helpText:
    'Enter some text to show on the person, on the butterfly, and at the bottom.',
  generate,
  settings: {
    butterfly: {
      name: 'Butterfly',
      type: SettingType.Text,
      params: {},
    },
    person: {
      name: 'Person',
      type: SettingType.Text,
      params: {},
    },
    bottomText: {
      name: 'Bottom text',
      type: SettingType.Text,
      params: {},
    },
  },
};
