import { Button } from '../Button/Button';
import styles from './Stepper.module.css';

interface StepperProps<T = number> {
  possibleValues: T[];
  value: T;
  onChange: (newValue: T) => void;
  allowWrapping?: boolean;
  getLabel?: (value: T, currentIndex: number) => React.ReactElement;
}

export const Stepper = <T,>({
  possibleValues,
  value,
  onChange,
  allowWrapping = false,
  getLabel = (value) => <span>{value}</span>,
}: StepperProps<T>) => {
  const currentIndex = possibleValues.findIndex((item) => item === value);

  let nextIndex: number;
  let prevIndex: number;

  if (allowWrapping) {
    nextIndex = (currentIndex + 1) % possibleValues.length;
    prevIndex =
      (currentIndex + possibleValues.length - 1) % possibleValues.length;
  } else {
    nextIndex =
      currentIndex < possibleValues.length - 1 ? currentIndex + 1 : -1;
    prevIndex = currentIndex > 0 ? currentIndex - 1 : -1;
  }

  return (
    <div className={styles.wrapper}>
      <Button
        onClick={() => onChange(possibleValues[prevIndex])}
        disabled={prevIndex === -1}>
        ◀
      </Button>
      {getLabel(value, currentIndex)}
      <Button
        onClick={() => onChange(possibleValues[nextIndex])}
        disabled={nextIndex === -1}>
        ▶
      </Button>
    </div>
  );
};
