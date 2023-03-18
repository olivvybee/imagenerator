import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';

import { generate } from './generate';
import { HierarchyOfNeedsSettings } from './types';

export const hierarchyOfNeedsGenerator: Generator<HierarchyOfNeedsSettings> = {
  generate,
  name: 'Hierarchy of needs',
  description:
    "All you need is love, and a Maslow's hierarchy of needs generator.",
  helpText:
    'Choose the number of segments you would like, then fill in each segment.',
  settings: {
    numberOfSegments: {
      type: SettingType.Stepper,
      name: 'Number of segments',
      defaultValue: 1,
      params: {
        options: [1, 2, 3, 4, 5],
        allowWrapping: false,
      },
    },
    segment1: {
      type: SettingType.Text,
      name: 'Segment 1',
      params: {},
    },
    segment2: {
      type: SettingType.Text,
      name: 'Segment 2',
      params: {},
      when: (settings) => settings.numberOfSegments >= 2,
    },
    segment3: {
      type: SettingType.Text,
      name: 'Segment 3',
      params: {},
      when: (settings) => settings.numberOfSegments >= 3,
    },
    segment4: {
      type: SettingType.Text,
      name: 'Segment 4',
      params: {},
      when: (settings) => settings.numberOfSegments >= 4,
    },
    segment5: {
      type: SettingType.Text,
      name: 'Segment 5',
      params: {},
      when: (settings) => settings.numberOfSegments >= 5,
    },
  },
};
