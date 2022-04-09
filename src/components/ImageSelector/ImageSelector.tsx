import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

import buttonStyles from '../Button/Button.module.css';

import styles from './ImageSelector.module.css';

interface ImageSelectorProps {
  file: File | undefined;
  setFile: (file: File) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({
  file,
  setFile,
}) => {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      console.log(acceptedFiles);

      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      setFile(file);
    },
    [setFile]
  );

  useEffect(() => {
    if (!file) {
      setPreviewUrl(undefined);
      return;
    }

    const url = URL.createObjectURL(file);
    setPreviewUrl(url);
  }, [file, setPreviewUrl]);

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  });

  return (
    <div
      {...getRootProps()}
      className={classNames(styles.dropzone, buttonStyles.button)}>
      <input {...getInputProps()} />
      {!!previewUrl ? (
        <>
          <img className={styles.preview} src={previewUrl} alt="" />
          <span>Change image</span>
        </>
      ) : (
        <>
          <div className={styles.iconWrapper}>
            <FontAwesomeIcon icon={faImage} size="2x" />
          </div>
          <span>Choose an image</span>
        </>
      )}
    </div>
  );
};
