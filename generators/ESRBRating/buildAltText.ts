import { SettingValues } from '../../types/SettingTypes';
import { oxfordComma } from '../../utils/oxfordComma';
import { ESRBRatingSettings } from './types';
import {
  hasCustomRating as settingsHaveCustomRating,
  getCustomInitials,
  getInitials,
  Rating,
} from './utils';

export const buildAltText = (settings: SettingValues<ESRBRatingSettings>) => {
  const { rating, customRating, text1, text2, text3, text4, text5 } = settings;

  const hasCustomRating = settingsHaveCustomRating(settings);

  const ratingText = hasCustomRating ? customRating || '' : rating;
  const initials = hasCustomRating
    ? getCustomInitials(ratingText)
    : getInitials(rating as Rating);

  const ratingDesc = ratingText
    ? `the rating "${initials} for ${ratingText}"`
    : 'no rating';

  const descriptionItems = [text1, text2, text3, text4, text5]
    .filter((str) => !!str)
    .map((str) => `"${str}"`);
  const description = oxfordComma(descriptionItems);

  const reasons = description
    ? `The reasons it lists for the rating are ${description}.`
    : 'There are no reasons listed for the rating.';

  if (!ratingText && !description) {
    return 'A blank ESRB rating sticker.';
  }

  return `An ESRB rating sticker with ${ratingDesc}. ${reasons}`;
};
