import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { InterruptingCrowSettings } from './types';

export const interruptingCrowGenerator: Generator<InterruptingCrowSettings> = {
  name: 'Interrupting crow',
  description: 'This crow has a very important message for you.',
  helpText: 'Enter text for each of the speech bubbles.',
  attribution: {
    name: '"Juncrow" by False Knees',
    href: 'http://falseknees.com/comics/158.html',
  },
  generate,
  settings: {
    topLeftText: {
      type: SettingType.Text,
      name: 'Top left text',
      params: {},
    },
    topRightText1: {
      type: SettingType.Text,
      name: 'Top right text (grey bird)',
      params: {},
    },
    topRightText2: {
      type: SettingType.Text,
      name: 'Top right text (interrupting)',
      params: {},
    },
    bottomLeftText: {
      type: SettingType.Text,
      name: 'Bottom left text',
      params: {},
    },
    bottomRightText: {
      type: SettingType.Text,
      name: 'Bottom right text',
      params: {},
    },
  },
};
