import { DropdownSetting, TextSetting } from '../../types/SettingTypes';

export type DramaticCrossroadsSettings = {
  leftPath: TextSetting;
  rightPath: TextSetting;
  person: TextSetting;
  variant: DropdownSetting;
};

export enum Variant {
  GoodAndEvil = 'Good and evil',
  BothEvil = 'Both evil',
  BothGood = 'Both good',
}
