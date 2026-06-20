import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { SisyphusSettings } from './types';

export const sisyphusGenerator: Generator<SisyphusSettings> = {
  name: 'Sisyphus',
  description: 'One must imagine Sisyphus generating memes.',
  helpText:
    'Enter some text for the boulder, and optionally some text to label Sisyphus.',
  generate,
  settings: {
    boulder: {
      name: 'Boulder',
      type: SettingType.Text,
      params: {},
    },
    sisyphus: {
      name: 'Sisyphus',
      type: SettingType.Text,
      params: {},
    },
  },
};
