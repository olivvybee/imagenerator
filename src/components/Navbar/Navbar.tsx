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
            <h1 className={styles.siteName}>Jenny</h1>
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
          <div className={styles.spacer} />

          <div className={styles.linkList}>
            {_sortBy(generators, 'name').map((generator) => (
              <Link
                key={generator.route}
                to={generator.route}
                className={classNames(buttonStyles.button, styles.link)}>
                {generator.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
