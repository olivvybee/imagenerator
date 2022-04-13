import { Generator, GeneratorMetadata } from './types';

import { BlackAndWhiteGenerator } from './BlackAndWhiteGenerator/BlackAndWhiteGenerator';
import { TuxedoMaskGenerator } from './TuxedoMaskGenerator/TuxedoMaskGenerator';
import { GBCGenerator } from './GBCGenerator/GBCGenerator';

export const oldGenerators: Generator<any>[] = [BlackAndWhiteGenerator];

export const generators: GeneratorMetadata[] = [
  TuxedoMaskGenerator,
  GBCGenerator,
];
