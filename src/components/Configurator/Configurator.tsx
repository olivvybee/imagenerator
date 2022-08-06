import { Generator } from '../../types/GeneratorTypes';
import { Settings, SettingValues } from '../../types/SettingTypes';
import { SettingRenderer } from '../SettingRenderer/SettingRenderer';

import styles from './Configurator.module.css';

interface ConfiguratorProps {
  generator: Generator<Settings>;
  values: SettingValues<Settings>;
  onChange: (name: string, value: any) => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  generator,
  values,
  onChange,
}) => (
  <div className={styles.wrapper}>
    <h2 className={styles.heading}>{generator.name}</h2>
    <p className={styles.helpText}>{generator.helpText}</p>

    <h3 className={styles.heading}>Settings</h3>

    {Object.entries(generator.settings).map(([key, setting]) => (
      <div>
        <label htmlFor={key}>{setting.name}</label>
        <SettingRenderer
          setting={setting}
          value={values[key]}
          id={key}
          onChange={(newValue) => onChange(key, newValue)}
        />
      </div>
    ))}
  </div>
);
