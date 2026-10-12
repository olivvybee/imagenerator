import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { HeLooksVeryPoliteSettings } from './types';

export const heLooksVeryPoliteGenerator: Generator<HeLooksVeryPoliteSettings> =
  {
    name: 'He looks very polite',
    description: 'The landlord will definitely make an exception for him.',
    helpText:
      'Choose an image to send to the landlord. It might need to be cropped to fit.',
    generate,
    settings: {
      image: {
        name: 'Image',
        type: SettingType.Image,
        params: {
          allowCrop: true,
        },
      },
    },
  };
