import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import {
  IoCropOutline,
  IoFolderOutline,
  IoImage,
  IoSwapHorizontalOutline,
  IoTrashOutline,
} from 'react-icons/io5';

import { Image } from '../../types/Image';
import { Button } from '../Button';
import { Expander } from '../Expander';
import { ImageCrop } from '../ImageCrop';

import styles from './ImageField.module.css';

interface ImageFieldProps {
  value: Image;
  onChange: (value: Image | undefined) => void;
  allowCrop?: boolean;
  cropAspectRatio?: number;
  cropMinWidth?: number;
  cropMinHeight?: number;
}

export const ImageField = ({
  value = {},
  onChange,
  allowCrop,
  cropAspectRatio,
  cropMinWidth,
  cropMinHeight,
}: ImageFieldProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      onChange({ src: url });
    },
    [onChange]
  );

  const clearImage = useCallback(() => {
    onChange(undefined);
  }, [onChange]);

  const { getRootProps, getInputProps, open } = useDropzone({
    onDrop,
    accept: {
      'image/png': ['.png'],
      'image/jpg': ['.jpg', '.jpeg'],
    },
    multiple: false,
    noClick: true,
  });

  return (
    <Expander
      renderTrigger={(toggle) => (
        <div {...getRootProps()} className={styles.dropzone}>
          <input {...getInputProps()} />
          <div className={styles.preview} onClick={open}>
            {value.src ? (
              <img className={styles.previewImage} src={value.src} alt="" />
            ) : (
              <IoImage width={48} height={48} />
            )}
          </div>
          <Button
            className={styles.button}
            onClick={open}
            icon={value.src ? IoSwapHorizontalOutline : IoFolderOutline}>
            <span>{value.src ? 'Replace' : 'Choose an image'}</span>
          </Button>
          {!!value.src && (
            <Button
              className={styles.clearButton}
              onClick={clearImage}
              icon={IoTrashOutline}
            />
          )}
          {allowCrop && !!value.src && (
            <Button
              className={styles.clearButton}
              onClick={toggle}
              icon={IoCropOutline}
            />
          )}
        </div>
      )}>
      {allowCrop && !!value.src && (
        <div className={styles.cropWrapper}>
          <ImageCrop
            image={value.src}
            aspectRatio={cropAspectRatio}
            minWidth={cropMinWidth}
            minHeight={cropMinHeight}
            onSave={(crop) => onChange({ ...value, crop })}
          />
        </div>
      )}
    </Expander>
  );
};
