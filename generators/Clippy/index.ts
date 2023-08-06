import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { ClippySettings } from './types';

export const clippyGenerator: Generator<ClippySettings> = {
  name: 'Clippy',
  description:
    "It looks like you're trying to generate a meme. Would you like help?",
  helpText:
    'Enter text to display in the speech bubble, and optionally add up to three buttons.',
  generate,
  settings: {
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {},
    },
    button1: {
      name: 'Button 1',
      type: SettingType.Text,
      params: {},
    },
    button2: {
      name: 'Button 2',
      type: SettingType.Text,
      params: {},
    },
    button3: {
      name: 'Button 3',
      type: SettingType.Text,
      params: {},
    },
  },
};
