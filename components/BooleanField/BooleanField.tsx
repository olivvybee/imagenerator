import { InputHTMLAttributes } from 'react';
import classNames from 'classnames';
import { IoCheckmark, IoClose } from 'react-icons/io5';

import { ScreenReaderOnly } from '../ScreenReaderOnly/ScreenReaderOnly';

import styles from './BooleanField.module.css';

interface BooleanFieldProps extends Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'onChange' | 'value'
> {
  label: string;
  value?: boolean;
  onChange?: (newValue: boolean) => void;
}

export const BooleanField = ({
  className,
  id,
  label,
  value,
  onChange,
  ...rest
}: BooleanFieldProps) => (
  <label htmlFor={id} className={classNames(styles.wrapper, className)}>
    <ScreenReaderOnly>
      <input
        id={id}
        type="checkbox"
        checked={value}
        onChange={(e) => onChange?.(e.target.checked)}
        {...rest}
      />
    </ScreenReaderOnly>

    <div className={styles.switchContainer}>
      <div className={styles.track} />
      <div className={classNames(styles.thumb, { [styles.checked]: value })}>
        {value ? <IoCheckmark size={16} /> : <IoClose size={16} />}
      </div>
    </div>

    <span className={styles.label}>{label}</span>
  </label>
);
