import { SettingValues } from '../../types/SettingTypes';
import { YakuzaSettings } from './types';

export const buildAltText = (settings: SettingValues<YakuzaSettings>) => {
  const { name, title, image } = settings;

  if (!name && !title) {
    return undefined;
  }

  const firstLine = `${image.description} with text on top in a red handwriting style font styled like a character intro screen from a Yakuza game. `;

  if (name && title) {
    return (
      firstLine +
      `The first line of text says "${name}", and below it in a smaller font is the text "${title}".`
    );
  }

  return firstLine + `The text says "${name || title}".`;
};
