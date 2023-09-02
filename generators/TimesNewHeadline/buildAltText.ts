import { SettingValues } from '../../types/SettingTypes';
import { TimesNewHeadlineSettings } from './types';

export const buildAltText = (
  settings: SettingValues<TimesNewHeadlineSettings>
) => {
  const { headline, byline, category } = settings;

  const headlineDesc = headline
    ? `The headline reads "${headline}.`
    : "There's no headline.";

  const bylineDesc = byline ? ` The article's byline is "${byline}".` : '';

  const categoryDesc = category
    ? ` The article is in a category called "${category}".`
    : '';

  return `Text designed to look like a heading from a popular newspaper website. ${headlineDesc}${bylineDesc}${categoryDesc}`;
};
