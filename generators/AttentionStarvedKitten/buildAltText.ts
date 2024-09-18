import { SettingValues } from '../../types/SettingTypes';
import { AttentionStarvedKittenSettings } from './types';

export const buildAltText = (settings: SettingValues<AttentionStarvedKittenSettings>) => {
  const { topCatLabel, bottomCatLabel } = settings;

  return `A pair of metal cat cages stacked on top of each other. The top one is open and contains a white cat , labeled "${topCatLabel}", looking up above the camera and basking in the attention of the photographer. The bottom one is closed and contains a smaller orange cat labeled "${bottomCatLabel}", climbing up the cage bars, desperate for attention.`;
};
