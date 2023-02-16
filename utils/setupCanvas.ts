import { loadFont } from './loadFont';

type BaseOptions = {
  font?: string;
};

type OptionsWithSize = BaseOptions & {
  width: number;
  height: number;
  backgroundColour?: string;
};

type OptionsWithImage = BaseOptions & {
  backgroundImage: HTMLImageElement;
};

export type SetupCanvasOptions = OptionsWithSize | OptionsWithImage;

const isOptionsWithImage = (
  options: SetupCanvasOptions
): options is OptionsWithImage => {
  const typedOptions = options as OptionsWithImage;
  return !!typedOptions.backgroundImage;
};

export const setupCanvas = async (
  canvas: HTMLCanvasElement,
  options: SetupCanvasOptions
) => {
  const { font } = options;
  await loadFont(font);

  const { width, height } = isOptionsWithImage(options)
    ? options.backgroundImage
    : options;

  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');
  if (!ctx) {
    return undefined;
  }

  if (isOptionsWithImage(options)) {
    ctx.drawImage(options.backgroundImage, 0, 0);
  } else {
    if (options.backgroundColour) {
      ctx.fillStyle = options.backgroundColour;
      ctx.fillRect(0, 0, width, height);
    }
  }

  return ctx;
};
