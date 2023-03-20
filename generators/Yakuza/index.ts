import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { YakuzaSettings } from './types';

export const yakuzaGenerator: Generator<YakuzaSettings> = {
  name: 'Yakuza character intro',
  description: 'Introduce the newest members of the Yakuza.',
  helpText: 'Enter a name and a title to be displayed on top of the image.',
  generate,
  settings: {
    image: {
      name: 'Image',
      type: SettingType.Image,
      params: {},
    },
    name: {
      name: 'Name',
      type: SettingType.Text,
      params: {},
    },
    title: {
      name: 'Title',
      type: SettingType.Text,
      params: {},
    },
  },
};
