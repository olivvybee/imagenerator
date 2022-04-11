import classNames from 'classnames';

import styles from './TextField.module.css';

interface TextFieldProps {
  value: string;
  onChange?: (newValue: string) => void;
  onBlur?: () => void;
  onKeyPress?: (key: string) => void;
  className?: string;
  disabled?: boolean;
}

export const TextField: React.FC<TextFieldProps> = ({
  className,
  value,
  onChange,
  onBlur,
  onKeyPress,
  disabled,
}) => (
  <input
    className={classNames(styles.textField, className)}
    type="text"
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    onBlur={onBlur}
    onKeyPress={(e) => onKeyPress?.(e.key)}
    disabled={disabled}
  />
);
