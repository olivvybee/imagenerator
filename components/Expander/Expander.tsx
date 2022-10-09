import { useRef, useState } from 'react';
import { Collapse } from 'react-collapse';
import classNames from 'classnames';

import styles from './Expander.module.css';

export type TriggerRenderFunction = (toggle: () => void) => React.ReactNode;

interface ExpanderProps {
  renderTrigger: TriggerRenderFunction;
  children?: React.ReactNode;
}

export const Expander = ({ children, renderTrigger }: ExpanderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={styles.expander}>
      <div className={styles.triggerWrapper}>
        {renderTrigger(() => setIsExpanded(!isExpanded))}
      </div>
      <Collapse className={styles.contentWrapper} isOpened={isExpanded}>
        {children}
      </Collapse>
    </div>
  );
};
