import { IconType } from 'react-icons';
import classNames from 'classnames';
import { ButtonHTMLAttributes } from 'react';

import styles from './Button.module.css';

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  icon?: IconType;
  small?: boolean;
}

export const Button = ({
  children,
  onClick,
  className,
  disabled,
  type = 'button',
  icon: Icon,
  small,
}: ButtonProps) => {
  const content = Icon ? (
    <div className={styles.contentWithIcon}>
      <Icon size={small ? 16 : 20} />
      {!!children && <div className={styles.iconSpacer} />}
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
