import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { WhatAWeekSettings } from './types';

export const whatAWeekGenerator: Generator<WhatAWeekSettings> = {
  name: 'What a week, huh?',
  description: "Captain, it's only a generator",
  helpText:
    "Enter text for Captain Haddock and Tintin's speech bubbles. Optionally the comic book font can be changed to make it more readable.",
  generate,
  settings: {
    captainHaddock: {
      name: 'Captain Haddock',
      type: SettingType.Text,
      params: {},
    },
    tintin: {
      name: 'Tintin',
      type: SettingType.Text,
      params: {},
    },
    font: {
      name: 'Font',
      type: SettingType.Dropdown,
      params: {
        options: ['Comic', 'Regular'],
      },
      defaultValue: 'Comic',
    },
  },
};
