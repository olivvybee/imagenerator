import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';

import { generate } from './generate';
import { TheyLiveSettings } from './types';

export const theyLiveGenerator: Generator<TheyLiveSettings> = {
  generate,
  name: 'They Live',
  description: 'Reveal the truth using the glasses from They Live.',
  helpText:
    'Choose two images to use. The bottom image will automatically be made black and white.',
  settings: {
    topImage: {
      name: 'Top image',
      type: SettingType.Image,
      params: { allowCrop: true, cropAspectRatio: 1 },
    },
    bottomImage: {
      name: 'Bottom image',
      type: SettingType.Image,
      params: { allowCrop: true, cropAspectRatio: 1 },
    },
  },
};
