import { useState, useEffect, useRef } from 'react';
import classNames from 'classnames';

import { ImageSelector } from '../../components';
import { Generator } from '../../generators/types';

import styles from './GeneratorPage.module.css';

interface GeneratorPageProps {
  generator: Generator<any>;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ generator }) => {
  const canvas = useRef<HTMLCanvasElement>(null);

  const [useVerticalLayout, setUseVerticalLayout] = useState(false);
  const [config, setConfig] = useState<object>(generator.defaultConfig);
  const [file, setFile] = useState<File | undefined>();
  const [result, setResult] = useState<string | undefined>();

  useEffect(() => {
    if (!file) {
      return;
    }

    const image = new Image();
    image.onload = () => {
      URL.revokeObjectURL(image.src);

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

    const url = URL.createObjectURL(file);
    image.src = url;
  }, [file, generator, config]);

  const previousFilename = file
    ? file.name.substring(0, file.name.lastIndexOf('.'))
    : 'image';
  const generatorFilename = generator.name.toLowerCase().replaceAll(' ', '-');
  const newFilename = `${previousFilename}-${generatorFilename}.png`;

  return (
    <div>
      <ImageSelector file={file} setFile={setFile} />

      <div
        className={classNames(styles.generator, {
          [styles.vertical]: useVerticalLayout,
        })}>
        {result ? (
          <img className={classNames(styles.result)} src={result} alt="" />
        ) : (
          <div className={styles.placeholder} />
        )}

        <div className={styles.spacer} />

        {!!file && (
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
              <generator.Configurator config={config} setConfig={setConfig} />
            </div>
          </div>
        )}
      </div>

      <canvas className={styles.canvas} ref={canvas} />
    </div>
  );
};
