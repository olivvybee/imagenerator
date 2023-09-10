import { SettingValues } from '../../types/SettingTypes';
import { TheyLiveSettings } from './types';

export const buildAltText = (settings: SettingValues<TheyLiveSettings>) => {
  const { topImage, bottomImage } = settings;

  const topImageDesc = topImage.altText || '{{userImage}}';
  const bottomImageDesc = bottomImage.altText || '{{userImage}}';

  return (
    'A four panel meme with shots from the movie They Live. ' +
    "In the first panel, the main character (played by Roddy Piper) is holding a pair of sunglasses partially off his face, so that he's looking over them. " +
    `The next panel is ${topImageDesc}. ` +
    "In the third panel, he has put the sunglasses on so he's looking through them. " +
    `The final panel is ${bottomImageDesc}, in black and white.`
  );
};
