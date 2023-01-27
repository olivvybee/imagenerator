import { SliderPreset } from '../../types/Slider';
import { Button } from '../Button';
import styles from './SliderField.module.css';

interface SliderFieldProps {
  value: number;
  onChange: (newValue: number) => void;
  min: number;
  max: number;
  step?: number;
  presets?: SliderPreset[];
}

export const SliderField = ({
  value,
  onChange,
  min,
  max,
  step = 1,
  presets = [],
}: SliderFieldProps) => {
  return (
    <div className={styles.wrapper}>
      <input
        className={styles.slider}
        type="range"
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        min={min}
        max={max}
        step={step}
      />
      {presets.length > 0 && (
        <div className={styles.presets}>
          {presets.map((preset) => (
            <Button
              key={preset.name}
              onClick={() => onChange(preset.value)}
              small={true}>
              {preset.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};
