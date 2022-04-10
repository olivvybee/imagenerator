import { useState, useEffect, useRef } from 'react';
import { faDice } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { Button, ImageSelector } from '../../components';
import { Generator } from '../../generators/types';

import styles from './GeneratorPage.module.css';

interface GeneratorPageProps {
  generator: Generator<any>;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ generator }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const { name, defaultConfig, selectRandomUrl, Configurator } = generator;

  const [useVerticalLayout, setUseVerticalLayout] = useState(false);
  const [config, setConfig] = useState<object>(defaultConfig);
  const [inputUrl, setInputUrl] = useState<string | undefined>();
  const [result, setResult] = useState<string | undefined>();

  // Reset when changing generators
  useEffect(() => {
    setConfig(generator.defaultConfig);
    setInputUrl(undefined);
    setResult(undefined);
  }, [generator]);

  useEffect(() => {
    if (!inputUrl) {
      return;
    }

    const hasMissingConfig = Object.keys(generator.defaultConfig).some(
      (key) => (config as any)[key] === undefined
    );
    if (hasMissingConfig) {
      return;
    }

    const image = new Image();
    image.onload = () => {
      if (!canvas.current) {
        return;
      }

      const { width, height } = generator.getCanvasSize(image);

      canvas.current.width = width;
      canvas.current.height = height;

      setUseVerticalLayout(width / height >= 1.5);

      const ctx = canvas.current.getContext('2d');
      if (!ctx) {
        return;
      }
      ctx.clearRect(0, 0, width, height);

      generator.generate(image, ctx, config);

      const result = canvas.current.toDataURL('image/png');
      setResult(result);
    };

    image.src = inputUrl;
  }, [inputUrl, generator, config]);

  const previousFilename = 'image';
  const generatorFilename = name.toLowerCase().replaceAll(' ', '-');
  const newFilename = `${previousFilename}-${generatorFilename}.png`;

  return (
    <div>
      <div className={styles.fileInputs}>
        <ImageSelector selectedUrl={inputUrl} setSelectedUrl={setInputUrl} />
        {selectRandomUrl && (
          <>
            <div className={styles.fileInputsSpacer} />
            <Button
              className={styles.randomButton}
              icon={faDice}
              onClick={() => setInputUrl(selectRandomUrl())}>
              Use random image
            </Button>
          </>
        )}
      </div>

      <div
        className={classNames(styles.generator, {
          [styles.vertical]: useVerticalLayout,
        })}>
        {inputUrl && result ? (
          <img className={classNames(styles.result)} src={result} alt="" />
        ) : (
          <div className={styles.placeholder} />
        )}

        <div className={styles.spacer} />

        {!!inputUrl && (
          <div className={styles.sidebar}>
            <div className={styles.downloadInstructions}>
              Tap and hold the image to save, or{' '}
              <a href={result} download={newFilename}>
                download it
              </a>
              .
            </div>

            <div className={styles.configurator}>
              <span className={styles.configuratorTitle}>Settings</span>
              <Configurator config={config} setConfig={setConfig} />
            </div>
          </div>
        )}
      </div>

      <canvas className={styles.canvas} ref={canvas} />
    </div>
  );
};
