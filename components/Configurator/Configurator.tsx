import { Generator } from '../../types/GeneratorTypes';
import { Settings, SettingValues } from '../../types/SettingTypes';
import { Button } from '../Button';
import { SettingRenderer } from '../SettingRenderer/SettingRenderer';

import styles from './Configurator.module.css';

interface ConfiguratorProps {
  generator: Generator<Settings>;
  values: SettingValues<Settings>;
  onChange: (name: string, value: any) => void;
  shareImage?: () => void;
  downloadImage: () => void;
}

export const Configurator: React.FC<ConfiguratorProps> = ({
  generator,
  values,
  onChange,
  shareImage,
  downloadImage,
}) => (
  <div className={styles.wrapper}>
    <h1 className={styles.generatorName}>{generator.name}</h1>
    <p className={styles.helpText}>{generator.helpText}</p>

    <div className={styles.shareSection}>
      {!!shareImage && (
        <Button className={styles.button} onClick={shareImage}>
          Share image
        </Button>
      )}
      <Button className={styles.button} onClick={downloadImage}>
        Download image
      </Button>
    </div>

    <h3 className={styles.heading}>Settings</h3>

    {Object.entries(generator.settings).map(([key, setting]) => (
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
    ))}
  </div>
);
