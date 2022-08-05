import { Generator } from '../../types/GeneratorTypes';
import { SettingValues } from '../../types/SettingTypes';
import { SettingRenderer } from '../SettingRenderer/SettingRenderer';

import styles from './Configurator.module.css';

interface ConfiguratorProps {
  generator: Generator;
  values: SettingValues;
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

    {generator.settings.map((setting) => {
      const id = setting.name.toLowerCase().replaceAll(' ', '-');
      return (
        <div>
          <label htmlFor={id}>{setting.name}</label>
          <SettingRenderer
            setting={setting}
            value={values[setting.name]}
            id={id}
            onChange={(newValue) => onChange(setting.name, newValue)}
          />
        </div>
      );
    })}
  </div>
);
