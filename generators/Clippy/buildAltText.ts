import { SettingValues } from '../../types/SettingTypes';
import { oxfordComma } from '../../utils/oxfordComma';
import { ClippySettings } from './types';

export const buildAltText = (settings: SettingValues<ClippySettings>) => {
  const { text, button1, button2, button3 } = settings;

  const textDescription = text
    ? `saying "${text.replaceAll('\n', ' ')}"`
    : 'that has a blank space where text should go';

  const visibleButtons = [button1, button2, button3].filter(
    (button) => !!button
  );
  const numberOfButtons = visibleButtons.length;
  const buttonTexts = oxfordComma(
    visibleButtons.map((button) => `"${button}"`)
  );
  const buttonsDescription =
    numberOfButtons > 0
      ? numberOfButtons === 1
        ? ` At the bottom of the speech bubble, there is a button saying "${buttonTexts}.`
        : ` At the bottom of the speech bubble, there are ${numberOfButtons} buttons saying ${buttonTexts}.`
      : '';

  return `An image of Clippy, the paperclip with eyes from Microsoft Office, with a speech bubble ${textDescription}.${buttonsDescription}`;
};
