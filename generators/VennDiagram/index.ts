import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { CIRCLE_COLOURS } from './constants';
import { generate } from './generate';
import { VennDiagramSettings } from './types';

export const vennDiagramGenerator: Generator<VennDiagramSettings> = {
  name: 'Venn Diagram',
  description: 'The overlap between memes and art.',
  helpText:
    'Enter text for each circle and the overlap, and optionally change the colours of the circles.',
  generate,
  settings: {
    leftCircle: {
      name: 'Left circle',
      type: SettingType.Text,
      params: {},
    },
    rightCircle: {
      name: 'Right circle',
      type: SettingType.Text,
      params: {},
    },
    overlap: {
      name: 'Overlap',
      type: SettingType.Text,
      params: {},
    },
    leftCircleColour: {
      name: 'Left circle colour',
      type: SettingType.Dropdown,
      params: {
        options: Object.keys(CIRCLE_COLOURS),
      },
      defaultValue: Object.keys(CIRCLE_COLOURS)[0],
    },
    rightCircleColour: {
      name: 'Right circle colour',
      type: SettingType.Dropdown,
      params: {
        options: Object.keys(CIRCLE_COLOURS),
      },
      defaultValue: Object.keys(CIRCLE_COLOURS)[1],
    },
  },
};
