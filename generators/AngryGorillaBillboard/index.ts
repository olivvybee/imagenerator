import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { AngryGorillaBillboardSettings } from './types';

export const angryGorillaBillboardGenerator: Generator<AngryGorillaBillboardSettings> =
  {
    name: 'Angry gorilla billboard',
    description: 'This gorilla has some *thoughts*.',
    helpText: 'Enter text to display on the sign.',
    generate,
    settings: {
      text: {
        name: 'Text',
        type: SettingType.Text,
        params: {},
      },
    },
  };
