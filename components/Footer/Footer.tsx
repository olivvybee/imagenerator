import styles from './Footer.module.css';

export const Footer = () => (
  <div className={styles.footer}>
    <div className={styles.footerContent}>
      <span>
        imagenerator by{' '}
        <a rel="me" href="https://fedi.beehive.gay/@olivvybee">
          olivvybee
        </a>
        . Support her and the site on{' '}
        <a href="https://ko-fi.com/olivvybee">ko-fi</a>. Report issues and
        suggestions on{' '}
        <a href="https://github.com/olivvybee/imagenerator">github</a>.
      </span>
    </div>
  </div>
);
