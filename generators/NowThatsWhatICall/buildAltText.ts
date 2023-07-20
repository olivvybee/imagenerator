import { SettingValues } from '../../types/SettingTypes';
import { notUndefined } from '../../utils/notUndefined';
import { NowThatsWhatICallSettings } from './types';

export const buildAltText = (
  settings: SettingValues<NowThatsWhatICallSettings>
) => {
  const { text1, text2, text3 } = settings;

  const text = [text1, text2, text3]
    .filter((s) => !!s)
    .map((s) => s.trim())
    .join(' ');

  return `Text styled to look like a "Now That's What I Call Music" album, but it says "Now that's what I call ${text}".`;
};
