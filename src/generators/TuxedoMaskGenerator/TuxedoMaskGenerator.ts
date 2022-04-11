import { drawText } from '../../utils/drawText';
import { Generator } from '../types';
import { TuxedoMaskConfigurator } from './TuxedoMaskConfigurator';
import { TuxedoMaskConfig } from './types';

export const TuxedoMaskGenerator: Generator<TuxedoMaskConfig> = {
  route: '/tuxedo-mask',
  name: 'Tuxedo Mask',

  staticImage: '/assets/tuxedo-mask-blank.png',

  defaultConfig: {
    roseLabel: '',
    tuxedoMaskLabel: '',
    sailorMoonLabel: '',
  },
  Configurator: TuxedoMaskConfigurator,

  getCanvasSize: () => ({ width: 1200, height: 1588 }),

  generate: (image, ctx, config) => {
    ctx.drawImage(image, 0, 0);

    ctx.font = 'bold 48px sans-serif';

    drawText(ctx, 'My job here is done', {
      y: 760,
      padding: 16,
      strokeWidth: 2,
    });
    drawText(ctx, "But you didn't do anything", {
      y: 1155,
      padding: 16,
      strokeWidth: 2,
    });

    if (config.roseLabel) {
      drawText(ctx, config.roseLabel, {
        x: 550,
        y: 240,
        padding: 16,
        strokeWidth: 2,
      });
    }

    if (config.tuxedoMaskLabel) {
      drawText(ctx, config.tuxedoMaskLabel, {
        x: 460,
        y: 580,
        padding: 16,
        strokeWidth: 2,
      });
    }

    if (config.sailorMoonLabel) {
      drawText(ctx, config.sailorMoonLabel, {
        x: 895,
        y: 985,
        padding: 16,
        strokeWidth: 2,
      });
    }
  },
};
