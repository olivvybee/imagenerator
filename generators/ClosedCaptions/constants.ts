import { MultilineTextOptions, TextAlign } from '../../utils/MultilineText';

export const CANVAS_WIDTH = 1280;
export const CANVAS_HEIGHT = 720;

export const FONT_SIZE = 42;

interface FontSettings extends Partial<MultilineTextOptions> {
  name: string;
  url?: string;
  allCaps?: boolean;
  x?: number;
}

export const FONTS: { [key: string]: FontSettings } = {
  Default: { name: 'Atkinson Hyperlegible' },
  'Apple TV': { name: 'SF Pro Display', url: '/fonts/SF-Pro-Display.woff2' },
  Netflix: { name: 'Netflix Sans', url: '/fonts/Netflix-Sans.woff2' },
  'Prime Video': { name: 'Ember', url: '/fonts/Ember.woff2' },
  VCR: {
    name: 'VCR OSD',
    url: '/fonts/VCR-OSD-Mono.woff2',
    allCaps: true,
    opaqueBackground: true,
    align: 'left',
    backgroundPadding: 4,
    x: 192,
  },
};

export const FONT_OPTIONS = Object.keys(FONTS);

export const POSITIONS = {
  Bottom: { vAlign: 'bottom' },
  Top: { vAlign: 'top' },
};

export const POSITION_OPTIONS = Object.keys(POSITIONS);
