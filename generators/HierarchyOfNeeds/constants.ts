import { Rect } from '../../types/UtilTypes';

export const WIDTH = 1200;
export const HEIGHT = 900;

export const BACKGROUND_COLOUR = 'white';
export const SEGMENT_COLOURS = [
  '#ceb4fd',
  '#fdb489',
  '#9cc5f1',
  '#fed687',
  '#a8d5ae',
];

export const SEGMENT_MAP = [
  [],
  [0, 0, 0, 0],
  [0, 0, 1, 1],
  [1, 1, 2, 2],
  [1, 1, 2, 3],
  [1, 2, 3, 4],
];

export const TEXT_BOXES: Rect[][] = [
  [],
  [{ x: 205, y: 300, width: 700, height: 500 }],
  [
    { x: 205, y: 150, width: 700, height: 400 },
    { x: 105, y: 600, width: 900, height: 250 },
  ],
  [
    { x: 205, y: 50, width: 700, height: 250 },
    { x: 155, y: 325, width: 800, height: 250 },
    { x: 105, y: 600, width: 900, height: 250 },
  ],
  [
    { x: 205, y: 50, width: 700, height: 250 },
    { x: 155, y: 325, width: 800, height: 250 },
    { x: 105, y: 600, width: 900, height: 125 },
    { x: 55, y: 735, width: 1000, height: 125 },
  ],
  [
    { x: 230, y: 50, width: 650, height: 250 },
    { x: 180, y: 315, width: 750, height: 125 },
    { x: 155, y: 450, width: 800, height: 125 },
    { x: 105, y: 600, width: 900, height: 125 },
    { x: 55, y: 735, width: 1000, height: 125 },
  ],
];
