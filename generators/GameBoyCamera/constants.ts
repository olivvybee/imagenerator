import { Palette } from './types';

export const TARGET_SIZE = 128;
export const OUTPUT_SIZE = 512;

export const BRIGHTNESS_MAP = [2.5, 2, 1.5, 1, 0.8, 0.6, 0.4];
export const CONTRAST_MAP = [0.6, 0.9, 1.2, 1.5, 1.8, 2.1, 2.4];

// 8 x 8 Bayer constants Matrix
export const bayer8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
];

export const PALETTES: Palette[] = [
  {
    name: 'Greyscale',
    colours: ['#141414', '#545454', '#949494', '#d4d4d4'],
  },
  {
    name: 'Nostalgia',
    colours: ['#405010', '#708028', '#a0a840', '#d0d058'],
    source: 'https://lospec.com/palette-list/nostalgia',
  },
  {
    name: 'Ice Cream',
    colours: ['#7c3f58', '#eb6b6f', '#f9a875', '#fff6d3'],
    source: 'https://lospec.com/palette-list/ice-cream-gb',
  },
  {
    name: 'Dream Candy',
    colours: ['#442d6e', '#d075b7', '#f0d063', '#ffffff'],
    source: 'https://lospec.com/palette-list/dream-candy',
  },
  {
    name: 'Coffee',
    colours: ['#564438', '#9f7369', '#d2bba0', '#f2efc7'],
    source: 'https://lospec.com/palette-list/coffee-gb',
  },
  {
    name: 'Rustic',
    colours: ['#2c2137', '#764462', '#a96868', '#edb4a1'],
    source: 'https://lospec.com/palette-list/rustic-gb',
  },
  {
    name: 'Mist',
    colours: ['#2d1b00', '#1e606e', '#5ab9a8', '#c4f0c2'],
    source: 'https://lospec.com/palette-list/mist-gb',
  },
  {
    name: 'Wish',
    colours: ['#622e4c', '#7550e8', '#608fcf', '#8be5ff'],
    source: 'https://lospec.com/palette-list/wish-gb',
  },
  {
    name: 'Spacehaze',
    colours: ['#0b0630', '#6b1fb1', '#cc3495', '#f8e3c4'],
    source: 'https://lospec.com/palette-list/spacehaze',
  },
  {
    name: 'Pumpkin',
    colours: ['#142b23', '#19692c', '#e06e16', '#f7db7e'],
    source: 'https://lospec.com/palette-list/pumpkin-gb',
  },
  {
    name: 'Hollow',
    colours: ['#0f0f1b', '#565a75', '#c6b7be', '#fafbf6'],
    source: 'https://lospec.com/palette-list/hollow',
  },
  {
    name: 'Coldfire',
    colours: ['#46425e', '#5b768d', '#d17c7c', '#f6c6a8'],
    source: 'https://lospec.com/palette-list/coldfire-gb',
  },
  {
    name: 'Gold',
    colours: ['#210b1b', '#4d222c', '#9d654c', '#cfab51'],
    source: 'https://lospec.com/palette-list/gold-gb',
  },
  {
    name: 'Velvet Cherry',
    colours: ['#2d162c', '#412752', '#683a68', '#9775a6'],
    source: 'https://lospec.com/palette-list/velvet-cherry-gb',
  },
  {
    name: 'Minty Fresh',
    colours: ['#40332f', '#856d52', '#95c798', '#fbffe0'],
    source: 'https://lospec.com/palette-list/minty-fresh',
  },
  {
    name: 'Purple Dawn',
    colours: ['#001b2e', '#2d757e', '#9a7bbc', '#eefded'],
    source: 'https://lospec.com/palette-list/purpledawn',
  },
  {
    name: 'Metallic',
    colours: ['#221e31', '#41485d', '#778e98', '#c5dbd4'],
    source: 'https://lospec.com/palette-list/metallic-gb',
  },
  {
    name: 'Earth',
    colours: ['#774346', '#b87652', '#acb965', '#f5f29e'],
    source: 'https://lospec.com/palette-list/earth-gb',
  },
  {
    name: 'Kirby',
    colours: ['#2c2c96', '#7733e7', '#e78686', '#f7bef7'],
    source: 'https://lospec.com/palette-list/kirby-sgb',
  },
  {
    name: 'Spaghetti & Meatballs',
    colours: ['#141414', '#da7381', '#fbe2a2', '#d4d4d4'],
  },
];
