import { Generator } from './types';
import { BlackAndWhiteGenerator } from './BlackAndWhiteGenerator/BlackAndWhiteGenerator';
import { Retroifier } from './Retroifier/Retroifier';

export const generators: Generator<any>[] = [
  BlackAndWhiteGenerator,
  Retroifier,
];
