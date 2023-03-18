import { SettingValues } from '../../types/SettingTypes';

import { TuxedoMaskSettings } from './types';

export const buildAltText = (settings: SettingValues<TuxedoMaskSettings>) => {
  const { rose = '', tuxedoMask = '', sailorMoon = '' } = settings;

  const roseText = rose ? `, with a label that says "${rose}".` : '.';

  const tuxedoMaskText = tuxedoMask
    ? `, with a label that says "${tuxedoMask}".`
    : '.';

  const sailorMoonText = sailorMoon
    ? `, with a label that says "${sailorMoon}".`
    : '.';

  return (
    'Four panels with screenshots from the Sailor Moon anime.' +
    ' The first shows a rose sticking out of the ground on a pink and purple background' +
    roseText +
    ' The second shows Tuxedo Mask' +
    tuxedoMaskText +
    ' Text below him says "My job here is done".' +
    ' The third panel shows Sailor Moon looking up at Tuxedo Mask' +
    sailorMoonText +
    ' Text below her says "But you didn\'t do anything".' +
    ' The final panel shows Tuxedo Mask sweeping his cape as he turns to leave.'
  );
};
