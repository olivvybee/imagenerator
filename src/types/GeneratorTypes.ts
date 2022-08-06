import {
  Settings,
  NumberSetting,
  TextSetting,
  SettingValues,
} from './SettingTypes';
import { Size } from './UtilTypes';

export interface Output {
  size: Size;
  suggestedAltText?: string;
}

export type GeneratorFunction<S extends Settings> = (
  settings: SettingValues<S>,
  ctx: CanvasRenderingContext2D
) => Promise<Output>;

export type Generator<S extends Settings> = {
  generate: GeneratorFunction<S>;
  name: string;
  description: string;
  helpText: string;
  settings: S;
  showImageSelector: boolean;
};
