import {
  ColourSetting,
  DropdownSetting,
  TextSetting,
} from '../../types/SettingTypes';

export type TradeOfferSettings = {
  iReceive: TextSetting;
  youReceive: TextSetting;
  character: DropdownSetting;
  characterLabel: TextSetting;
  backgroundColour: ColourSetting;
};
