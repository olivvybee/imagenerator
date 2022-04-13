import { useCallback, useEffect, useRef } from 'react';

import { TextField } from '../../components/TextField/TextField';
import { drawImage } from '../../utils/drawImage';
import { drawText } from '../../utils/drawText';
import { GeneratorMetadata, Renderer } from '../types';

import styles from './TuxedoMaskGenerator.module.css';

const TuxedoMaskRenderer: Renderer = ({ canvasRef, onUpdate }) => {
  const config = useRef<Config>({
    roseLabel: '',
    tuxedoMaskLabel: '',
    sailorMoonLabel: '',
  });

  const regenerate = useCallback(async () => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    await generate(ctx, config.current);

    const suggestedAltText = buildAltText(config.current);
    onUpdate({ suggestedAltText });
  }, [onUpdate, canvasRef]);

  useEffect(() => {
    if (!canvasRef.current) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) {
      return;
    }

    canvasRef.current.width = 1200;
    canvasRef.current.height = 1588;

    ctx.clearRect(0, 0, 1200, 1588);
    regenerate();
  }, [canvasRef, regenerate]);

  const createOnChange = (prop: keyof Config) => (value: string) => {
    config.current[prop] = value;
    regenerate();
  };

  return (
    <div className={styles.wrapper}>
      <span className={styles.settingName}>Rose</span>
      <TextField onChange={createOnChange('roseLabel')} />

      <span className={styles.settingName}>Tuxedo Mask</span>
      <TextField onChange={createOnChange('tuxedoMaskLabel')} />

      <span className={styles.settingName}>Sailor Moon</span>
      <TextField onChange={createOnChange('sailorMoonLabel')} />
    </div>
  );
};

interface Config {
  roseLabel: string;
  tuxedoMaskLabel: string;
  sailorMoonLabel: string;
}

const generate = async (ctx: CanvasRenderingContext2D, config: Config) => {
  await drawImage(ctx, '/assets/tuxedo-mask-blank.jpg');
  ctx.font = 'bold 48px sans-serif';

  drawText(ctx, 'My job here is done', {
    y: 760,
    padding: 16,
  });
  drawText(ctx, "But you didn't do anything", {
    y: 1155,
    padding: 16,
  });

  if (config.roseLabel) {
    drawText(ctx, config.roseLabel, {
      x: 550,
      y: 240,
      padding: 16,
    });
  }

  if (config.tuxedoMaskLabel) {
    drawText(ctx, config.tuxedoMaskLabel, {
      x: 460,
      y: 580,
      padding: 16,
    });
  }

  if (config.sailorMoonLabel) {
    drawText(ctx, config.sailorMoonLabel, {
      x: 895,
      y: 985,
      padding: 16,
    });
  }
};

const buildAltText = (config: Config) => {
  const roseText = config.roseLabel
    ? `, with text on top that says "${config.roseLabel}".`
    : '.';

  const tuxedoMaskText = config.tuxedoMaskLabel
    ? `, with text on top that says "${config.tuxedoMaskLabel}".`
    : '.';

  const sailorMoonText = config.sailorMoonLabel
    ? `, with text on top that says "${config.sailorMoonLabel}".`
    : '.';

  return (
    'Four panels with screenshots from the Sailor Moon anime.' +
    ' The first shows a rose sticking out of the ground on a pink and purple background' +
    roseText +
    ' The second shows Tuxedo Mask' +
    tuxedoMaskText +
    ' There is a text box at the bottom of the second panel that says "My job here is done".' +
    ' The third panel shows Sailor Moon looking up at Tuxedo Mask' +
    sailorMoonText +
    ' There is a text box that says "But you didn\'t do anything".' +
    ' The final panel shows Tuxedo Mask sweeping his cape as he turns to leave.'
  );
};

export const TuxedoMaskGenerator: GeneratorMetadata = {
  route: '/tuxedo-mask',
  name: 'Tuxedo Mask',
  Renderer: TuxedoMaskRenderer,
  allowsCustomImage: false,
};
