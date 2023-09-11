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
import { TextField } from '../TextField';

import styles from './ImageField.module.css';

interface ImageFieldProps {
  value: Image;
  onChange: (value: Image | undefined) => void;
  id: string;
  name: string;
  allowCrop?: boolean;
  cropAspectRatio?: number;
  cropMinWidth?: number;
  cropMinHeight?: number;
}

export const PLACEHOLDER_DESCRIPTION = '{{userImage}}';

export const ImageField = ({
  value = { description: PLACEHOLDER_DESCRIPTION },
  onChange,
  id,
  name,
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
      onChange({ src: url, description: PLACEHOLDER_DESCRIPTION });
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
    <div className={styles.wrapper}>
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
      <div className={styles.descriptionWrapper}>
        <label htmlFor={`${id}-description`}>{name} description</label>
        <TextField
          id={`${id}-description`}
          className={styles.descriptionField}
          value={value.description?.replace(PLACEHOLDER_DESCRIPTION, '') || ''}
          onChange={(newValue) =>
            onChange({
              ...value,
              description: newValue || PLACEHOLDER_DESCRIPTION,
            })
          }
        />
        <p className={styles.descriptionHelp}>
          Describe the image you chose so that it can be added to the alt text
          for the generated image.
        </p>
      </div>
    </div>
  );
};
