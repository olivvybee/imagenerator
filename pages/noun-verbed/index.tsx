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
import { calculateFontSize } from './calculateFontSize';

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
  const { text = '', colour, image, textPosition } = settings;

  if (!image) {
    return {
      success: false,
    };
  }

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  const loadedImage = await loadImage(image);
  const { width, height } = loadedImage;

  const ratio = width / height;

  const newWidth = width > height ? TARGET_SIZE : TARGET_SIZE * ratio;
  const newHeight = height > width ? TARGET_SIZE : TARGET_SIZE * ratio;

  canvas.width = newWidth;
  canvas.height = newHeight;
  ctx.drawImage(loadedImage, 0, 0, newWidth, newHeight);

  const uppercaseText = text.toUpperCase();
  const x = newWidth / 2;
  const y = (newHeight / 100) * textPosition;
  const maxWidth = newWidth - 64;

  const fontSize = calculateFontSize(uppercaseText, maxWidth, ctx);

  const bannerHeight = fontSize * 2;
  const bannerTop = y - bannerHeight / 2;
  const bannerBottom = y + bannerHeight / 2;

  const gradient = ctx.createLinearGradient(0, bannerTop, 0, bannerBottom);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.2, 'rgba(0, 0, 0, 0.7)');
  gradient.addColorStop(0.8, 'rgba(0, 0, 0, 0.7)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, bannerTop, newWidth, bannerHeight);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = colour.hex;

  ctx.globalAlpha = 0.07;
  for (let i = 1.15; i > 1; i -= 0.01) {
    ctx.font = `${fontSize * i}px 'Optimus Princeps'`;
    ctx.fillText(uppercaseText, x, y);
  }
  ctx.globalAlpha = 1;

  ctx.font = `${fontSize} 'Optimus Princeps'`;
  ctx.fillText(uppercaseText, newWidth / 2, (newHeight / 100) * textPosition);

  return {
    suggestedAltText:
      `{{userImage}} with the text "${uppercaseText}" on top in a ` +
      `${colour.name.toLowerCase()} serif font, to look like a dark souls "you died" screenshot.`,
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
      params: {
        min: 0,
        max: 100,
        presets: [{ name: 'Centre', value: 50 }],
      },
      defaultValue: 50,
    },
  },
};

const NounVerbedGenerator = () => <GeneratorPage generator={generator} />;

export default NounVerbedGenerator;
