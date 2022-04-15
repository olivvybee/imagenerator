import classNames from 'classnames';

import styles from './Dropdown.module.css';

interface DropdownProps {
  value?: string;
  onChange?: (value: string) => void;
  options: string[];
  className?: string;
  disabled?: boolean;
}

export const Dropdown: React.FC<DropdownProps> = ({
  value,
  onChange,
  options,
  className,
  disabled,
}) => (
  <select
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    className={classNames(styles.dropdown, className)}
    disabled={disabled}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
