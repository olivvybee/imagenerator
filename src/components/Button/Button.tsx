import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick: () => void;
  className?: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  icon?: FontAwesomeIconProps['icon'];
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  type = 'button',
  icon,
}) => {
  const content = icon ? (
    <div className={styles.contentWithIcon}>
      <div className={styles.iconWrapper}>
        <FontAwesomeIcon icon={icon} size="2x" />
      </div>
      {children}
    </div>
  ) : (
    children
  );

  return (
    <button
      className={classNames(styles.button, className)}
      onClick={onClick}
      type={type}>
      {content}
    </button>
  );
};
