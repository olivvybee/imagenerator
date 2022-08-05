export enum SettingType {
  Image,
  Text,
  Number,
  Dropdown,
  Stepper,
  Slider,
  Colour,
}

export interface BaseSetting<T extends SettingType, V, P extends {}> {
  type: T;
  name: string;
  params: P;
  defaultValue?: V;
}

export type ImageSetting = BaseSetting<SettingType.Image, HTMLImageElement, {}>;
export type TextSetting = BaseSetting<
  SettingType.Text,
  string,
  { multiline?: boolean; placeholder?: string }
>;
export type NumberSetting = BaseSetting<
  SettingType.Number,
  number,
  { min?: number; max?: number }
>;
export type DropdownSetting = BaseSetting<
  SettingType.Dropdown,
  string,
  { options: string[] }
>;
export type StepperSetting<V> = BaseSetting<
  SettingType.Stepper,
  V,
  { options: V[]; allowWrapping: boolean }
>;
export type SliderSetting = BaseSetting<
  SettingType.Slider,
  number,
  { min: number; max: number; step?: number }
>;
export type ColourSetting = BaseSetting<
  SettingType.Colour,
  string,
  { presets?: string[] }
>;

export type Setting =
  | TextSetting
  | NumberSetting
  | DropdownSetting
  | StepperSetting<any>
  | SliderSetting
  | ColourSetting;

export interface SettingValues {
  [name: string]: any;
}
