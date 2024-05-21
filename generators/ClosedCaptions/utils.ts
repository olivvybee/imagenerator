import { loadFont } from '../../utils/loadFont';
import { FONTS } from './constants';

export const loadChosenFont = async (chosenFont: string) => {
  const { name, url } = FONTS[chosenFont];
  if (!url) {
    return;
  }

  return loadFont(name, url);
};
