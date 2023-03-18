import { SettingValues } from '../../types/SettingTypes';

import { CONJUNCTIONS } from './constants';
import { EldenRingSettings } from './types';

export const buildText = (settings: SettingValues<EldenRingSettings>) => {
  const a = settings.firstLineFormat.replaceAll(
    '***',
    settings.firstLineText || '***'
  );
  const b = settings.secondLineFormat.replaceAll(
    '***',
    settings.secondLineText || '***'
  );

  return settings.conjunction === CONJUNCTIONS[0]
    ? a
    : `${a}${settings.conjunction} ${b}`;
};
