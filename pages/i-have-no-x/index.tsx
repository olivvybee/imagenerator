import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import { SettingType, TextSetting } from '../../types/SettingTypes';
import { GeneratorPage } from '../../components/GeneratorPage';

type IHaveNoXSettings = {
  x: TextSetting;
  y: TextSetting;
};

const generate: GeneratorFunction<IHaveNoXSettings> = async (settings, ctx) => {
  const { x, y } = settings;

  return {
    size: { width: 0, height: 0 },
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
