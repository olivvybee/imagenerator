import { ConfiguratorComponent } from '../types';
import { TuxedoMaskConfig } from './types';

import styles from './TuxedoMaskConfigurator.module.css';
import { TextField } from '../../components/TextField/TextField';

export const TuxedoMaskConfigurator: ConfiguratorComponent<
  TuxedoMaskConfig
> = ({ config, setConfig }) => {
  const createOnChange = (prop: keyof TuxedoMaskConfig) => (value: string) =>
    setConfig({
      ...config,
      [prop]: value,
    });

  return (
    <div className={styles.wrapper}>
      <span className={styles.settingName}>Rose</span>
      <TextField
        value={config.roseLabel}
        onChange={createOnChange('roseLabel')}
      />

      <span className={styles.settingName}>Tuxedo Mask</span>
      <TextField
        value={config.tuxedoMaskLabel}
        onChange={createOnChange('tuxedoMaskLabel')}
      />

      <span className={styles.settingName}>Sailor Moon</span>
      <TextField
        value={config.sailorMoonLabel}
        onChange={createOnChange('sailorMoonLabel')}
      />
    </div>
  );
};
