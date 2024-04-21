import { SettingValues } from '../../types/SettingTypes';
import { WhenEveryonesSuperSettings } from './types';

export const buildAltText = (settings: SettingValues<WhenEveryonesSuperSettings>) => {
  const { topText, bottomText } = settings;

  const top = topText ? ` and there's a caption that says "${topText}".` : '.';

  const bottom = bottomText ? ` and there's a caption that says "${bottomText}".` : '.';

  return 'An image with two screencaps from The Incredibles. ' +
    `In the top panel, Syndrome is grinning and has his head tilted${top} ` +
    `In the bottom panel, Syndrome has turned around and the Incredibles are visible in the background held captive by energy beams. Syndrome looks more serious${bottom}`
};
