import {
  DropdownSetting,
  ImageSetting,
  SliderSetting,
  TextSetting,
} from '../../types/SettingTypes';

export type TomScottSettings = {
  image: ImageSetting;
  text: TextSetting;
  horizontalPosition: DropdownSetting;
  verticalPosition: SliderSetting;
  arrowHorizontalPosition: SliderSetting;
};

export type TomScottCache = {
  image: HTMLImageElement;
};
