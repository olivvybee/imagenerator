import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { FONT_OPTIONS, POSITION_OPTIONS } from './constants';
import { generate } from './generate';
import { ClosedCaptionsSettings } from './types';

export const closedCaptionsGenerator: Generator<ClosedCaptionsSettings> = {
  name: 'Closed captions',
  description: 'Add closed-caption style text to any image.',
  helpText:
    'Choose an image and add text for the caption. Optionally the text can be moved to the top, and the font can be changed.',
  generate,
  settings: {
    image: {
      name: 'Image',
      type: SettingType.Image,
      params: {},
    },
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {
        multiline: true,
      },
    },
    font: {
      name: 'Font',
      type: SettingType.Dropdown,
      params: {
        options: FONT_OPTIONS,
      },
      defaultValue: FONT_OPTIONS[0],
    },
    textPosition: {
      name: 'Caption position',
      type: SettingType.Dropdown,
      params: {
        options: POSITION_OPTIONS,
      },
      defaultValue: POSITION_OPTIONS[0],
    },
  },
};
