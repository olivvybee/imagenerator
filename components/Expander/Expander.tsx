import { useRef, useState } from 'react';
import { Collapse } from 'react-collapse';
import classNames from 'classnames';

import styles from './Expander.module.css';

export type TriggerRenderFunction = (
  toggle: () => void,
  isExpanded: boolean
) => React.ReactNode;

interface ExpanderProps {
  renderTrigger: TriggerRenderFunction;
  children?: React.ReactNode;
  className?: string;
}

export const Expander = ({
  children,
  renderTrigger,
  className,
}: ExpanderProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className={classNames(styles.expander, className)}>
      <div className={styles.triggerWrapper}>
        {renderTrigger(() => setIsExpanded(!isExpanded), isExpanded)}
      </div>
      <Collapse className={styles.contentWrapper} isOpened={isExpanded}>
        {children}
      </Collapse>
    </div>
  );
};
