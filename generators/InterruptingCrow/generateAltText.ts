import { SettingValues } from '../../types/SettingTypes';
import { InterruptingCrowSettings } from './types';

export const generateAltText = (
  settings: SettingValues<InterruptingCrowSettings>
) => {
  const {
    topLeftText = '',
    topRightText1 = '',
    topRightText2 = '',
    bottomLeftText = '',
    bottomRightText = '',
  } = settings;

  const panel1 = topLeftText
    ? `saying "${topLeftText}"`
    : 'with an empty speech bubble';
  const panel2Bird = topRightText1
    ? `is saying "${topRightText1}"`
    : 'has an empty speech bubble';
  const panel2Interruption = topRightText2
    ? `that says "${topRightText2.toUpperCase()}"`
    : 'that is empty';
  const panel3 = bottomLeftText
    ? `is now saying "${bottomLeftText.toUpperCase()}"`
    : 'now has an empty speech bubble';
  const panel4 = bottomRightText
    ? `that says "${bottomRightText.toUpperCase()}"`
    : 'that is empty';

  return (
    `A four panel comic. The first panel shows a small grey bird sitting on a tree branch ${panel1}. ` +
    `In the second panel, the bird ${panel2Bird} and a speech bubble is interrupting from off screen ${panel2Interruption}. ` +
    `The third panel shows the interruption was coming from a crow, who ${panel3}. ` +
    `The last panel shows the grey bird looking grumpy as the crow interrupts with another speech bubble ${panel4}.`
  );
};
