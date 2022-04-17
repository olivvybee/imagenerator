import { useCallback, useEffect, useRef, useState } from 'react';

import { Dropdown } from '../../components';
import { TextField } from '../../components/TextField/TextField';
import { clamp } from '../../utils/clamp';
import { drawImage } from '../../utils/drawImage';
import { randomInt } from '../../utils/randomInt';
import { GeneratorMetadata, Renderer } from '../types';

import { FORMATS, CONJUNCTIONS } from './constants';
import styles from './EldenRingGenerator.module.css';

interface Config {
  format1: string;
  format2: string;
  conjunction: string;
  text1: string;
  text2: string;
  appraisals: string;
}

interface Rect {
  x: number;
  y: number;
  width: number;
  height: number;
}

const EldenRingRenderer: Renderer = ({ canvasRef, onUpdate, userImageUrl }) => {
  const config = useRef<Config>({
    format1: FORMATS[0],
    text1: '',
    format2: FORMATS[0],
    text2: '',
    conjunction: CONJUNCTIONS[0],
    appraisals: randomInt(1, 99).toString(),
  });

  const [showSecondLine, setShowSecondLine] = useState(false);

  const regenerate = useCallback(async () => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    await generate(ctx, userImageUrl, config.current);

    onUpdate();
  }, [canvasRef, onUpdate, userImageUrl]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    const messageRect = getMessageRect(!!userImageUrl);

    if (!!userImageUrl) {
      canvasRef.current.width = 1920;
      canvasRef.current.height = 1080;
    } else {
      canvasRef.current.width = messageRect.width;
      canvasRef.current.height = messageRect.height;
    }

    regenerate();
  }, [canvasRef, userImageUrl, regenerate]);

  const createOnChange = (prop: keyof Config) => (value: string) => {
    config.current[prop] = value;
    regenerate();
  };

  const onConjunctionChange = (value: string) => {
    createOnChange('conjunction')(value);
    setShowSecondLine(value !== CONJUNCTIONS[0]);
  };

  return (
    <div className={styles.wrapper}>
      {!userImageUrl && (
        <p className={styles.helpText}>
          Build a standalone message, or choose an image above to use as a
          background.
        </p>
      )}

      <span className={styles.settingName}>First line format</span>
      <Dropdown options={FORMATS} onChange={createOnChange('format1')} />

      <span className={styles.settingName}>First line text</span>
      <TextField
        onChange={createOnChange('text1')}
        autoComplete="off"
        autoCapitalize="off"
      />

      <span className={styles.settingName}>Joining phrase</span>
      <Dropdown options={CONJUNCTIONS} onChange={onConjunctionChange} />

      {showSecondLine && (
        <>
          <span className={styles.settingName}>Second line format</span>
          <Dropdown options={FORMATS} onChange={createOnChange('format2')} />

          <span className={styles.settingName}>Second line text</span>
          <TextField
            onChange={createOnChange('text2')}
            autoComplete="off"
            autoCapitalize="off"
          />
        </>
      )}

      <span className={styles.settingName}>Appraisals</span>
      <TextField
        onChange={createOnChange('appraisals')}
        defaultValue={config.current.appraisals}
        type="number"
        min={0}
        max={999}
        autoComplete="off"
      />
    </div>
  );
};

const generate = async (
  ctx: CanvasRenderingContext2D,
  imageUrl: string | undefined,
  config: Config
) => {
  const garamond = new FontFace(
    'Garamond',
    'url("/fonts/eb-garamond-v24-latin-regular.woff2")'
  );
  await garamond.load();
  document.fonts.add(garamond);

  if (imageUrl) {
    const image = new Image();
    await new Promise((resolve) => {
      image.onload = resolve;
      image.src = imageUrl;
    });
    resize(ctx, image);
  }

  const messageRect = getMessageRect(!!imageUrl);

  drawBackground(ctx, messageRect);
  drawBorders(ctx, messageRect);
  drawButtons(ctx, messageRect);
  await drawIcon(ctx, messageRect);
  drawAppraisals(ctx, config.appraisals, messageRect);
  drawText(ctx, config, messageRect);
};

const resize = (ctx: CanvasRenderingContext2D, image: HTMLImageElement) => {
  const { width, height } = image;

  let newWidth = width;
  let newHeight = height;
  let x = 0;
  let y = 0;

  if (width / height >= 16 / 9) {
    newWidth = (height / 9) * 16;
    x = (width - newWidth) / 2;
  } else {
    newHeight = (width / 16) * 9;
    y = (height - newHeight) / 2;
  }

  ctx.drawImage(image, x, y, newWidth, newHeight, 0, 0, 1920, 1080);
};

const getMessageRect = (hasImage: boolean): Rect => {
  if (hasImage) {
    return {
      x: 535,
      y: 133,
      width: 850,
      height: 190,
    };
  } else {
    return {
      x: 0,
      y: 0,
      width: 850,
      height: 190,
    };
  }
};

