import { SettingValues } from '../../types/SettingTypes';
import { RATING_OPTIONS } from './constants';
import { ESRBRatingSettings } from './types';

export const hasCustomRating = (settings: SettingValues<ESRBRatingSettings>) =>
  settings.rating === 'Custom';

export type Rating = keyof typeof RATING_OPTIONS;

export const getInitials = (rating: Rating) => {
  switch (rating) {
    case 'Everyone':
      return 'E';

    case 'Everyone 10+':
      return 'E 10+';

    case 'Teen':
      return 'T';

    case 'Mature 17+':
      return 'M';

    case 'Adults Only 18+':
      return 'AO';

    case 'Rating Pending':
      return 'RP';

    default:
      return '';
  }
};

export const getCustomInitials = (customRating: string) =>
  customRating
    .split(' ')
    .map((str) => str.charAt(0))
    .join('')
    .toUpperCase();
