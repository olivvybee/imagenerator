import { useState, useRef, useMemo, useCallback, useEffect } from 'react';
import { faDice, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import { Button, ImageSelector } from '../../components';
import { LegacyGenerator, UpdateOptions } from '../../legacyGenerators/types';
import useCopyToClipboard from '../../utils/useCopyToClipboard';

import styles from './LegacyGeneratorPage.module.css';

interface GeneratorPageProps {
  generator: LegacyGenerator;
}

export const LegacyGeneratorPage: React.FC<GeneratorPageProps> = ({
  generator,
}) => {
  const { allowsCustomImage, selectRandomImage, Renderer } = generator;

  const canvas = useRef<HTMLCanvasElement>(null);
  const resultImage = useRef<HTMLImageElement>(null);
  const altTextElement = useRef<HTMLParagraphElement>(null);
  const altText = useRef<string>('');

  const [userImageUrl, setUserImageUrl] = useState('');
  const [copiedText, copyToClipboard] = useCopyToClipboard();
  const [hasSuggestedAltText, setHasSuggestedAltText] = useState(false);
  const [useVerticalLayout, setUseVerticalLayout] = useState(false);

  useEffect(() => {
    if (resultImage.current) {
      resultImage.current.src = '';
      resultImage.current.style.opacity = '0';
    }
    setUserImageUrl('');
    setUseVerticalLayout(false);
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

    setUseVerticalLayout(Boolean(options.useVerticalLayout));
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

  return (
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

      <div
        className={classNames(styles.generator, {
          [styles.vertical]: useVerticalLayout,
        })}>
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
  );
};
