import { Generator } from '../../types/GeneratorTypes';
import { SettingType, SettingValues } from '../../types/SettingTypes';
import { RATING_OPTIONS } from './constants';
import { generate } from './generate';
import { ESRBRatingSettings } from './types';
import { hasCustomRating } from './utils';

export const esrbRatingGenerator: Generator<ESRBRatingSettings> = {
  name: 'ESRB rating',
  description: 'Rated M for Memes',
  helpText:
    'Choose a rating, or enter a custom one, then add text that describes the rating.',
  generate,
  settings: {
    rating: {
      name: 'Rating',
      type: SettingType.Dropdown,
      params: {
        options: RATING_OPTIONS,
      },
      defaultValue: RATING_OPTIONS[0],
    },
    customRating: {
      name: 'Custom rating text',
      type: SettingType.Text,
      params: {},
      when: hasCustomRating,
    },
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
    text4: {
      name: 'Text line 4',
      type: SettingType.Text,
      params: {},
    },
    text5: {
      name: 'Text line 5',
      type: SettingType.Text,
      params: {},
    },
  },
};
