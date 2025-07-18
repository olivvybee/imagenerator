import { SettingValues } from '../../types/SettingTypes';
import { Decoration } from './constants';
import { GboardTextStickerSettings } from './types';

export const buildAltText = (
  settings: SettingValues<GboardTextStickerSettings>
) => {
  const { text, colour, decoration } = settings;

  const textDesc = `"${text}" written in a bubbly font, in a pastel ${colour.name.toLowerCase()} colour.`;

  return decoration === Decoration.Hat
    ? `${textDesc} There's a cowboy hat on top of the text, as if the text is wearing it.`
    : textDesc;
};
