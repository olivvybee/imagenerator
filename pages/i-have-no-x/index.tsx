import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import { SettingType, TextSetting } from '../../types/SettingTypes';
import { GeneratorPage } from '../../components/GeneratorPage';

import { loadImage } from '../../utils/loadImage';
import { constrainFontSize } from '../../utils/constrainFontSize';

type IHaveNoXSettings = {
  x: TextSetting;
  y: TextSetting;
};

type IHaveNoXCache = {
  font: FontFace;
  background: HTMLImageElement;
};

const TEXT_CENTER = 650;

const generate: GeneratorFunction<IHaveNoXSettings, IHaveNoXCache> = async (
  canvas,
  settings,
  cache
) => {
  const background =
    cache?.background || (await loadImage('/assets/i-have-no-mouth.jpg'));
  const font =
    cache?.font || new FontFace('Harlan', 'url("/fonts/harlan.woff2")');

  await font.load();
  document.fonts.add(font);

  const { x, y } = settings;

  canvas.width = 900;
  canvas.height = 450;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  ctx.drawImage(background, 0, 0);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '56px Harlan';
  ctx.fillStyle = 'white';
  ctx.fillText("HARLAN ELLISON'S", TEXT_CENTER, 38);

  ctx.font = '94px Harlan';
  ctx.fillText('I HAVE NO', TEXT_CENTER, 120);
  ctx.fillText('AND I MUST', TEXT_CENTER, 300);

  if (x) {
    const line2 = x.toUpperCase();
    constrainFontSize(ctx, line2, {
      x: TEXT_CENTER,
      y: 210,
      font: 'Harlan',
      targetSize: 94,
      maxWidth: 480,
    });
  }

  if (y) {
    const line4 = y.toUpperCase();
    constrainFontSize(ctx, line4, {
      x: TEXT_CENTER,
      y: 390,
      font: 'Harlan',
      targetSize: 94,
      maxWidth: 480,
    });
  }

  const capitalisedX = x ? x.charAt(0).toUpperCase() + x.slice(1) : '';
  const capitalisedY = y ? y.charAt(0).toUpperCase() + y.slice(1) : '';

  const suggestedAltText =
    "A square containing a drawing of a man's face with lines covering the mouth and a glitched effect on the right side of the face. " +
    'There are silver tracks extending from all around the square making it look like a computer chip. ' +
    `On the right of the square is the text "Harlan Ellison's I Have No ${capitalisedX} and I Must ${capitalisedY}".`;

  return {
    suggestedAltText,
    cache: {
      background,
      font,
    },
  };
};

export const generator: Generator<IHaveNoXSettings> = {
  generate,
  name: 'I have no X and I must Y',
  description:
    'Create the lesser known sequels to I Have No Mouth and I Must Scream.',
  helpText: 'Enter two words or phrases to create an image.',
  settings: {
    x: {
      name: 'X',
      type: SettingType.Text,
      params: {},
    },
    y: {
      name: 'Y',
      type: SettingType.Text,
      params: {},
    },
  },
};

const IHaveNoXGenerator = () => <GeneratorPage generator={generator} />;

export default IHaveNoXGenerator;
