import { GeneratorPage } from '../../components/GeneratorPage';
import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import {
  ColourSetting,
  ImageSetting,
  SettingType,
  SliderSetting,
  TextSetting,
} from '../../types/SettingTypes';
import { loadImage } from '../../utils/loadImage';

type NounVerbedSettings = {
  text: TextSetting;
  colour: ColourSetting;
  image: ImageSetting;
  textPosition: SliderSetting;
};

const TARGET_SIZE = 900;

const generate: GeneratorFunction<NounVerbedSettings> = async (
  canvas,
  settings
) => {
  const { text, colour } = settings;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  // const { width, height } = settings.image;
  // const ratio = width / height;

  // const newWidth = width > height ? TARGET_SIZE : TARGET_SIZE * ratio;
  // const newHeight = height > width ? TARGET_SIZE : TARGET_SIZE * ratio;

  // canvas.width = newWidth;
  // canvas.height = newHeight;
  // ctx.drawImage(settings.image, 0, 0, newWidth, newHeight);

  return {
    suggestedAltText:
      `{{userImage}} with the text "${text || ''}" on top in a ` +
      `${colour.name.toLowerCase()} serif font to look like a dark souls screenshot.`,
  };
};

const presets = [
  { name: 'Red', hex: '#e61414' },
  { name: 'Green', hex: '#5ab40a' },
  { name: 'Blue', hex: '#5a96f0' },
  { name: 'Yellow', hex: '#f0f05a' },
  { name: 'White', hex: '#ffffff' },
];

export const generator: Generator<NounVerbedSettings> = {
  generate,
  name: 'Noun verbed',
  description: 'MEME GENERATED',
  helpText:
    'Choose an image and then enter some text to add on top. ' +
    'Use the position slider to move the text up or down if it covers the image too much.',
  settings: {
    image: {
      name: 'Image',
      type: SettingType.Image,
      params: {},
    },
    text: {
      name: 'Text',
      type: SettingType.Text,
      params: {},
    },
    colour: {
      name: 'Text colour',
      type: SettingType.Colour,
      params: {
        presets,
      },
      defaultValue: presets[0],
    },
    textPosition: {
      name: 'Text position',
      type: SettingType.Slider,
      params: { min: 0, max: 100 },
      defaultValue: 50,
    },
  },
};

const NounVerbedGenerator = () => <GeneratorPage generator={generator} />;

export default NounVerbedGenerator;
