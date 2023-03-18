import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';

import { generate } from './generate';
import { TuxedoMaskSettings } from './types';

export const tuxedoMaskGenerator: Generator<TuxedoMaskSettings> = {
  generate,
  name: 'Tuxedo Mask',
  description:
    "Make memes about all the things Tuxedo Mask hasn't done recently.",
  helpText:
    'Enter labels for the rose, Tuxedo Mask, and Sailor Moon to create an image.',
  settings: {
    rose: {
      type: SettingType.Text,
      name: 'Rose',
      params: {},
    },
    tuxedoMask: {
      type: SettingType.Text,
      name: 'Tuxedo Mask',
      params: {},
    },
    sailorMoon: {
      type: SettingType.Text,
      name: 'Sailor Moon',
      params: {},
    },
  },
};
