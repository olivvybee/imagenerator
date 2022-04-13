import {
  FontAwesomeIcon,
  FontAwesomeIconProps,
} from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  icon?: FontAwesomeIconProps['icon'];
  small?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  className,
  disabled,
  type = 'button',
  icon,
  small,
}) => {
  const content = icon ? (
    <div className={styles.contentWithIcon}>
      <div className={small ? styles.smallIconWrapper : styles.iconWrapper}>
        <FontAwesomeIcon icon={icon} size={small ? '1x' : '2x'} />
      </div>
      {children}
    </div>
  ) : (
    children
  );

  return (
    <button
      className={classNames(styles.button, className, {
        [styles.smallButton]: small,
      })}
      onClick={onClick}
      disabled={disabled}
      type={type}>
      {content}
    </button>
  );
};
