import { GeneratorMetadata } from './types';

import { TuxedoMaskGenerator } from './TuxedoMaskGenerator/TuxedoMaskGenerator';
import { GBCGenerator } from './GBCGenerator/GBCGenerator';

export const generators: GeneratorMetadata[] = [
  TuxedoMaskGenerator,
  GBCGenerator,
];
