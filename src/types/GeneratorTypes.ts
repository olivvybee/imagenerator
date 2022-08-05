import { Setting } from './SettingTypes';
import { Size } from './UtilTypes';

export interface Output {
  size: Size;
  suggestedAltText?: string;
}

export type GeneratorFunction = (
  settings: { [name: string]: any },
  ctx: CanvasRenderingContext2D
) => Promise<Output>;

export interface Generator {
  generate: GeneratorFunction;
  name: string;
  description: string;
  helpText: string;
  settings: Setting[];
  showImageSelector: boolean;
}
