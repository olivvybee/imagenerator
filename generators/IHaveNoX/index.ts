import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';

import { generate } from './generate';
import { IHaveNoXSettings } from './types';

export const iHaveNoXGenerator: Generator<IHaveNoXSettings> = {
  generate,
  name: 'I have no X and I must Y',
  description:
    'Create the lesser known sequels to I Have No Mouth and I Must Scream.',
  helpText: 'Enter two words or phrases to create an image.',
  settings: {
    x: {
      name: 'X',
      type: SettingType.Text,
      params: {},
    },
    y: {
      name: 'Y',
      type: SettingType.Text,
      params: {},
    },
  },
};
