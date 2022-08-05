import { useCallback, useReducer, useRef } from 'react';

import { Configurator } from '../../components';
import { Generator } from '../../types/GeneratorTypes';
import { Setting } from '../../types/SettingTypes';

import styles from './GeneratorPage.module.css';

interface GeneratorPageProps {
  generator: Generator;
}

interface GeneratorState {
  values: {
    [name: string]: any;
  };
  loading: boolean;
}

type GeneratorAction =
  | { type: 'set'; name: string; value: any }
  | { type: 'reset'; settings: Setting[] };

const init = (settings: Setting[]): GeneratorState => {
  const values = settings.reduce(
    (state, setting) => ({
      ...state,
      [setting.name]: setting.defaultValue || undefined,
    }),
    {}
  );

  return {
    values,
    loading: false,
  };
};

const reducer = (state: GeneratorState, action: GeneratorAction) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        values: {
          ...state.values,
          [action.name]: action.value,
        },
      };
    case 'reset':
      return init(action.settings);
    default:
      return state;
  }
};

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ generator }) => {
  const [state, dispatch] = useReducer(reducer, generator.settings, init);

  const canvas = useRef<HTMLCanvasElement>(null);
  const resultImage = useRef<HTMLImageElement>(null);

  const onChange = useCallback(
    (name: string, value: any) => dispatch({ type: 'set', name, value }),
    [dispatch]
  );

  return (
    <div className={styles.pageWrapper}>
      <div className={styles.outputWrapper}>
        <img className={styles.output} ref={resultImage} src="" alt="" />
      </div>

      <Configurator
        generator={generator}
        values={state.values}
        onChange={onChange}
      />

      <canvas className={styles.canvas} ref={canvas} />
    </div>
  );
};
