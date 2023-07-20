import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { DEFAULT_FILL, DEFAULT_STROKE } from './constants';
import { generate } from './generate';
import { NowThatsWhatICallSettings } from './types';

export const nowThatsWhatICallGenerator: Generator<NowThatsWhatICallSettings> =
  {
    name: "Now that's what I call...",
    description: '...an image generator.',
    helpText: 'Enter some text and choose a colour.',
    generate,
    settings: {
      text1: {
        name: 'Text line 1',
        type: SettingType.Text,
        params: {},
      },
      text2: {
        name: 'Text line 2',
        type: SettingType.Text,
        params: {},
      },
      text3: {
        name: 'Text line 3',
        type: SettingType.Text,
        params: {},
      },
      fillColour: {
        name: 'Fill colour',
        type: SettingType.Colour,
        defaultValue: DEFAULT_FILL,
        params: {
          allowCustom: true,
        },
      },
      strokeColour: {
        name: 'Stroke colour',
        type: SettingType.Colour,
        defaultValue: DEFAULT_STROKE,
        params: {
          allowCustom: true,
        },
      },
    },
  };
