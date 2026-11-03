import { ReactEventHandler, useEffect, useState } from 'react';
import ReactCrop, {
  centerCrop,
  makeAspectCrop,
  PercentCrop,
} from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { IoCheckmarkOutline, IoRefreshOutline } from 'react-icons/io5';

import { Button } from '../Button';

import styles from './ImageCrop.module.css';

interface ImageCropProps {
  image: string;
  aspectRatio?: number;
  minWidth?: number;
  minHeight?: number;
  onSave: (crop?: PercentCrop) => void;
}

export const ImageCrop = ({
  image,
  aspectRatio,
  minWidth,
  minHeight,
  onSave,
}: ImageCropProps) => {
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  }>();
  const [defaultCrop, setDefaultCrop] = useState<PercentCrop>();
  const [crop, setCrop] = useState<PercentCrop>();

  const saveCrop = () => {
    onSave(crop);
  };

  const resetCrop = () => {
    setCrop(defaultCrop);
    onSave(defaultCrop);
  };

  const onImageLoad: ReactEventHandler<HTMLImageElement> = (e) => {
    const { naturalWidth: width, naturalHeight: height } = e.currentTarget;
    setImageSize({ width, height });
  };

  // Recalculate the crop when a new image loads or when the aspect ratio
  // changes, so the saved crop always matches the requested aspect ratio
  useEffect(() => {
    if (!imageSize) {
      return;
    }

    const { width, height } = imageSize;
    const aspect = aspectRatio || width / height;

    const defaultCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 100 }, aspect, width, height),
      width,
      height
    );

    setDefaultCrop(defaultCrop);
    setCrop(defaultCrop);
    onSave(defaultCrop);
    // onSave is recreated on every render, so including it would cause a loop
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageSize, aspectRatio]);

  return (
    <div className={styles.cropWrapper}>
      <div className={styles.buttons}>
        <Button small={true} icon={IoCheckmarkOutline} onClick={saveCrop}>
          Apply
        </Button>
        <Button small={true} icon={IoRefreshOutline} onClick={resetCrop}>
          Reset
        </Button>
      </div>

      <ReactCrop
        crop={crop}
        minWidth={minWidth}
        minHeight={minHeight}
        onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
        aspect={aspectRatio}>
        <img src={image} onLoad={onImageLoad} alt="" />
      </ReactCrop>
    </div>
  );
};
