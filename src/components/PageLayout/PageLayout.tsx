import styles from './PageLayout.module.css';

export const PageLayout: React.FC = ({ children }) => {
  return <div className={styles.content}>{children}</div>;
};
