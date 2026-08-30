import { PropsWithChildren } from 'react';

import styles from './ScreenReaderOnly.module.css';

export const ScreenReaderOnly = ({ children }: PropsWithChildren) => (
  <div className={styles.srOnly}>{children}</div>
);