const drawBackground = (ctx: CanvasRenderingContext2D, messageRect: Rect) => {
  const { x, y, width, height } = messageRect;

  const gradient = ctx.createLinearGradient(x, 0, x + width, 0);
  gradient.addColorStop(0, 'rgba(21, 20, 16, 0)');
  gradient.addColorStop(0.05, 'rgba(21, 20, 16, 0.9)');
  gradient.addColorStop(0.2, 'rgba(21, 20, 16, 0.97)');
  gradient.addColorStop(0.8, 'rgba(21, 20, 16, 0.97)');
  gradient.addColorStop(0.95, 'rgba(21, 20, 16, 0.9)');
  gradient.addColorStop(1, 'rgba(21, 20, 16, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, height);
};

const drawBorders = (ctx: CanvasRenderingContext2D, messageRect: Rect) => {
  const { x, y, width, height } = messageRect;

  const gradient = ctx.createLinearGradient(x, 0, x + width, 0);
  gradient.addColorStop(0, 'rgba(143, 141, 123, 0)');
  gradient.addColorStop(0.05, 'rgba(143, 141, 123, 0.8)');
  gradient.addColorStop(0.2, 'rgba(143, 141, 123, 0.95)');
  gradient.addColorStop(0.8, 'rgba(143, 141, 123, 0.95)');
  gradient.addColorStop(0.95, 'rgba(143, 141, 123, 0.8)');
  gradient.addColorStop(1, 'rgba(143, 141, 123, 0)');

  ctx.fillStyle = gradient;
  ctx.fillRect(x, y, width, 4);
  ctx.fillRect(x, y + 145, width, 2);
  ctx.fillRect(x, y + height - 4, width, 4);
};

const drawButtons = (ctx: CanvasRenderingContext2D, messageRect: Rect) => {
  const { x, y, height } = messageRect;

  let centerX = x + 295;
  let centerY = y + height - 23;

  // Y button
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(179, 175, 96)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX, centerY);
  ctx.lineTo(centerX, centerY + 5);
  ctx.moveTo(centerX, centerY + 1);
  ctx.lineTo(centerX - 4, centerY - 4);
  ctx.moveTo(centerX, centerY + 1);
  ctx.lineTo(centerX + 4, centerY - 4);
  ctx.stroke();

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Close', centerX + 16, centerY);

  // Select button
  centerX = x + 393;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.strokeRect(centerX - 6, centerY - 5, 8, 6);
  ctx.fillRect(centerX - 2, centerY - 1, 8, 6);
  ctx.strokeRect(centerX - 2, centerY - 1, 8, 6);

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Good', centerX + 16, centerY);

  // Start button
  centerX = x + 492;
  ctx.lineWidth = 2;
  ctx.strokeStyle = 'rgb(200, 200, 200)';
  ctx.fillStyle = 'rgb(15, 8, 0)';
  ctx.beginPath();
  ctx.arc(centerX, centerY, 12, 0, 2 * Math.PI);
  ctx.fill();
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(centerX - 5, centerY - 4);
  ctx.lineTo(centerX + 5, centerY - 4);
  ctx.moveTo(centerX - 5, centerY);
  ctx.lineTo(centerX + 5, centerY);
  ctx.moveTo(centerX - 5, centerY + 4);
  ctx.lineTo(centerX + 5, centerY + 4);
  ctx.stroke();

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'middle';
  ctx.fillText(':Poor', centerX + 16, centerY);
};

const drawIcon = async (ctx: CanvasRenderingContext2D, messageRect: Rect) => {
  const { x, y } = messageRect;
  await drawImage(ctx, '/assets/elden-ring-icon.png', { x: x + 56, y: y + 60 });
};

const drawAppraisals = (
  ctx: CanvasRenderingContext2D,
  appraisals: string,
  messageRect: Rect
) => {
  let count = parseInt(appraisals);

  if (isNaN(count)) {
    count = 0;
  } else {
    count = clamp(count, 0, 999);
  }

  const { x, y, width } = messageRect;

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'bottom';
  ctx.fillText('Appraisals', x + 610, y + 140);
  ctx.textAlign = 'right';
  ctx.fillText(count.toString(), x + width - 90, y + 140);
  ctx.textAlign = 'left';
};

const drawText = (
  ctx: CanvasRenderingContext2D,
  config: Config,
  messageRect: Rect
) => {
  const { x, y } = messageRect;

  const text1 = config.format1.replaceAll('***', config.text1 || '***');
  const text2 = config.format2.replaceAll('***', config.text2 || '***');

  const text =
    config.conjunction === CONJUNCTIONS[0]
      ? text1
      : text1 + config.conjunction + ' ' + text2;

  ctx.fillStyle = 'white';
  ctx.font = '24px Garamond';
  ctx.textBaseline = 'top';

  const [line1, line2] = text.split('\n');

  if (line2) {
    ctx.fillText(line1.trim(), x + 165, y + 35);
    ctx.fillText(line2.trim(), x + 165, y + 75);
  } else {
    ctx.fillText(line1.trim(), x + 165, y + 55);
  }
};

export const EldenRingGenerator: GeneratorMetadata = {
  route: '/try-fingers',
  name: 'Try Fingers, But Hole',
  description: 'Create your own Elden Ring messages.',
  allowsCustomImage: true,
  Renderer: EldenRingRenderer,
};
