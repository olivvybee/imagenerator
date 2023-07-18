import { Generator } from '../../types/GeneratorTypes';
import { SettingType } from '../../types/SettingTypes';
import { generate } from './generate';
import { BoykisserSettings } from './types';

export const boykisserGenerator: Generator<BoykisserSettings> = {
  name: 'Boykisser',
  description: "You like making memes, don't you?",
  helpText:
    'Enter some text to show at the top. You can optionally use your own image to put the boykisser face on.',
  generate,
  settings: {
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {},
    },
    image: {
      name: 'Image',
      type: SettingType.Image,
      params: { allowCrop: true, cropAspectRatio: 1 },
    },
    faceBackground: {
      name: 'Face background',
      type: SettingType.Dropdown,
      params: { options: ['Transparent', 'White'] },
    },
  },
};
