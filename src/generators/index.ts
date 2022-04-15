import { GeneratorMetadata } from './types';

import { EldenRingGenerator } from './EldenRingGenerator/EldenRingGenerator';
import { GBCGenerator } from './GBCGenerator/GBCGenerator';
import { TuxedoMaskGenerator } from './TuxedoMaskGenerator/TuxedoMaskGenerator';

export const generators: GeneratorMetadata[] = [
  EldenRingGenerator,
  GBCGenerator,
  TuxedoMaskGenerator,
];
