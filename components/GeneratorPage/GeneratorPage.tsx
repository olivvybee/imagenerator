import { useCallback, useReducer, useRef } from 'react';

import { Settings, SettingValues } from '../../types/SettingTypes';
import { Generator } from '../../types/GeneratorTypes';
import { Configurator } from '../Configurator';

import styles from './GeneratorPage.module.css';

interface GeneratorPageProps {
  generator: Generator<Settings>;
}

interface GeneratorState {
  values: SettingValues<Settings>;
  loading: boolean;
}

type GeneratorAction =
  | { type: 'set'; key: string; value: any }
  | { type: 'reset'; settings: Settings }
  | { type: 'setLoading'; isLoading: boolean };

const init = (settings: Settings): GeneratorState => {
  const values = Object.entries(settings).reduce(
    (state, [key, setting]) => ({
      ...state,
      [key]: setting.defaultValue || undefined,
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
          [action.key]: action.value,
        },
      };
    case 'setLoading':
      return {
        ...state,
        loading: action.isLoading,
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
    (key: string, value: any) => dispatch({ type: 'set', key, value }),
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
