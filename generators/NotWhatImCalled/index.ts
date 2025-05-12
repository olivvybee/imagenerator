import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { NotWhatImCalledSettings } from './types';

export const notWhatImCalledGenerator: Generator<NotWhatImCalledSettings> = {
  name: "Not what I'm called",
  description: 'Sometimes a name just sticks.',
  helpText:
    'Choose an image for the right hand side, and enter some text for the incorrect name.',
  generate,
  settings: {
    image: {
      name: 'Image',
      type: SettingType.Image,
      params: {},
    },
    name: {
      name: 'Incorrect name',
      type: SettingType.Text,
      params: {},
    },
  },
};
