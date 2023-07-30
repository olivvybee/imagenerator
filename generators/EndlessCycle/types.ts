import { StepperSetting, TextSetting } from '../../types/SettingTypes';

export type EndlessCycleSettings = {
  numberOfSteps: StepperSetting<number>;
  step1: TextSetting;
  step2: TextSetting;
  step3: TextSetting;
  step4: TextSetting;
};
