import { Generator } from '../types';

import { BlackAndWhiteConfigurator } from './BlackAndWhiteConfigurator';
import { BlackAndWhiteConfig } from './types';

export const BlackAndWhiteGenerator: Generator<BlackAndWhiteConfig> = {
  route: '/bw',
  name: 'Black and white',
  requiresUserImage: true,
  Configurator: BlackAndWhiteConfigurator,

  defaultConfig: {
    percentage: 50,
  },

  getCanvasSize: (image) => ({ ...image }),

  generate: (image, ctx, config) => {
    ctx.filter = `grayscale(${config.percentage})`;
    ctx.drawImage(image, 0, 0);
  },
};
