import { TextSetting } from '../../types/SettingTypes';

export type TuxedoMaskSettings = {
  rose: TextSetting;
  tuxedoMask: TextSetting;
  sailorMoon: TextSetting;
};

export type TuxedoMaskCache = {
  background: HTMLImageElement;
  font: FontFace;
};
