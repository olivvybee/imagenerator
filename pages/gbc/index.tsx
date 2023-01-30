import { GeneratorPage } from '../../components/GeneratorPage';
import { PalettePreview } from '../../components/PalettePreview';
import {
  bayer8,
  BRIGHTNESS_MAP,
  CONTRAST_MAP,
  Palette,
  PALETTES,
} from '../../constants/GameBoyCamera';
import { Generator, GeneratorFunction } from '../../types/GeneratorTypes';
import {
  ImageSetting,
  SettingType,
  StepperSetting,
} from '../../types/SettingTypes';
import { chunkString } from '../../utils/chunkString';
import { clamp } from '../../utils/clamp';
import { loadImage } from '../../utils/loadImage';

type GameBoyCameraSettings = {
  image: ImageSetting;
  brightness: StepperSetting<number>;
  contrast: StepperSetting<number>;
  palette: StepperSetting<Palette>;
};

type GameBoyCameraCache = {
  // image: HTMLImageElement;
};

const OUTPUT_SIZE = 512;

const generate: GeneratorFunction<
  GameBoyCameraSettings,
  GameBoyCameraCache
> = async (canvas, settings, cache) => {
  const image = /*cache?.image ||*/ await loadImage(settings.image);

  if (!image) {
    return {
      success: false,
    };
  }

  const { brightness, contrast, palette } = settings;

  canvas.width = OUTPUT_SIZE;
  canvas.height = OUTPUT_SIZE;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return {
      success: false,
    };
  }

  const pixels = cropToSquare(image, ctx);
  retroify(pixels, BRIGHTNESS_MAP[brightness], CONTRAST_MAP[contrast]);
  recolour(pixels, palette);
  ctx.putImageData(upscale(pixels), 0, 0);

  return {
    success: true,
    suggestedAltText:
      '{{userImage}}. The picture has been edited to look like it was taken with a game boy camera, so it uses a palette of four colours and has a low resolution pixellated effect.',
    cache: {
      image,
    },
  };
};

const cropToSquare = (
  image: HTMLImageElement,
  ctx: CanvasRenderingContext2D
) => {
  const { width, height } = image;

  const size = Math.min(width, height);

  const x = (width - size) / 2;
  const y = (height - size) / 2;

  ctx.drawImage(image, x, y, size, size, 0, 0, 128, 128);
  return ctx.getImageData(0, 0, 128, 128);
};

const retroify = (pixels: ImageData, brightness: number, contrast: number) => {
  const { data, width, height } = pixels;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      // Location in the pixel array for the start of the current pixel
      // Each pixel is represented by 4 values in the array (hence multiplying by 4)
      const i = (x + y * width) * 4;

      // Look up the bayer constant for this pixel
      const bayer = bayer8[y % 8][x % 8];

      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];

      const greyscale = r * 0.3 + g * 0.59 + b * 0.11;

      const withContrast = (greyscale / 255 - 0.5) * contrast + 0.5;
      const withBrightness =
        Math.pow(clamp(withContrast, 0, 1), brightness) * 255;
      const levelled = clamp(withBrightness, 0, 255);

      // Apply the bayer filter
      const filtered = clamp(levelled + (bayer - 32) * 0.75, 0, 255);

      // Quantise to 4 possible values
      // 64 is 256 / 4 so dividing the greyscale values by 64 and rounding
      // gives results in the range 0-3.
      // Multiplying by 64 again spreads the four values out across 0-255.
      const quantised = clamp(Math.round(filtered / 64), 0, 3) * 64;

      const finalValue = quantised;

      data[i] = finalValue;
      data[i + 1] = finalValue;
      data[i + 2] = finalValue;
    }
  }

  return pixels;
};

const recolour = (pixels: ImageData, palette: Palette) => {
  const { data } = pixels;
  const { colours } = palette;

  for (let i = 0; i < data.length; i += 4) {
    const colourIndex = Math.floor(data[i] / 64);

    const hex = colours[colourIndex];
    const [r, g, b] = chunkString(hex.slice(1), 2).map((str) =>
      parseInt(str, 16)
    );

    data[i] = r;
    data[i + 1] = g;
    data[i + 2] = b;
  }

  return pixels;
};

const upscale = (pixels: ImageData) => {
  const oldData = pixels.data;
  const oldSize = pixels.width;

  const newPixels = new ImageData(OUTPUT_SIZE, OUTPUT_SIZE);
  const newData = newPixels.data;

  const scaleFactor = OUTPUT_SIZE / oldSize;

  let newIndex = 0;

  for (let y = 0; y < OUTPUT_SIZE; y++) {
    for (let x = 0; x < OUTPUT_SIZE; x++) {
      const oldX = Math.floor(x / scaleFactor);
      const oldY = Math.floor(y / scaleFactor);

      const oldIndex = (oldX + oldY * oldSize) * 4;

      newData[newIndex] = oldData[oldIndex];
      newData[newIndex + 1] = oldData[oldIndex + 1];
      newData[newIndex + 2] = oldData[oldIndex + 2];
      newData[newIndex + 3] = oldData[oldIndex + 3];

      newIndex += 4;
    }
  }

  return newPixels;
};

const renderPaletteLabel = (value: Palette) => (
  <PalettePreview palette={value} />
);

export const generator: Generator<GameBoyCameraSettings> = {
  generate,
  name: 'Game Boy Camera',
  description: 'Make any image look like it was taken with a Gameboy Camera.',
  helpText:
    'Choose an image, then set the brightness, contrast, and colour palette to adjust the result.',
  settings: {
    image: {
      type: SettingType.Image,
      name: 'Image',
      params: {},
    },
    brightness: {
      type: SettingType.Stepper,
      name: 'Brightness',
      defaultValue: 3,
      params: {
        options: [0, 1, 2, 3, 4, 5, 6],
        allowWrapping: false,
      },
    },
    contrast: {
      type: SettingType.Stepper,
      name: 'Contrast',
      defaultValue: 3,
      params: {
        options: [0, 1, 2, 3, 4, 5, 6],
        allowWrapping: false,
      },
    },
    palette: {
      type: SettingType.Stepper,
      name: 'Colour palette',
      defaultValue: PALETTES[0],
      params: {
        options: PALETTES,
        allowWrapping: true,
        renderLabel: renderPaletteLabel,
      },
    },
  },
};

const GameBoyCameraGenerator = () => <GeneratorPage generator={generator} />;

export default GameBoyCameraGenerator;
