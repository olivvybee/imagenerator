import { StepperSetting, TextSetting } from '../../types/SettingTypes';

export type HierarchyOfNeedsSettings = {
  numberOfSegments: StepperSetting<number>;
  segment1: TextSetting;
  segment2: TextSetting;
  segment3: TextSetting;
  segment4: TextSetting;
  segment5: TextSetting;
};

export type HierarchyOfNeedsCache = {
  font: FontFace;
};
