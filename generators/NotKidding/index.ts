import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { FONT_OPTIONS } from './constants';
import { generate } from './generate';
import { NotKiddingSettings } from './types';

export const notKiddingGenerator: Generator<NotKiddingSettings> = {
  name: "Sonic's not kidding",
  description: "I want to generate memes and I'm not kidding.",
  helpText: 'Enter some text to show at the top.',
  generate,
  settings: {
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {},
    },
    fontSize: {
      name: 'Font size',
      type: SettingType.Slider,
      params: {
        min: 24,
        max: 76,
        step: 1,
      },
      defaultValue: 48,
    },
    font: {
      name: 'Font',
      type: SettingType.Dropdown,
      params: {
        options: FONT_OPTIONS,
      },
    },
  },
};
