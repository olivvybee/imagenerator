import { Colour } from '../../types/Colour';

export const CANVAS_WIDTH = 800;
export const CANVAS_HEIGHT = 800;

export const FONT_NAME = 'DynaPuff';
export const TARGET_FONT_SIZE = 200;

export const COLOURS: Colour[] = [
  { name: 'Green', hex: '#7bada1' },
  { name: 'Pink', hex: '#eb8eac' },
  { name: 'Blue', hex: '#5686e1' },
  { name: 'Purple', hex: '#cf91c5' },
  { name: 'Orange', hex: '#f39200' },
  { name: 'Red', hex: '#cb3832' },
];

export enum Decoration {
  None = 'None',
  Underline = 'Underline',
  Hat = 'Hat',
}
