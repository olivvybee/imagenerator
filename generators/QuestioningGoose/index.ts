import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { QuestioningGooseSettings } from './types';

export const questioningGooseGenerator: Generator<QuestioningGooseSettings> = {
  name: 'Questioning goose',
  description: 'Funny to who??',
  helpText:
    'Enter text for the goose to say in the top and bottom panels, and optionally extra text for the person to say from offscreen.',
  attribution: {
    name: '"Feathers" by they can talk',
    href: 'https://theycantalk.com/post/636165692960522240/feathers',
  },
  generate,
  settings: {
    offscreenText: {
      name: 'Offscreen text',
      type: SettingType.Text,
      params: {},
    },
    topPanelText: {
      name: 'Top panel text',
      type: SettingType.Text,
      params: {},
    },
    bottomPanelText: {
      name: 'Bottom panel text',
      type: SettingType.Text,
      params: {},
    },
  },
};
