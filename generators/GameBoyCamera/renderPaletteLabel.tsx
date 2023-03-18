import { PalettePreview } from './PalettePreview';
import { Palette } from './types';

export const renderPaletteLabel = (value: Palette) => (
  <PalettePreview palette={value} />
);
