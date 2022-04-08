import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage } from '@fortawesome/free-solid-svg-icons';

interface ImageSelectorProps {
  setFile: (file: File) => void;
}

export const ImageSelector: React.FC<ImageSelectorProps> = ({ setFile }) => {
  const [previewUrl, setPreviewUrl] = useState<string>();

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length === 0) {
        return;
      }

      const file = acceptedFiles[0];
      setFile(file);

      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    },
    [setFile, setPreviewUrl]
  );

  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    onDrop,
    accept: 'image/jpeg, image/png',
    multiple: false,
  });

  return (
    <div {...getRootProps()} className="dropzone">
      <input {...getInputProps()} />
      {acceptedFiles.length > 0 ? (
        <>
          {/* <img className="preview" src={previewUrl} alt="" /> */}
          <span>Change image</span>
        </>
      ) : (
        <>
          <div className="icon-wrapper">
            <FontAwesomeIcon icon={faImage} size="2x" />
          </div>
          <span>Choose an image</span>
        </>
      )}
    </div>
  );
};
