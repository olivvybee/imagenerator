import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import buttonStyles from '../Button/Button.module.css';

import styles from './ImageSelector.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface ImageSelectorProps {
  selectedUrl: string | undefined;
  setSelectedUrl: (url: string) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  selectedUrl,
  setSelectedUrl,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      setSelectedUrl(url);
    },
    [setSelectedUrl]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={classNames(styles.dropzone, buttonStyles.button)}>
      <input {...getInputProps()} />
      {!!selectedUrl ? (
        <>
          <img className={styles.preview} src={selectedUrl} alt="" />
          <span>Change image</span>
        </>
      ) : (
        <>
          <div className={buttonStyles.iconWrapper}>
            <FontAwesomeIcon icon={faImage} size="2x" />
          </div>
          <span>Choose an image</span>
        </>
      )}
    </div>
  );
};
