import { ReactEventHandler, useState } from 'react';
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

    const aspect = aspectRatio || width / height;

    const defaultCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 100 }, aspect, width, height),
      width,
      height
    );

    setDefaultCrop(defaultCrop);
    setCrop(defaultCrop);
    onSave(defaultCrop);
  };

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
