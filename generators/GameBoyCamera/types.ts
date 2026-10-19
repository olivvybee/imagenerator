import {
  BooleanSetting,
  ImageSetting,
  StepperSetting,
} from '../../types/SettingTypes';

export interface Palette {
  name: string;
  colours: string[];
  source?: string;
}

export type GameBoyCameraSettings = {
  image: ImageSetting;
  aspectRatio: StepperSetting<string>;
  horizontal: BooleanSetting;
  brightness: StepperSetting<number>;
  contrast: StepperSetting<number>;
  palette: StepperSetting<Palette>;
};
