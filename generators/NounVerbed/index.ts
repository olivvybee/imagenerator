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
    'Choose an image and then enter some text to add on top. ' +
    'Use the position slider to move the text up or down if it covers the image too much.',
  settings: {
    image: {
      name: 'Image',
      type: SettingType.Image,
      params: {},
    },
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
