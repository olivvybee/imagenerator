import React from 'react';
import { Colour } from './Colour';
import { Image } from './Image';
import { SliderPreset } from './Slider';

export enum SettingType {
  Image,
  Text,
  Number,
  Dropdown,
  Stepper,
  Slider,
  Colour,
}

export type SettingCondition = (settings: SettingValues<any>) => boolean;

export interface Setting<T extends SettingType, V, P extends {}> {
  type: T;
  name: string;
  params: P;
  defaultValue?: V;
  when?: SettingCondition;
}

export type ImageSetting = Setting<
  SettingType.Image,
  Image,
  {
    allowCrop?: boolean;
    cropAspectRatio?: number;
    cropMinWidth?: number;
    cropMinHeight?: number;
  }
>;
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
  { options: readonly string[] }
>;
export type StepperSetting<V> = Setting<
  SettingType.Stepper,
  V,
  {
    options: V[];
    allowWrapping: boolean;
    renderLabel?: (value: V, index: number) => React.ReactElement;
  }
>;
export type SliderSetting = Setting<
  SettingType.Slider,
  number,
  { min: number; max: number; step?: number; presets?: SliderPreset[] }
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
