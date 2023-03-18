import { SettingValues } from '../../types/SettingTypes';

import { HierarchyOfNeedsSettings } from './types';

export const buildAltText = (
  settings: SettingValues<HierarchyOfNeedsSettings>
) => {
  const { segment1, segment2, segment3, segment4, segment5 } = settings;

  const segments = [segment1, segment2, segment3, segment4, segment5]
    .filter((segment) => !!segment)
    .map((segment) => segment.trim())
    .filter((segment) => !!segment);

  if (segments.length === 0) {
    return "The triangle diagram showing Maslow's Hierarchy of Needs, except the usual segments have been covered up.";
  }

  let list = '';
  if (segments.length === 1) {
    list = `"${segments[0]}"`;
  } else if (segments.length === 2) {
    list = `"${segments[0]}" and "${segments[1]}"`;
  } else {
    const head = segments
      .slice(0, -2)
      .map((text) => `"${text}"`)
      .join(', ');
    const tail = segments[segments.length - 1];
    list = `${head}, and "${tail}"`;
  }

  return `The triangle diagram showing Maslow's Hierarchy of Needs, except the usual segments have been replaced with ${list}.`;
};
