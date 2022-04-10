import { Generator } from '../types';

import { BlackAndWhiteConfigurator } from './BlackAndWhiteConfigurator';
import { BlackAndWhiteConfig } from './types';

export const BlackAndWhiteGenerator: Generator<BlackAndWhiteConfig> = {
  route: '/bw',
  name: 'Black and white',
  Configurator: BlackAndWhiteConfigurator,

  defaultConfig: {
    percentage: 50,
  },

  getCanvasSize: (image) => ({ width: image.width, height: image.height }),

  selectRandomUrl: () => `${process.env.PUBLIC_URL}/logo512.png`,

  generate: (image, ctx, config) => {
    ctx.filter = `grayscale(${config.percentage / 100})`;
    ctx.drawImage(image, 0, 0);
  },
};
