import { IoRefreshOutline } from 'react-icons/io5';

import { Generator } from '../../types/GeneratorTypes';
import { Settings, SettingValues } from '../../types/SettingTypes';
import { Button } from '../Button';
import { SettingRenderer } from '../SettingRenderer/SettingRenderer';

import styles from './Configurator.module.css';

interface ConfiguratorProps {
  generator: Generator<Settings>;
  values: SettingValues<Settings>;
  onChange: (name: string, value: any) => void;
  reset: () => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  generator,
  values,
  onChange,
  reset,
}) => (
  <div className={styles.wrapper}>
    <div className={styles.headingWrapper}>
      <h3 className={styles.heading}>Settings</h3>
      <Button icon={IoRefreshOutline} onClick={reset} small={true}>
        Reset all
      </Button>
    </div>

    {Object.entries(generator.settings).map(([key, setting]) => {
      if (setting.when && !setting.when(values)) {
        return null;
      }

      return (
        <div className={styles.settingWrapper} key={key}>
          <label className={styles.settingName} htmlFor={key}>
            {setting.name}
          </label>
          <SettingRenderer
            setting={setting}
            value={values[key]}
            id={key}
            onChange={(newValue) => onChange(key, newValue)}
          />
        </div>
      );
    })}
  </div>
);
