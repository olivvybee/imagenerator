import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import { SettingType, TextSetting } from '../../types/SettingTypes';
import { GeneratorPage } from '../../components/GeneratorPage';

import { loadImage } from '../../utils/loadImage';

type IHaveNoXSettings = {
  x: TextSetting;
  y: TextSetting;
};

type IHaveNoXCache = {
  background: HTMLImageElement;
};

const generate: GeneratorFunction<IHaveNoXSettings, IHaveNoXCache> = async (
  canvas,
  settings,
  cache
) => {
  const background =
    cache?.background || (await loadImage('/assets/i-have-no-mouth.jpg'));

  const { x, y } = settings;

  canvas.width = 900;
  canvas.height = 450;

  const ctx = canvas.getContext('2d');

  ctx.drawImage(background, 0, 0);

  const suggestedAltText =
    !!x && !!y && `Harlan Ellison's I Have No ${x} and I Must ${y}`;

  return {
    suggestedAltText,
    cache: {
      background,
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
      params: { placeholder: 'mouth' },
    },
    y: {
      name: 'Y',
      type: SettingType.Text,
      params: { placeholder: 'scream' },
    },
  },
  showImageSelector: false,
};

const IHaveNoXGenerator = () => <GeneratorPage generator={generator} />;

export default IHaveNoXGenerator;
