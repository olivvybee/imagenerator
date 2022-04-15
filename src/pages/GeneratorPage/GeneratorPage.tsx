import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { faDice, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { Button, ImageSelector } from '../../components';
import { GeneratorMetadata, UpdateOptions } from '../../generators/types';
import useCopyToClipboard from '../../utils/useCopyToClipboard';

import styles from './GeneratorPage.module.css';

interface GeneratorPageProps {
  generator: GeneratorMetadata;
}

export const GeneratorPage: React.FC<GeneratorPageProps> = ({ generator }) => {
  const {
    route,
    name,
    description,
    allowsCustomImage,
    selectRandomImage,
    Renderer,
  } = generator;

  const canvas = useRef<HTMLCanvasElement>(null);
  const resultImage = useRef<HTMLImageElement>(null);
  const altTextElement = useRef<HTMLParagraphElement>(null);
  const altText = useRef<string>('');

  const [userImageUrl, setUserImageUrl] = useState('');
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [hasSuggestedAltText, setHasSuggestedAltText] = useState(false);

  useEffect(() => {
    if (resultImage.current) {
      resultImage.current.src = '';
      resultImage.current.style.opacity = '0';
    }
    setUserImageUrl('');
  }, [generator]);

  const onUpdate = useCallback((options: UpdateOptions = {}) => {
    if (!canvas.current || !resultImage.current) {
      return;
    }

    const updatedUrl = canvas.current.toDataURL('image/png');
    resultImage.current.src = updatedUrl;
    resultImage.current.style.opacity = '1';

    const suggestedAltText = options.suggestedAltText || '';
    altText.current = suggestedAltText;
    if (altTextElement.current) {
      altTextElement.current.innerHTML = suggestedAltText;
    }
    setHasSuggestedAltText(!!suggestedAltText);
  }, []);

  const renderer = useMemo(
    () => (
      <Renderer
        canvasRef={canvas}
        onUpdate={onUpdate}
        userImageUrl={userImageUrl}
      />
    ),
    [canvas, onUpdate, userImageUrl, Renderer]
  );

  const pageTitle = `${name} - imagenerator`;
  const pageUrl = `https://imagenerator.net${route}`;

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta property="og:title" content={pageTitle} />
        <meta name="twitter:title" content={pageTitle} />

        <meta name="description" content={description} />
        <meta property="og:description" content={description} />
        <meta name="twitter:description" content={description} />

        <meta name="canonical" content={pageUrl} />
        <meta property="og:url" content={pageUrl} />
        <meta name="twitter:url" content={pageUrl} />
      </Helmet>
      <div>
        {allowsCustomImage && (
          <div className={styles.fileInputs}>
            <ImageSelector
              selectedUrl={userImageUrl}
              setSelectedUrl={setUserImageUrl}
            />
            {selectRandomImage && (
              <>
                <div className={styles.fileInputsSpacer} />
                <Button
                  className={styles.randomButton}
                  icon={faDice}
                  onClick={() => setUserImageUrl(selectRandomImage())}>
                  Use random image
                </Button>
              </>
            )}
          </div>
        )}

        <div className={styles.generator}>
          <img
            ref={resultImage}
            className={classNames(styles.result)}
            style={{ opacity: 0 }}
            src=""
            alt=""
          />

          <div className={styles.spacer} />

          <div className={styles.sidebar}>
            <div className={styles.configurator}>
              <span className={styles.configuratorTitle}>Settings</span>
              {renderer}
            </div>
          </div>
        </div>

        <div
          className={classNames(styles.altText, {
            [styles.visibleAltText]: hasSuggestedAltText,
          })}>
          <div className={styles.altTextTitleWrapper}>
            <div className={styles.altTextTitle}>Suggested alt text</div>
            <Button
              onClick={() => copyToClipboard(altText.current)}
              small={true}
              icon={!!copiedText ? faCheck : faCopy}>
              {!!copiedText ? 'Copied' : 'Copy'}
            </Button>
          </div>
          <p ref={altTextElement}></p>
        </div>

        <canvas className={styles.canvas} ref={canvas} />
      </div>
    </>
  );
};
