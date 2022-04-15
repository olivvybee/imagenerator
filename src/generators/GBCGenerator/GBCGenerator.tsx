import { useEffect, useState } from 'react';

import { Stepper } from '../../components';
import { GeneratorMetadata, Renderer } from '../types';
import { clamp } from '../../utils/clamp';

import { Palette } from './types';
import styles from './GBCGenerator.module.css';
import { PALETTES } from './palettes';
import { bayer8, BRIGHTNESS_STEPS, CONTRAST_STEPS } from './constants';
import { chunkString } from './utils';

interface Config {
  brightness: number;
  contrast: number;
  palette: Palette;
}

const GBCRenderer: Renderer = ({ canvasRef, onUpdate, userImageUrl }) => {
  const [brightness, setBrightness] = useState(1);
  const [contrast, setContrast] = useState(1.5);
  const [palette, setPalette] = useState(PALETTES[0]);

  useEffect(() => {
    if (!canvasRef.current || !userImageUrl) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    canvasRef.current.width = 512;
    canvasRef.current.height = 512;

    generate(ctx, userImageUrl, onUpdate, { brightness, contrast, palette });
  }, [userImageUrl, brightness, contrast, palette, canvasRef, onUpdate]);

  return (
    <div className={styles.wrapper}>
      <span className={styles.settingName}>Brightness</span>
      <Stepper
        value={brightness}
        possibleValues={BRIGHTNESS_STEPS}
        onChange={setBrightness}
        allowWrapping={false}
        getLabel={getLabel}
      />

      <span className={styles.settingName}>Contrast</span>
      <Stepper
        value={contrast}
        possibleValues={CONTRAST_STEPS}
        onChange={setContrast}
        allowWrapping={false}
        getLabel={getLabel}
      />

      <span className={styles.settingName}>Colour palette</span>
      <div className={styles.paletteWrapper}>
        <Stepper<Palette>
          value={palette}
          possibleValues={PALETTES}
          onChange={setPalette}
          allowWrapping={true}
          getLabel={getPalettePreview}
        />
        <span>{palette.name}</span>
      </div>
    </div>
  );
};

const generate = async (
  ctx: CanvasRenderingContext2D,
  imageUrl: string,
  onUpdate: () => void,
  config: Config
) => {
  const image = new Image();
  await new Promise((resolve) => {
    image.onload = resolve;
    image.src = imageUrl;
  });

  const pixels = cropToSquare(image, ctx);
  retroify(pixels, config.brightness, config.contrast);
  recolour(pixels, config.palette);

  ctx.putImageData(upscale(pixels, 512), 0, 0);

  onUpdate();
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

const upscale = (pixels: ImageData, targetSize: number) => {
  const oldData = pixels.data;
  const oldSize = pixels.width;

  const newPixels = new ImageData(targetSize, targetSize);
  const newData = newPixels.data;

  const scaleFactor = targetSize / oldSize;

  let newIndex = 0;

  for (let y = 0; y < targetSize; y++) {
    for (let x = 0; x < targetSize; x++) {
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

const getLabel = (_: number, currentIndex: number) => (
  <span className={styles.stepperLabel}>{currentIndex}</span>
);

const getPalettePreview = (palette: Palette) => (
  <div className={styles.palettePreview}>
    {palette.colours.map((colour) => (
      <div
        key={colour}
        className={styles.palettePreviewBlock}
        title={colour}
        style={{ backgroundColor: colour }}
      />
    ))}
  </div>
);

export const GBCGenerator: GeneratorMetadata = {
  route: '/gbc',
  name: 'Gameboy Camera',
  allowsCustomImage: true,
  Renderer: GBCRenderer,
};
