import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { DEFAULT_BACKGROUND } from './constants';
import { generate } from './generate';
import { TopBottomTextSettings } from './types';

export const topBottomTextGenerator: Generator<TopBottomTextSettings> = {
  name: 'Top/bottom text',
  description: 'The classic meme generator.',
  helpText:
    'Choose an image, then enter some top and bottom text. Both are optional.',
  generate,
  settings: {
    image: {
      name: 'Image',
      type: SettingType.Image,
      params: {},
    },
    topText: {
      name: 'Top text',
      type: SettingType.Text,
      params: {},
    },
    bottomText: {
      name: 'Bottom text',
      type: SettingType.Text,
      params: {},
    },
    backgroundColour: {
      name: 'Background colour',
      type: SettingType.Colour,
      defaultValue: DEFAULT_BACKGROUND,
      params: {
        allowCustom: true,
      },
    },
  },
};
