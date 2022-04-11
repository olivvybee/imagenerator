import { Generator } from './types';

import { BlackAndWhiteGenerator } from './BlackAndWhiteGenerator/BlackAndWhiteGenerator';
import { Retroifier } from './Retroifier/Retroifier';
import { TuxedoMaskGenerator } from './TuxedoMaskGenerator/TuxedoMaskGenerator';

export const generators: Generator<any>[] = [
  BlackAndWhiteGenerator,
  Retroifier,
  TuxedoMaskGenerator,
];
