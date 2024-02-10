import { DropdownSetting, TextSetting } from '../../types/SettingTypes';

export type VennDiagramSettings = {
  leftCircle: TextSetting;
  rightCircle: TextSetting;
  overlap: TextSetting;
  leftCircleColour: DropdownSetting;
  rightCircleColour: DropdownSetting;
};
