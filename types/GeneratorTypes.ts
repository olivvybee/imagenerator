import { Settings, SettingValues } from './SettingTypes';
import { Size } from './UtilTypes';

export interface Output {
  size: Size;
  suggestedAltText?: string;
}

export type GeneratorFunction<S extends Settings> = (
  canvas: HTMLCanvasElement,
  settings: SettingValues<S>
) => Promise<Output>;

export type PreloadFunction = () => Promise<void>;

export type Generator<S extends Settings> = {
  generate: GeneratorFunction<S>;
  preload?: PreloadFunction;
  name: string;
  description: string;
  helpText: string;
  settings: S;
  showImageSelector: boolean;
};
