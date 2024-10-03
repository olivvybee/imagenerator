import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { LooksInsideSettings } from './types';

export const looksInsideGenerator: Generator<LooksInsideSettings> = {
  name: 'Looks inside',
  description: 'meme generator; looks inside; no memes',
  helpText:
    'Enter text for each of the lines. The > signs will be added automatically.',
  generate,
  settings: {
    line1: {
      name: 'Top line',
      type: SettingType.Text,
      params: {},
    },
    line2: {
      name: 'Middle line',
      type: SettingType.Text,
      params: {},
      defaultValue: 'look inside',
    },
    line3: {
      name: 'Bottom line',
      type: SettingType.Text,
      params: {},
    },
  },
};
