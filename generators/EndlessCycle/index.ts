import { Generator } from '../../types/GeneratorTypes';
import {
  SettingType,
  SettingValues,
  SettingCondition,
} from '../../types/SettingTypes';
import { generate } from './generate';
import { EndlessCycleSettings } from './types';

type T = SettingValues<EndlessCycleSettings>['numberOfSteps'];

export const endlessCycleGenerator: Generator<EndlessCycleSettings> = {
  name: 'Endless cycle',
  description: 'You think of a meme ➡️ You generate a meme ↩️',
  helpText:
    'Choose the number of steps in the cycle and add text for each step.',
  generate,
  settings: {
    numberOfSteps: {
      name: 'Number of steps',
      type: SettingType.Stepper,
      params: {
        allowWrapping: false,
        options: [2, 3, 4],
      },
      defaultValue: 2,
    },
    step1: {
      name: 'Step 1',
      type: SettingType.Text,
      params: {},
    },
    step2: {
      name: 'Step 2',
      type: SettingType.Text,
      params: {},
    },
    step3: {
      name: 'Step 3',
      type: SettingType.Text,
      params: {},
      when: (settings) => (settings.numberOfSteps as number) >= 3,
    },
    step4: {
      name: 'Step 4',
      type: SettingType.Text,
      params: {},
      when: (settings) => (settings.numberOfSteps as number) >= 4,
    },
  },
};
