import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { TimesNewHeadlineSettings } from './types';

export const timesNewHeadlineGenerator: Generator<TimesNewHeadlineSettings> = {
  name: 'Times New headline',
  description: 'Extra, extra, meme all about it!',
  helpText: 'Enter a category (e.g. "Opinion"), and headline, and a byline.',
  generate,
  settings: {
    headline: {
      name: 'Headline',
      type: SettingType.Text,
      params: {},
    },
    byline: {
      name: 'Byline',
      type: SettingType.Text,
      params: {},
    },
    category: {
      name: 'Category',
      type: SettingType.Text,
      params: {},
    },
  },
};
