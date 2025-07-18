import {
  TextSetting,
  ColourSetting,
  DropdownSetting,
  SliderSetting,
} from '../../types/SettingTypes';

export type GboardTextStickerSettings = {
  text: TextSetting;
  colour: ColourSetting;
  fontSize: SliderSetting;
  decoration: DropdownSetting;
  decorationColour: ColourSetting;
};
