import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { AttentionStarvedKittenSettings } from './types';

export const attentionStarvedKittenGenerator: Generator<AttentionStarvedKittenSettings> = {
  name: 'Attention-starved kitten',
  description: 'Two cats. One gets all the attention, and is oblivious to the plight of the other.',
  helpText: 'Enter labels for the top and bottom cats.',
  generate,
  settings: {
    topCatLabel: {
      name: 'Top cat',
      type: SettingType.Text,
      params: {},
    },
    bottomCatLabel: {
      name: 'Bottom cat',
      type: SettingType.Text,
      params: {},
    },
  },
};
