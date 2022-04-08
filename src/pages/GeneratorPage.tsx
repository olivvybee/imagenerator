import { useState, useEffect, useRef } from 'react';
import { Generator } from '../generators/types';

interface GeneratorPageProps {
  generator: Generator<any>;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ generator }) => {
  const [config, setConfig] = useState<object>(generator.defaultConfig);

  return (
    <div>
      <div>{generator.name} generator</div>
      <generator.Configurator config={config} setConfig={setConfig} />
    </div>
  );
};
