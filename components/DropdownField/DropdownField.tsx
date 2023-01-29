import styles from './DropdownField.module.css';

interface DropdownFieldProps {
  value?: string;
  onChange: (value: string) => void;
  options: string[];
}

export const DropdownField = ({
  value,
  onChange,
  options,
}: DropdownFieldProps) => (
  <select
    value={value}
    onChange={(e) => onChange?.(e.target.value)}
    className={styles.dropdown}>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);
