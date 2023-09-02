import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { DramaticCrossroadsSettings, Variant } from './types';

export const dramaticCrossroadsGenerator: Generator<DramaticCrossroadsSettings> =
  {
    name: 'Dramatic crossroads',
    description: 'Both paths lead to memes.',
    helpText:
      'Enter some text to show on each path, and choose a variant to change whether the paths are good or evil.',
    generate,
    settings: {
      leftPath: {
        name: 'Left path',
        type: SettingType.Text,
        params: {},
      },
      rightPath: {
        name: 'Right path',
        type: SettingType.Text,
        params: {},
      },
      person: {
        name: 'Person',
        type: SettingType.Text,
        params: {},
      },
      variant: {
        name: 'Variant',
        type: SettingType.Dropdown,
        params: {
          options: [Variant.GoodAndEvil, Variant.BothEvil, Variant.BothGood],
        },
        defaultValue: Variant.GoodAndEvil,
      },
    },
  };
