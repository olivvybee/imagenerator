import { Button } from '../Button';

import styles from './StepperField.module.css';

interface StepperFieldProps<V = number> {
  value: V;
  onChange: (value: V) => void;
  options: V[];
  allowWrapping: boolean;
  renderLabel?: (value: V, index: number) => React.ReactElement;
}

export const StepperField = <V = number,>({
  value,
  onChange,
  options,
  allowWrapping,
  renderLabel,
}: StepperFieldProps<V>) => {
  const currentIndex = options.findIndex((item) => item === value);

  let nextIndex: number;
  let prevIndex: number;

  if (allowWrapping) {
    nextIndex = (currentIndex + 1) % options.length;
    prevIndex = (currentIndex + options.length - 1) % options.length;
  } else {
    nextIndex = currentIndex < options.length - 1 ? currentIndex + 1 : -1;
    prevIndex = currentIndex > 0 ? currentIndex - 1 : -1;
  }

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => onChange(options[prevIndex])}
        disabled={prevIndex === -1}>
        ◀
      </Button>
      {renderLabel ? (
        renderLabel(value, currentIndex)
      ) : (
        <span className={styles.label}>{value as any}</span>
      )}
      <Button
        onClick={() => onChange(options[nextIndex])}
        disabled={nextIndex === -1}>
        ▶
      </Button>
    </div>
  );
};
