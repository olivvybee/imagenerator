import { SettingValues } from '../../types/SettingTypes';
import { GameBoyCameraSettings } from './types';

export const buildAltText = (
  settings: SettingValues<GameBoyCameraSettings>
) => {
  const { image } = settings;

  const imageDesc = image.altText || '{{userImage}}';

  return `${imageDesc}. The picture has been edited to look like it was taken with a game boy camera, so it uses a palette of four colours and has a low resolution pixellated effect.`;
};
