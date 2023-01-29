import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import {
  SettingType,
  SettingValues,
  TextSetting,
} from '../../types/SettingTypes';
import { GeneratorPage } from '../../components/GeneratorPage';
import { loadImage } from '../../utils/loadImage';
import { drawTextWithBackground } from '../../utils/drawText';
import { loadFont } from '../../utils/loadFont';

type TuxedoMaskSettings = {
  rose: TextSetting;
  tuxedoMask: TextSetting;
  sailorMoon: TextSetting;
};

type TuxedoMaskCache = {
  background: HTMLImageElement;
  font: FontFace;
};

const generate: GeneratorFunction<TuxedoMaskSettings, TuxedoMaskCache> = async (
  canvas,
  settings,
  cache
) => {
  const background =
    cache?.background || (await loadImage('/assets/tuxedo-mask.jpg'));
  const font = cache?.font || (await loadFont());

  const { rose = '', tuxedoMask = '', sailorMoon = '' } = settings;

  canvas.width = background.width;
  canvas.height = background.height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.drawImage(background, 0, 0);

  ctx.font = "48px 'Atkinson Hyperlegible'";

  drawTextWithBackground(ctx, 'My job here is done', {
    y: 765,
    opaque: true,
  });
  drawTextWithBackground(ctx, "But you didn't do anything", {
    y: 1160,
    opaque: true,
  });

  if (rose) {
    drawTextWithBackground(ctx, rose, {
      x: 570,
      y: 240,
    });
  }

  if (tuxedoMask) {
    drawTextWithBackground(ctx, tuxedoMask, {
      x: 460,
      y: 530,
    });
  }

  if (sailorMoon) {
    drawTextWithBackground(ctx, sailorMoon, {
      x: 895,
      y: 935,
    });
  }

  const suggestedAltText = buildAltText(settings);

  return {
    suggestedAltText,
    cache: {
      background,
      font,
    },
  };
};

const buildAltText = (settings: SettingValues<TuxedoMaskSettings>) => {
  const { rose = '', tuxedoMask = '', sailorMoon = '' } = settings;

  const roseText = rose ? `, with a label that says "${rose}".` : '.';

  const tuxedoMaskText = tuxedoMask
    ? `, with a label that says "${tuxedoMask}".`
    : '.';

  const sailorMoonText = sailorMoon
    ? `, with a label that says "${sailorMoon}".`
    : '.';

  return (
    'Four panels with screenshots from the Sailor Moon anime.' +
    ' The first shows a rose sticking out of the ground on a pink and purple background' +
    roseText +
    ' The second shows Tuxedo Mask' +
    tuxedoMaskText +
    ' Text below him says "My job here is done".' +
    ' The third panel shows Sailor Moon looking up at Tuxedo Mask' +
    sailorMoonText +
    ' Text below her says "But you didn\'t do anything".' +
    ' The final panel shows Tuxedo Mask sweeping his cape as he turns to leave.'
  );
};

export const generator: Generator<TuxedoMaskSettings> = {
  generate,
  name: 'Tuxedo Mask',
  description:
    "Make memes about all the things Tuxedo Mask hasn't done recently.",
  helpText:
    'Enter labels for the rose, Tuxedo Mask, and Sailor Moon to create an image.',
  settings: {
    rose: {
      type: SettingType.Text,
      name: 'Rose',
      params: {},
    },
    tuxedoMask: {
      type: SettingType.Text,
      name: 'Tuxedo Mask',
      params: {},
    },
    sailorMoon: {
      type: SettingType.Text,
      name: 'Sailor Moon',
      params: {},
    },
  },
};

const TuxedoMaskGenerator = () => <GeneratorPage generator={generator} />;

export default TuxedoMaskGenerator;
