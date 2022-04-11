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

  getSuggestedAltText: (config) => {
    const roseText = config.roseLabel
      ? `, with text on top that says "${config.roseLabel}".`
      : '.';

    const tuxedoMaskText = config.tuxedoMaskLabel
      ? `, with text on top that says "${config.tuxedoMaskLabel}".`
      : '.';

    const sailorMoonText = config.sailorMoonLabel
      ? `, with text on top that says "${config.sailorMoonLabel}".`
      : '.';

    return (
      'Four panels with screenshots from the Sailor Moon anime.' +
      ' The first shows a rose sticking out of the ground on a pink and purple background' +
      roseText +
      ' The second shows Tuxedo Mask' +
      tuxedoMaskText +
      ' There is a text box at the bottom of the second panel that says "My job here is done".' +
      ' The third panel shows Sailor Moon looking up at Tuxedo Mask' +
      sailorMoonText +
      ' There is a text box that says "But you didn\'t do anything".' +
      ' The final panel shows Tuxedo Mask sweeping his cape as he turns to leave.'
    );
  },

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
