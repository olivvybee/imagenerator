import classNames from 'classnames';

import styles from './Slider.module.css';

interface SliderProps {
  onChange?: (value: number) => void;
  className?: string;
  disabled?: boolean;
  min?: number;
  max?: number;
  defaultValue?: number;
  step?: number;
}

export const Slider: React.FC<SliderProps> = ({
  onChange,
  className,
  disabled,
  min,
  max,
  defaultValue,
  step,
}) => (
  <input
    type="range"
    onChange={(e) => onChange?.(parseInt(e.target.value, 10))}
    min={min}
    max={max}
    defaultValue={defaultValue}
    step={step}
    disabled={disabled}
    className={classNames(styles.slider, className)}
  />
);
