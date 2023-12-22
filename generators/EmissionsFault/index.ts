import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { EmissionsFaultSettings } from './types';

export const emissionsFaultGenerator: Generator<EmissionsFaultSettings> = {
  name: 'Emissions fault',
  description: 'Starting impossible',
  helpText: 'Enter some text to show in the error message.',
  generate,
  settings: {
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: { multiline: true },
    },
  },
};
