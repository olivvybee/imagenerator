import Link from 'next/link';

import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.staticContent}>
          <Link href="/" className={styles.homeLink}>
            <img
              srcSet="/logo40.png, /logo80.png 2x, /logo120.png 3x"
              src="/logo120.png"
              alt=""
              height={40}
              width={40}
            />
            <span className={styles.siteName}>imagenerator</span>
          </Link>

          <Link href="/generators" className={styles.link}>
            All generators
          </Link>
        </div>
      </div>
    </div>
  );
};
