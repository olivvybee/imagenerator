import { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { IoImage, IoTrashOutline } from 'react-icons/io5';

import { Button } from '../Button';

import styles from './ImageField.module.css';

interface ImageFieldProps {
  value?: string;
  onChange: (value: string | undefined) => void;
}

export const ImageField = ({ value, onChange }: ImageFieldProps) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      const url = URL.createObjectURL(file);
      onChange(url);
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
    <div {...getRootProps()} className={styles.dropzone}>
      <input {...getInputProps()} />
      <div className={styles.preview} onClick={open}>
        {value ? (
          <img className={styles.previewImage} src={value} alt="" />
        ) : (
          <IoImage width={48} height={48} />
        )}
      </div>
      <Button className={styles.button} onClick={open}>
        <span>{value ? 'Change image' : 'Choose an image'}</span>
      </Button>
      {!!value && (
        <Button
          className={styles.clearButton}
          onClick={clearImage}
          icon={IoTrashOutline}
        />
      )}
    </div>
  );
};
