// @ts-nocheck
import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { XXXSettings } from './types';

export const xxxGenerator: Generator<XXXSettings> = {
  name: '[[name]]',
  description: '',
  helpText: '',
  generate,
  settings: {
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {},
    },
    image: {
      name: 'Image',
      type: SettingType.Image,
      params: {},
    },
  },
};
