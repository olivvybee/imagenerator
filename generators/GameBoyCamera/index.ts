import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';

import { GameBoyCameraSettings } from './types';
import { generate } from './generate';
import { ASPECT_RATIOS, PALETTES } from './constants';
import { getAspectRatio } from './getDimensions';
import { renderPaletteLabel } from './renderPaletteLabel';

export const gameboyCameraGenerator: Generator<GameBoyCameraSettings> = {
  generate,
  name: 'Game Boy Camera',
  description: 'Make any image look like it was taken with a Gameboy Camera.',
  helpText:
    'Choose an image, then set the aspect ratio, brightness, contrast, and colour palette to adjust the result.',
  settings: {
    image: {
      type: SettingType.Image,
      name: 'Image',
      params: {
        allowCrop: true,
        cropAspectRatio: getAspectRatio,
        cropMinWidth: 128,
        cropMinHeight: 128,
      },
    },
    aspectRatio: {
      type: SettingType.Stepper,
      name: 'Aspect ratio',
      defaultValue: ASPECT_RATIOS[0],
      params: {
        options: ASPECT_RATIOS,
        allowWrapping: false,
      },
    },
    horizontal: {
      type: SettingType.Boolean,
      name: 'Horizontal',
      defaultValue: false,
      params: {},
      when: (settings) => settings.aspectRatio !== '1:1',
    },
    brightness: {
      type: SettingType.Stepper,
      name: 'Brightness',
      defaultValue: 3,
      params: {
        options: [0, 1, 2, 3, 4, 5, 6],
        allowWrapping: false,
      },
    },
    contrast: {
      type: SettingType.Stepper,
      name: 'Contrast',
      defaultValue: 3,
      params: {
        options: [0, 1, 2, 3, 4, 5, 6],
        allowWrapping: false,
      },
    },
    palette: {
      type: SettingType.Stepper,
      name: 'Colour palette',
      defaultValue: PALETTES[0],
      params: {
        options: PALETTES,
        allowWrapping: true,
        renderLabel: renderPaletteLabel,
      },
    },
  },
};
