import { DropdownSetting, TextSetting } from '../../types/SettingTypes';

export type ExcitedSlimeSettings = {
  firstPanel: TextSetting;
  secondPanel: TextSetting;
  thirdPanel: TextSetting;
  includeSadPanel: DropdownSetting;
  fourthPanel: TextSetting;
};

export type ExcitedSlimeCache = {
  backgroundImage: HTMLImageElement;
};
