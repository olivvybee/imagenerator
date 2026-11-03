import { SettingValues } from '../../types/SettingTypes';

import { TARGET_SIZE } from './constants';
import { GameBoyCameraSettings } from './types';

export const getDimensions = (
  settings: SettingValues<GameBoyCameraSettings>
) => {
  const [ratioWidth, ratioHeight] = settings.aspectRatio
    .split(':')
    .map((value) => parseInt(value));

  const shortSide = Math.round((TARGET_SIZE * ratioWidth) / ratioHeight);

  if (settings.horizontal) {
    return { width: TARGET_SIZE, height: shortSide };
  }

  return { width: shortSide, height: TARGET_SIZE };
};

export const getAspectRatio = (
  settings: SettingValues<GameBoyCameraSettings>
) => {
  const { width, height } = getDimensions(settings);
  return width / height;
};
