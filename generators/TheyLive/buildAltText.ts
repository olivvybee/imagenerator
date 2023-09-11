import { SettingValues } from '../../types/SettingTypes';
import { TheyLiveSettings } from './types';

export const buildAltText = (settings: SettingValues<TheyLiveSettings>) => {
  const { topImage, bottomImage } = settings;

  return (
    'A four panel meme with shots from the movie They Live. ' +
    "In the first panel, the main character (played by Roddy Piper) is holding a pair of sunglasses partially off his face, so that he's looking over them. " +
    `The next panel is ${topImage.description}. ` +
    "In the third panel, he has put the sunglasses on so he's looking through them. " +
    `The final panel is ${bottomImage.description}, in black and white.`
  );
};
