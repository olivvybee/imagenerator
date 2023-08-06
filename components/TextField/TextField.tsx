import classNames from 'classnames';
import { InputHTMLAttributes } from 'react';

import styles from './TextField.module.css';

interface TextFieldProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    'onChange' | 'onKeyPress'
  > {
  value?: string;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  onKeyPress?: (key: string) => void;
  multiline?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  className,
  value = '',
  onChange,
  onBlur,
  onKeyPress,
  type = 'text',
  multiline = false,
  ...rest
}) =>
  multiline ? (
    <textarea
      className={classNames(styles.textField, styles.textArea, className)}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      onKeyUp={(e) => onKeyPress?.(e.key)}
    />
  ) : (
    <input
      className={classNames(styles.textField, className)}
      type={type}
      value={value}
      onChange={(e) => onChange?.(e.target.value)}
      onBlur={onBlur}
      onKeyUp={(e) => onKeyPress?.(e.key)}
      {...rest}
    />
  );
