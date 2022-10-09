import { Colour } from './Colour';

export enum SettingType {
  Image,
  Text,
  Number,
  Dropdown,
  Stepper,
  Slider,
  Colour,
}

export interface Setting<T extends SettingType, V, P extends {}> {
  type: T;
  name: string;
  params: P;
  defaultValue?: V;
}

export type ImageSetting = Setting<SettingType.Image, HTMLImageElement, {}>;
export type TextSetting = Setting<
  SettingType.Text,
  string,
  { multiline?: boolean; placeholder?: string }
>;
export type NumberSetting = Setting<
  SettingType.Number,
  number,
  { min?: number; max?: number }
>;
export type DropdownSetting = Setting<
  SettingType.Dropdown,
  string,
  { options: string[] }
>;
export type StepperSetting<V> = Setting<
  SettingType.Stepper,
  V,
  { options: V[]; allowWrapping: boolean }
>;
export type SliderSetting = Setting<
  SettingType.Slider,
  number,
  { min: number; max: number; step?: number }
>;
export type ColourSetting = Setting<
  SettingType.Colour,
  Colour,
  { presets?: Colour[]; allowCustom?: boolean }
>;

export type TypedSetting =
  | ImageSetting
  | TextSetting
  | NumberSetting
  | DropdownSetting
  | StepperSetting<any>
  | SliderSetting
  | ColourSetting;

export type Settings = {
  [key: string]: TypedSetting;
};

export type SettingValues<S extends Settings = Settings> = {
  [K in keyof S]: S[K] extends Setting<any, infer V, any> ? V : never;
};
