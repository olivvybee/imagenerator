import styles from "./SliderField.module.css";

interface SliderFieldProps {
  value: number;
  onChange: (newValue: number) => void;
  min: number;
  max: number;
  step?: number;
}

export const SliderField = ({
  value,
  onChange,
  min,
  max,
  step = 1,
}: SliderFieldProps) => {
  return (
    <input
      className={styles.slider}
      type="range"
      value={value}
      onChange={(e) => onChange(parseFloat(e.target.value))}
      min={min}
      max={max}
      step={step}
    />
  );
};
