import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';

import { COLOURS } from './constants';
import { generate } from './generate';
import { NounVerbedSettings } from './types';

export const nounVerbedGenerator: Generator<NounVerbedSettings> = {
  generate,
  name: 'Noun verbed',
  description: 'MEME GENERATED',
  helpText:
    'Enter some text to display in the banner, and optionally add a background image. ' +
    'Use the position slider to move the text up or down if it covers the image too much.',
  settings: {
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {},
    },
    colour: {
      name: 'Text colour',
      type: SettingType.Colour,
      params: {
        presets: COLOURS,
      },
      defaultValue: COLOURS[0],
    },
    image: {
      name: 'Background image',
      type: SettingType.Image,
      params: {},
    },
    textPosition: {
      name: 'Text position',
      type: SettingType.Slider,
      params: {
        min: 0,
        max: 100,
        presets: [{ name: 'Centre', value: 50 }],
      },
      defaultValue: 50,
    },
  },
};
