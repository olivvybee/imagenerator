import { DropdownSetting, TextSetting } from '../../types/SettingTypes';

export type EldenRingSettings = {
  firstLineFormat: DropdownSetting;
  firstLineText: TextSetting;
  conjunction: DropdownSetting;
  secondLineFormat: DropdownSetting;
  secondLineText: TextSetting;
};

export type EldenRingCache = {
  font: FontFace;
  icon: HTMLImageElement;
};
