import { BooleanSetting, TextSetting } from '../../types/SettingTypes';

export type ExcitedSlimeSettings = {
  firstPanel: TextSetting;
  secondPanel: TextSetting;
  thirdPanel: TextSetting;
  includeSadPanel: BooleanSetting;
  fourthPanel: TextSetting;
};

export type ExcitedSlimeCache = {
  backgroundImage: HTMLImageElement;
};
