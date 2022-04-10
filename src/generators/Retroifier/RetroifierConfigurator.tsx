import { Stepper } from '../../components';
import { ConfiguratorComponent } from '../types';

import { BRIGHTNESS_STEPS, CONTRAST_STEPS } from './constants';
import { Palette, RetroifierConfig } from './types';
import styles from './RetroifierConfigurator.module.css';
import { PALETTES } from './palettes';

const getLabel = (_: number, currentIndex: number) => (
  <span className={styles.stepperLabel}>{currentIndex}</span>
);

const getPalettePreview = (palette: Palette) => (
  <div className={styles.palettePreview}>
    {palette.colours.map((colour) => (
      <div
        key={colour}
        className={styles.palettePreviewBlock}
        title={colour}
        style={{ backgroundColor: colour }}
      />
    ))}
  </div>
);

export const RetroifierConfigurator: ConfiguratorComponent<
  RetroifierConfig
> = ({ config, setConfig }) => {
  const setBrightness = (value: number) =>
    setConfig({ ...config, brightness: value });

  const setContrast = (value: number) =>
    setConfig({ ...config, contrast: value });

  const setPalette = (value: Palette) =>
    setConfig({ ...config, palette: value });

  return (
    <div className={styles.wrapper}>
      <span className={styles.settingName}>Brightness</span>
      <Stepper
        value={config.brightness}
        possibleValues={BRIGHTNESS_STEPS}
        onChange={setBrightness}
        allowWrapping={false}
        getLabel={getLabel}
      />

      <span className={styles.settingName}>Contrast</span>
      <Stepper
        value={config.contrast}
        possibleValues={CONTRAST_STEPS}
        onChange={setContrast}
        allowWrapping={false}
        getLabel={getLabel}
      />

      <span className={styles.settingName}>Colour palette</span>
      <div className={styles.paletteWrapper}>
        <Stepper<Palette>
          value={config.palette}
          possibleValues={PALETTES}
          onChange={setPalette}
          allowWrapping={true}
          getLabel={getPalettePreview}
        />
        <span>{config.palette.name}</span>
      </div>
    </div>
  );
};
