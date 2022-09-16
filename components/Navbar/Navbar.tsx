import Link from 'next/link';
import classNames from 'classnames';

import buttonStyles from '../Button/Button.module.css';
import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.staticContent}>
          <Link href="/">
            <a className={styles.homeLink}>
              <img
                srcSet="/logo40.png, /logo80.png 2x, /logo120.png 3x"
                src="/logo120.png"
                alt=""
                height={40}
                width={40}
              />
              <span className={styles.siteName}>imagenerator</span>
            </a>
          </Link>

          <Link href="/generators">
            <a className={styles.link}>All generators</a>
          </Link>
        </div>
      </div>
    </div>
  );
};
