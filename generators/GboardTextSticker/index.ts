import { Generator } from '../../types/GeneratorTypes';
import { SettingType, SettingValues } from '../../types/SettingTypes';
import { COLOURS, Decoration, TARGET_FONT_SIZE } from './constants';
import { generate } from './generate';
import { GboardTextStickerSettings } from './types';

export const gboardTextStickerGenerator: Generator<GboardTextStickerSettings> =
  {
    name: 'Gboard text sticker',
    description: 'Generate a Gboard-style text sticker on your own terms.',
    helpText:
      'Enter some text and adjust the font size, then choose a colour and an optional decoration.',
    generate,
    settings: {
      text: {
        name: 'Text',
        type: SettingType.Text,
        params: {},
      },
      colour: {
        name: 'Colour',
        type: SettingType.Colour,
        params: {
          allowCustom: true,
          presets: COLOURS,
        },
        defaultValue: COLOURS[0],
      },
      fontSize: {
        name: 'Font size',
        type: SettingType.Slider,
        params: {
          min: 48,
          max: TARGET_FONT_SIZE,
        },
        defaultValue: TARGET_FONT_SIZE,
      },
      decoration: {
        name: 'Decoration',
        type: SettingType.Dropdown,
        params: {
          options: Object.values(Decoration),
        },
        defaultValue: Decoration.None,
      },
      decorationColour: {
        name: 'Decoration colour',
        type: SettingType.Colour,
        params: {
          allowCustom: true,
          presets: COLOURS,
        },
        when: (settings: SettingValues<GboardTextStickerSettings>) =>
          settings.decoration === Decoration.Underline,
      },
    },
  };
