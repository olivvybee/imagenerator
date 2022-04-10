export interface RetroifierConfig {
  brightness: number;
  contrast: number;
  palette: Palette;
}

export interface Palette {
  name: string;
  colours: string[];
  source?: string;
}
