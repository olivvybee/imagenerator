import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { WhenEveryonesSuperSettings } from './types';

export const whenEveryonesSuperGenerator: Generator<WhenEveryonesSuperSettings> = {
  name: "When everyone's super",
  description: "When everything's a meme, nothing will be.",
  helpText: 'Enter text for the top panel and the bottom panel.',
  generate,
  settings: {
    topText: {
      name: 'Top text',
      type: SettingType.Text,
      params: {},
    },
    bottomText: {
      name: 'Bottom text',
      type: SettingType.Text,
      params: {},
    },
  },
};
