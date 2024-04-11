import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { NoTakeOnlyThrowSettings } from './types';

export const noTakeOnlyThrowGenerator: Generator<NoTakeOnlyThrowSettings> = {
  name: 'No take, only throw',
  description: 'No effort, only meme',
  helpText: 'Enter text for each of the three panels.',
  generate,
  settings: {
    panel1: {
      name: 'Panel 1',
      type: SettingType.Text,
      params: {},
    },
    panel2: {
      name: 'Panel 2',
      type: SettingType.Text,
      params: {},
    },
    panel3: {
      name: 'Panel 3',
      type: SettingType.Text,
      params: {},
    },
  },
};
