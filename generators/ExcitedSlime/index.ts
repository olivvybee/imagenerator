import { Generator } from '../../types/GeneratorTypes';
import { SettingType, SettingValues } from '../../types/SettingTypes';

import { generate } from './generate';
import { ExcitedSlimeSettings } from './types';

export const excitedSlimeGenerator: Generator<ExcitedSlimeSettings> = {
  generate,
  name: 'Excited slime',
  description:
    "The dragon quest slime is getting progressively more excited about the memes you're making.",
  helpText: 'Enter text for each panel to create an image.',
  settings: {
    firstPanel: {
      type: SettingType.Text,
      name: 'First panel',
      params: {},
    },
    secondPanel: {
      type: SettingType.Text,
      name: 'Second panel',
      params: {},
    },
    thirdPanel: {
      type: SettingType.Text,
      name: 'Third panel',
      params: {},
    },
    includeSadPanel: {
      type: SettingType.Dropdown,
      name: 'Add sad slime',
      params: {
        options: ['No', 'Yes'],
      },
      defaultValue: 'No',
    },
    fourthPanel: {
      type: SettingType.Text,
      name: 'Fourth panel',
      params: {},
      when: (settings: SettingValues<ExcitedSlimeSettings>) =>
        settings.includeSadPanel === 'Yes',
    },
  },
};
