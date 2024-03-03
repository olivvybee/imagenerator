import { SettingValues } from '../../types/SettingTypes';
import { WhatAWeekSettings } from './types';

export const buildAltText = (settings: SettingValues<WhatAWeekSettings>) => {
  const { captainHaddock, tintin } = settings;

  const haddockDesc = captainHaddock
    ? `Captain Haddock is saying "${captainHaddock.trim()}"`
    : 'Captain Haddock has an empty speech bubble';

  const tintinVerb = captainHaddock ? 'replying' : 'saying';

  const tintinDesc = tintin
    ? `Tintin is ${tintinVerb} "${tintin.trim()}"`
    : `Tintin has an empty speech bubble`;

  return `A comic of Tintin and Captain Haddock sitting at a bar. ${haddockDesc}, and ${tintinDesc}.`;
};
