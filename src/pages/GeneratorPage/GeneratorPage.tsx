import { useState, useEffect, useRef } from 'react';

import { ImageSelector } from '../../components';
import { Generator } from '../../generators/types';

import './GeneratorPage.module.css';

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
      <ImageSelector setFile={setFile} />
      <div>{generator.name} generator</div>
      <generator.Configurator config={config} setConfig={setConfig} />
      <canvas ref={canvas} />
      {result && <img src={result} />}
    </div>
  );
};
