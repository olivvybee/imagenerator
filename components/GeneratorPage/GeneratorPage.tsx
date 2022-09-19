import { useCallback, useEffect, useReducer, useRef } from 'react';
import { useQuery, QueryFunction, QueryKey } from '@tanstack/react-query';

import { Settings, SettingValues } from '../../types/SettingTypes';
import { Generator, Output } from '../../types/GeneratorTypes';
import { Configurator } from '../Configurator';

import styles from './GeneratorPage.module.css';
import { MetaTags } from '../MetaTags/MetaTags';

interface GeneratorPageProps {
  generator: Generator<Settings>;
}

type GeneratorAction =
  | { type: 'set'; key: string; value: any }
  | { type: 'reset'; settings: Settings };

const init = (settings: Settings): SettingValues<Settings> => {
  return Object.entries(settings).reduce(
    (state, [key, setting]) => ({
      ...state,
      [key]: setting.defaultValue || undefined,
    }),
    {}
  );
};

const reducer = (state: SettingValues<Settings>, action: GeneratorAction) => {
  switch (action.type) {
    case 'set':
      return {
        ...state,
        [action.key]: action.value,
      };
    case 'reset':
      return init(action.settings);
    default:
      return state;
  }
};

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ generator }) => {
  const resultImage = useRef<HTMLImageElement>(null);

  const [settingValues, dispatch] = useReducer(
    reducer,
    generator.settings,
    init
  );

  const { data, isLoading, isFetching, isFetched } = useQuery(
    ['generate', settingValues],
    async ({ queryKey }) => {
      const canvas = document.createElement('canvas');

      const { size, suggestedAltText } = await generator.generate(
        canvas,
        queryKey[1] as SettingValues<Settings>
      );

      const imageData = canvas.toDataURL('image/png');

      return { size, suggestedAltText, imageData };
    },
    {
      networkMode: 'always',
      keepPreviousData: true,
      refetchOnWindowFocus: false,
    }
  );

  const onChange = useCallback(
    (key: string, value: any) => {
      dispatch({ type: 'set', key, value });
    },
    [dispatch]
  );

  return (
    <>
      <MetaTags title={generator.name} description={generator.description} />

      <div className={styles.pageWrapper}>
        <div className={styles.outputWrapper}>
          {isFetched && (
            <img
              className={styles.output}
              width={data.size.width}
              height={data.size.height}
              ref={resultImage}
              src={data.imageData}
              alt=""
            />
          )}
        </div>

        <Configurator
          generator={generator}
          values={settingValues}
          onChange={onChange}
        />

        {isFetched && <p>Suggested alt text: "{data.suggestedAltText}"</p>}
      </div>
    </>
  );
};
