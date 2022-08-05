import { useCallback, useEffect, useRef } from 'react';
import { Dropdown, Slider } from '../../components';

import { TextField } from '../../components/TextField/TextField';
import { loadFont } from '../../utils/loadFont';
import { loadImage } from '../../utils/loadImage';
import { LegacyGenerator, Renderer } from '../types';

import {
  COLOUR_MAP,
  DEFAULT_FONT_SIZE,
  DEFAULT_VERTICAL_POSITION,
  MAX_SIZE,
} from './constants';

import styles from './NounVerbedGenerator.module.css';

interface Rect {
  width: number;
  height: number;
}

type ColourName = keyof typeof COLOUR_MAP;

interface Config {
  text: string;
  colour: string;
  fontSize: number;
  verticalPosition: number;
}

const NounVerbedRenderer: Renderer = ({
  canvasRef,
  onUpdate,
  userImageUrl,
}) => {
  const config = useRef<Config>({
    text: '',
    colour: COLOUR_MAP.Red,
    fontSize: DEFAULT_FONT_SIZE,
    verticalPosition: DEFAULT_VERTICAL_POSITION,
  });

  const regenerate = useCallback(async () => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    if (userImageUrl) {
      console.log(config.current);
      await generate(ctx, userImageUrl, config.current);
    }

    onUpdate();
  }, [canvasRef, onUpdate, userImageUrl]);

  useEffect(() => {
    regenerate();
  }, [userImageUrl, regenerate]);

  const onTextChange = (value: string) => {
    config.current.text = value;
    regenerate();
  };

  const onColourChange = (value: string) => {
    config.current.colour = COLOUR_MAP[value as ColourName];
    regenerate();
  };

  const onFontSizeChange = (value: number) => {
    config.current.fontSize = value;
    regenerate();
  };

  const onVerticalPositionChange = (value: number) => {
    config.current.verticalPosition = value / 100;
    regenerate();
  };

  if (!userImageUrl) {
    return (
      <div className={styles.wrapper}>
        <p className={styles.helpText}>Choose an image to get started.</p>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <span className={styles.settingName}>Text</span>
      <TextField
        onChange={onTextChange}
        autoComplete="off"
        autoCapitalize="off"
      />

      <span className={styles.settingName}>Colour</span>
      <Dropdown options={Object.keys(COLOUR_MAP)} onChange={onColourChange} />

      <span className={styles.settingName}>Font size</span>
      <Slider
        onChange={onFontSizeChange}
        min={32}
        max={128}
        defaultValue={DEFAULT_FONT_SIZE}
      />

      <span className={styles.settingName}>Vertical position</span>
      <Slider
        onChange={onVerticalPositionChange}
        min={0}
        max={100}
        defaultValue={DEFAULT_VERTICAL_POSITION * 100}
      />
    </div>
  );
};

const generate = async (
  ctx: CanvasRenderingContext2D,
  imageUrl: string,
  config: Config
) => {
  const [image] = await Promise.all([
    loadImage(imageUrl),
    loadFont('Optimus Princeps', '/fonts/OptimusPrincepsSemiBold.woff2'),
  ]);

  const size = resize(ctx, image);

  ctx.drawImage(image, 0, 0, size.width, size.height);

  if (config.text) {
    drawBanner(ctx, config.fontSize, config.verticalPosition);
    drawText(
      ctx,
      config.text,
      config.colour,
      config.fontSize,
      config.verticalPosition,
      size
    );
  }
};

const resize = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
  let newWidth, newHeight;

  const { width, height } = image;

  const ratio = width / height;

  if (ratio >= 1) {
    newWidth = MAX_SIZE;
    newHeight = MAX_SIZE / ratio;
  } else {
    newHeight = MAX_SIZE;
    newWidth = MAX_SIZE * ratio;
  }

  ctx.canvas.width = newWidth;
  ctx.canvas.height = newHeight;
  ctx.clearRect(0, 0, newWidth, newHeight);

  return { width: newWidth, height: newHeight };
};

const drawBanner = (
  ctx: CanvasRenderingContext2D,
  fontSize: number,
  verticalPosition: number
) => {
  const canvasHeight = ctx.canvas.height;
  const height = fontSize * 2;

  const top = canvasHeight * verticalPosition - height / 2;
  const bottom = canvasHeight * verticalPosition + height / 2;

  console.log({ fontSize, canvasHeight, height, top, bottom });

  const gradient = ctx.createLinearGradient(0, top, 0, bottom);
  gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
  gradient.addColorStop(0.3, 'rgba(0, 0, 0, 0.6)');
  gradient.addColorStop(0.7, 'rgba(0, 0, 0, 0.6)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(0, top, ctx.canvas.width, height);
};

const drawText = (
  ctx: CanvasRenderingContext2D,
  text: string,
  colour: string,
  fontSize: number,
  verticalPosition: number,
  size: Rect
) => {
  const x = size.width / 2;
  const y = size.height * verticalPosition;

  const outputText = text.trim().toUpperCase();

  ctx.textBaseline = 'middle';
  ctx.textAlign = 'center';

  for (let i = 1.15; i > 1; i -= 0.01) {
    ctx.font = `${fontSize * i}px 'Optimus Princeps'`;
    ctx.fillStyle = `rgba(${colour}, 0.07)`;
    ctx.fillText(outputText, x, y);
  }

  ctx.font = `${fontSize}px 'Optimus Princeps'`;

  ctx.fillStyle = `rgba(0, 0, 0, 0.6)`;
  ctx.fillText(outputText, x + 2, y + 2);

  ctx.fillStyle = `rgba(${colour}, 0.9)`;
  ctx.fillText(outputText, x, y);
};

export const NounVerbedGenerator: LegacyGenerator = {
  route: '/noun-verbed',
  name: 'Noun Verbed',
  description: 'MEME GENERATED',
  allowsCustomImage: true,
  Renderer: NounVerbedRenderer,
};
