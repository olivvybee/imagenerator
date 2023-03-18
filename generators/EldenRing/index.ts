import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';

import { FORMATS, CONJUNCTIONS } from './constants';
import { generate } from './generate';
import { EldenRingSettings } from './types';

export const eldenRingGenerator: Generator<EldenRingSettings> = {
  generate,
  name: 'Try fingers, but hole',
  helpText:
    'Create a message using one or two lines of text. The second line will appear after choosing a joining phrase.',
  description: 'Create your own Elden Ring messages.',
  settings: {
    firstLineFormat: {
      name: 'First line format',
      type: SettingType.Dropdown,
      params: {
        options: FORMATS,
      },
    },
    firstLineText: {
      name: 'First line text',
      type: SettingType.Text,
      params: {},
    },
    conjunction: {
      name: 'Joining phrase',
      type: SettingType.Dropdown,
      params: {
        options: CONJUNCTIONS,
      },
    },
    secondLineFormat: {
      name: 'Second line format',
      type: SettingType.Dropdown,
      params: {
        options: FORMATS,
      },
      when: (settings) => settings.conjunction !== '(none)',
    },
    secondLineText: {
      name: 'Second line text',
      type: SettingType.Text,
      params: {},
      when: (settings) => settings.conjunction !== '(none)',
    },
  },
};
