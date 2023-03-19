import { ImageSetting } from '../../types/SettingTypes';

export type TheyLiveSettings = {
  topImage: ImageSetting;
  bottomImage: ImageSetting;
};

export type TheyLiveCache = {
  topStaticImage: HTMLImageElement;
  bottomStaticImage: HTMLImageElement;
};
