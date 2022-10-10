import { Settings, SettingValues } from './SettingTypes';

export interface Output<C extends any = any> {
  success?: boolean;
  suggestedAltText?: string;
  cache?: C;
}

export type GeneratorFunction<S extends Settings, C extends any = any> = (
  canvas: HTMLCanvasElement,
  settings: SettingValues<S>,
  cache?: C
) => Promise<Output<C>>;

export type Generator<S extends Settings = Settings, C extends any = any> = {
  generate: GeneratorFunction<S, C>;
  name: string;
  description: string;
  helpText: string;
  settings: S;
};
