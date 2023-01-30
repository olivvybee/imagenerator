import { Palette } from '../../constants/GameBoyCamera';

import styles from './PalettePreview.module.css';

interface PalettePreviewProps {
  palette: Palette;
}

export const PalettePreview = ({ palette }: PalettePreviewProps) => (
  <div className={styles.wrapper}>
    <div className={styles.palette}>
      {palette.colours.map((colour) => (
        <div
          key={colour}
          className={styles.colourBlock}
          title={colour}
          style={{ backgroundColor: colour }}
        />
      ))}
    </div>
    <span className={styles.name}>{palette.name}</span>
  </div>
);
