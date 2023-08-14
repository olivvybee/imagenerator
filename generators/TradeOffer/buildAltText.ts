import { SettingValues } from '../../types/SettingTypes';
import { TradeOfferSettings } from './types';

export const buildAltText = (settings: SettingValues<TradeOfferSettings>) => {
  const { character, characterLabel, iReceive, youReceive } = settings;

  let imageDescription = '';
  switch (character) {
    case 'Amity':
      imageDescription =
        'Amity from the owl house looking smug and standing with her arms spread out';
      break;

    case 'Makima':
      imageDescription =
        'Makima from chainsaw man standing with her hands touching at the fingertips';
      break;

    case 'Ash':
      imageDescription =
        'Pixel art of Ash Ketchum from pokemon made to look like a gameboy sprite with his hands touching at the fingertips';
  }

  if (characterLabel) {
    imageDescription += ` labelled with text that says "${characterLabel}".`;
  } else {
    imageDescription += '.';
  }

  const iReceiveDesc = iReceive
    ? `"I receive: ${iReceive.replaceAll('\n', ' ')}"`
    : '"I receive" followed by a blank space';
  const youReceiveDesc = youReceive
    ? `"You receive: ${youReceive.replaceAll('\n', ' ')}"`
    : '"You receive" followed by a blank space';

  const textDescription =
    'Above the image is text that says "trade offer" on a red background with warning symbols on either side, ' +
    `followed by text on either side that says ${iReceiveDesc} and ${youReceiveDesc}.`;

  return imageDescription + ' ' + textDescription;
};
