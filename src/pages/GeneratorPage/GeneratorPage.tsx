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

  return (
    <div>
      <ImageSelector file={file} setFile={setFile} />

      <div className={styles.generator}>
        {result ? (
          <img className={classNames(styles.result)} src={result} />
        ) : (
          <div className={styles.placeholder} />
        )}

        <div className={styles.spacer} />

        {!!file && (
          <div className={styles.configurator}>
            <span className={styles.configuratorTitle}>Settings</span>
            <generator.Configurator config={config} setConfig={setConfig} />
          </div>
        )}
      </div>

      <canvas className={styles.canvas} ref={canvas} />
    </div>
  );
};
