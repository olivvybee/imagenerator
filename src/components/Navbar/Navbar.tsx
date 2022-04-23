import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import _sortBy from 'lodash/sortBy';

import { generators } from '../../generators';

import buttonStyles from '../Button/Button.module.css';
import styles from './Navbar.module.css';

export const Navbar = () => {
  const { pathname } = useLocation();

  const expander = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const expanderHeight = expander.current?.scrollHeight || 0;

  // Collapse generator list when navigating to another page
  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  const currentGenerator = generators.find(
    (generator) => generator.route === pathname
  );
  const dropdownText = currentGenerator?.name || 'Choose generator';

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.staticContent}>
          <Link to="/" className={styles.homeLink}>
            <img src="/logo.png" width={40} height={40} alt="" />
            <h1 className={styles.siteName}>imagenerator</h1>
          </Link>

          <button
            className={styles.dropdown}
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}>
            {dropdownText} {isExpanded ? '▲' : '▼'}
          </button>
        </div>

        <div
          className={styles.expandableSection}
          ref={expander}
          style={{ maxHeight: isExpanded ? expanderHeight : 0 }}>
          <ul className={styles.linkList}>
            {_sortBy(generators, 'name').map((generator) => (
              <li className={styles.linkWrapper} key={generator.route}>
                <Link
                  to={generator.route}
                  className={classNames(buttonStyles.button, styles.link)}>
                  {generator.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
