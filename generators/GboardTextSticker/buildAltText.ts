import { SettingValues } from '../../types/SettingTypes';
import { Decoration } from './constants';
import { GboardTextStickerSettings } from './types';

export const buildAltText = (
  settings: SettingValues<GboardTextStickerSettings>
) => {
  const { text, colour, decoration, decorationColour } = settings;

  const textDesc = `"${text}" written in a bubbly font, in a pastel ${colour.name.toLowerCase()} colour`;

  switch (decoration) {
    case Decoration.None:
      return textDesc;

    case Decoration.Underline:
      return `${textDesc}, with a pastel ${decorationColour.name.toLowerCase()} underline.`;

    case Decoration.Hat:
      return `${textDesc}. There's a cowboy hat on top of the text, as if the text is wearing it.`;
  }
};
