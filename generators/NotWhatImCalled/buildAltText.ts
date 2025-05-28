import { SettingValues } from '../../types/SettingTypes';
import { NotWhatImCalledSettings } from './types';

export const buildAltText = (
  settings: SettingValues<NotWhatImCalledSettings>
) => {
  const { name, image } = settings;

  return (
    `${image.description} saying "hey guys" with three people looking over and pointing. ` +
    `The characters shout "${name}" ` +
    'and the response is "not what I\'m called".'
  );
};
