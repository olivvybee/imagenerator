import {
  DropdownSetting,
  ImageSetting,
  TextSetting,
} from '../../types/SettingTypes';

export type ClosedCaptionsSettings = {
  image: ImageSetting;
  text: TextSetting;
  font: DropdownSetting;
  textPosition: DropdownSetting;
};
