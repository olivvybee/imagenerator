import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';
import _sortBy from 'lodash/sortBy';

import { generators } from '../../generators';
import { legacyGenerators } from '../../legacyGenerators';

import buttonStyles from '../Button/Button.module.css';
import styles from './Navbar.module.css';
import { routeFromName } from '../../utils/routeFromName';

export const Navbar = () => {
  const { pathname } = useLocation();

  const expander = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const expanderHeight = expander.current?.scrollHeight || 0;

  // Collapse generator list when navigating to another page
  useEffect(() => {
    setIsExpanded(false);
  }, [pathname]);

  const currentGenerator = legacyGenerators.find(
    (generator) => generator.route === pathname
  );
  const dropdownText = currentGenerator?.name || 'Choose generator';

  return (
    <div className={styles.navbar}>
      <div className={styles.navbarContent}>
        <div className={styles.staticContent}>
          <Link to="/" className={styles.homeLink}>
            <img
              srcSet="/logo40.png, /logo80.png 2x, /logo120.png 3x"
              src="/logo120.png"
              alt=""
              height={40}
              width={40}
            />
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
              <li
                className={classNames(buttonStyles.button, styles.linkWrapper)}
                key={generator.name}>
                <Link
                  to={routeFromName(generator.name)}
                  className={styles.link}>
                  {generator.name}
                </Link>
              </li>
            ))}

            {_sortBy(legacyGenerators, 'name').map((generator) => (
              <li
                className={classNames(buttonStyles.button, styles.linkWrapper)}
                key={generator.route}>
                <Link to={generator.route} className={styles.link}>
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
