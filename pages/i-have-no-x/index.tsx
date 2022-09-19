import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import { SettingType, TextSetting } from '../../types/SettingTypes';
import { GeneratorPage } from '../../components/GeneratorPage';

type IHaveNoXSettings = {
  x: TextSetting;
  y: TextSetting;
};

const generate: GeneratorFunction<IHaveNoXSettings> = async (
  canvas,
  settings
) => {
  const { x, y } = settings;

  canvas.width = 100;
  canvas.height = 100;

  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#123456';
  ctx.fillRect(0, 0, 100, 100);

  ctx.fillStyle = 'white';
  ctx.fillText(x, 5, 20);
  ctx.fillText(y, 5, 50);

  return {
    size: { width: 100, height: 100 },
    suggestedAltText: `Harlan Ellison's I Have No ${x} and I Must ${y}`,
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
