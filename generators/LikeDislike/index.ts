import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { CHARACTER_OPTIONS, CHARACTERS } from './constants';
import { generate } from './generate';
import { LikeDislikeSettings } from './types';

export const likeDislikeGenerator: Generator<LikeDislikeSettings> = {
  name: 'Like/Dislike',
  description:
    '😩✋ memes featuring problematic people / 😀👉 memes featuring anime characters',
  helpText: 'Choose a character and then enter text for each row.',
  generate,
  settings: {
    character: {
      type: SettingType.Dropdown,
      name: 'Character',
      params: {
        options: CHARACTER_OPTIONS,
      },
      defaultValue: CHARACTER_OPTIONS[0],
    },
    topText: {
      type: SettingType.Text,
      name: 'Top text',
      params: {},
    },
    bottomText: {
      type: SettingType.Text,
      name: 'Bottom text',
      params: {},
    },
  },
};
