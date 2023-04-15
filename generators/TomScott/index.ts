import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';

import { generate } from './generate';
import { TomScottCache, TomScottSettings } from './types';

export const tomScottGenerator: Generator<TomScottSettings, TomScottCache> = {
  name: 'Tom Scott thumbnail',
  description: 'Amazing memes you might not generate',
  helpText: 'Choose an image, enter some text, and choose where to place it.',
  generate,
  settings: {
    image: {
      type: SettingType.Image,
      name: 'Image',
      params: {
        allowCrop: true,
      },
    },
    text: {
      type: SettingType.Text,
      name: 'Text',
      params: {},
    },
    horizontalPosition: {
      type: SettingType.Dropdown,
      name: 'Horizontal position',
      params: {
        options: ['left', 'right'],
      },
      defaultValue: 'left',
    },
    verticalPosition: {
      type: SettingType.Slider,
      name: 'Vertical position',
      params: {
        min: 0,
        max: 100,
        step: 1,
        presets: [
          { name: 'top', value: 0 },
          { name: 'middle', value: 50 },
          { name: 'bottom', value: 100 },
        ],
      },
      defaultValue: 50,
    },
  },
};
