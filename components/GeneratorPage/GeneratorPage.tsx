import { useCallback, useReducer, useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import { saveAs } from 'file-saver';
import { IoCopyOutline, IoSaveOutline, IoShareOutline } from 'react-icons/io5';

import { Settings, SettingValues } from '../../types/SettingTypes';
import { Generator } from '../../types/GeneratorTypes';
import { Configurator } from '../Configurator';
import { MetaTags } from '../MetaTags/MetaTags';
import { Button } from '../Button';
import useCopyToClipboard from '../../utils/useCopyToClipboard';

import styles from './GeneratorPage.module.css';
import { useNativeShare } from '../../utils/useNativeShare';
import { createFileFromDataURL } from '../../utils/createFileFromDataUrl';
import { Expander } from '../Expander';
import { AltTextExplanation } from '../AltTextExplanation';

interface GeneratorPageProps {
  generator: Generator<any, any>;
}

type GeneratorAction =
  | { type: 'set'; key: string; value: any }
  | { type: 'reset'; settings: Settings };

const init = (settings: Settings): SettingValues => {
  return Object.entries(settings).reduce(
    (state, [key, setting]) => ({
      ...state,
      [key]: setting.defaultValue || undefined,
    }),
    {}
  );
};

const reducer = (state: SettingValues, action: GeneratorAction) => {
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

  const {
    data: output,
    isSuccess: hasGenerated,
    isFetching: isGenerating,
  } = useQuery(
    ['generate', settingValues],
    async ({ queryKey }) => {
      const canvas = document.createElement('canvas');

      const {
        success = true,
        cache,
        suggestedAltText,
      } = await generator.generate(
        canvas,
        queryKey[1] as SettingValues,
        output?.cache || {}
      );

      const imageData = canvas.toDataURL('image/png');

      return { success, cache, suggestedAltText, imageData };
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

  const [copiedText, copyToClipboard] = useCopyToClipboard();

  const { isSharingSupported, share } = useNativeShare('image/png');
  const shareImage = () => {
    const shareData = {
      file: createFileFromDataURL(output?.imageData, generator.name),
    };
    share({ data: shareData });
  };

  const downloadImage = () =>
    saveAs(output?.imageData, `${generator.name}.png`);

  const imageAltText = output?.suggestedAltText?.replace(
    '{{userImage}}',
    'the image you chose'
  );
  const suggestedAltText = output?.suggestedAltText?.replace(
    '{{userImage}}',
    '[describe your image]'
  );

  return (
    <>
      <MetaTags title={generator.name} description={generator.description} />

      <div className={styles.pageWrapper}>
        <div className={styles.generatorWrapper}>
          {hasGenerated && output.success ? (
            <img
              className={styles.output}
              ref={resultImage}
              src={output.imageData}
              alt={imageAltText || ''}
            />
          ) : (
            <div className={styles.placeholder} />
          )}

          <div className={styles.spacer} />

          <div className={styles.sidebar}>
            <h1 className={styles.generatorName}>{generator.name}</h1>
            <p className={styles.helpText}>{generator.helpText}</p>

            <div className={styles.shareSection}>
              {isSharingSupported && (
                <Button
                  className={styles.button}
                  icon={IoShareOutline}
                  onClick={shareImage}
                  disabled={!output?.success}>
                  Share result
                </Button>
              )}
              <Button
                className={styles.button}
                icon={IoSaveOutline}
                onClick={downloadImage}
                disabled={!output?.success}>
                Save result
              </Button>
            </div>

            <div className={styles.spacer} />

            <Configurator
              generator={generator}
              values={settingValues}
              onChange={onChange}
              reset={() =>
                dispatch({ type: 'reset', settings: generator.settings })
              }
            />
          </div>
        </div>

        {hasGenerated && output.suggestedAltText && (
          <div className={styles.altTextSection}>
            <div className={styles.altTextTitleWrapper}>
              <div className={styles.altTextTitle}>Suggested alt text</div>
              <Button
                icon={IoCopyOutline}
                onClick={() => copyToClipboard(suggestedAltText)}
                small={true}>
                {!!copiedText ? 'Copied' : 'Copy'}
              </Button>
            </div>
            <p className={styles.altText}>{suggestedAltText}</p>

            <Expander
              className={styles.altTextExpander}
              renderTrigger={(toggle) => (
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    toggle();
                  }}>
                  What is alt text?
                </a>
              )}>
              <AltTextExplanation />
            </Expander>
          </div>
        )}
      </div>
    </>
  );
};
