import { HexColorPicker } from 'react-colorful';
import { Colour } from '../../types/Colour';
import { Expander, TriggerRenderFunction } from '../Expander';

import styles from './ColourField.module.css';

interface ColourFieldProps {
  value?: Colour;
  onChange: (value: Colour) => void;
  presets?: Colour[];
  allowCustom?: boolean;
}

export const ColourField = ({
  value,
  onChange,
  presets = [],
  allowCustom,
}: ColourFieldProps) => {
  const renderTrigger: TriggerRenderFunction = (toggle) => (
    <button onClick={toggle} className={styles.expandButton}>
      Choose a custom colour
    </button>
  );

  return (
    <div className={styles.colourField}>
      <div className={styles.currentColour}>
        <div
          className={styles.currentColourPreview}
          style={{ backgroundColor: value?.hex }}
        />
        <span>{value?.name || 'No colour selected'}</span>
      </div>

      {presets.length > 0 && (
        <ul className={styles.presetList}>
          {presets.map((preset) => (
            <li key={preset.hex} className={styles.presetItem}>
              <button
                className={styles.presetButton}
                style={{ backgroundColor: preset.hex }}
                onClick={() => onChange(preset)}
              />
            </li>
          ))}
        </ul>
      )}

      {allowCustom && (
        <Expander renderTrigger={renderTrigger}>
          {allowCustom && (
            <div className={styles.colourPicker}>
              <HexColorPicker
                color={value?.hex}
                onChange={(newValue) =>
                  onChange({ hex: newValue, name: newValue })
                }
              />
            </div>
          )}
        </Expander>
      )}
    </div>
  );
};
