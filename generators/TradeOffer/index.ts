import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { BACKGROUND_PRESETS } from './constants';
import { generate } from './generate';
import { TradeOfferSettings } from './types';

export const tradeOfferGenerator: Generator<TradeOfferSettings> = {
  name: 'Trade offer',
  description: 'Trade your great ideas for generated memes.',
  helpText:
    'Enter text for each side, choose a character, and optionally add a label for the character.',
  generate,
  settings: {
    iReceive: {
      name: 'I receive',
      type: SettingType.Text,
      params: { multiline: true },
    },
    youReceive: {
      name: 'You receive',
      type: SettingType.Text,
      params: { multiline: true },
    },
    character: {
      name: 'Character',
      type: SettingType.Dropdown,
      params: {
        options: ['Amity', 'Makima', 'Ash'],
      },
      defaultValue: 'Amity',
    },
    characterLabel: {
      name: 'Character label',
      type: SettingType.Text,
      params: {},
    },
    backgroundColour: {
      name: 'Background colour',
      type: SettingType.Colour,
      defaultValue: BACKGROUND_PRESETS[0],
      params: {
        presets: BACKGROUND_PRESETS,
        allowCustom: true,
      },
    },
  },
};
