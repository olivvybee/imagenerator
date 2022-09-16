import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { getAllGenerators } from '../../utils/getAllGenerators';

import styles from './generators.module.css';

const GeneratorsPage = ({
  generators,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <>
    <h2 className={styles.heading}>All generators</h2>

    <ul className={styles.generatorList}>
      {generators.map((generator) => (
        <li className={styles.generatorLinkWrapper} key={generator.name}>
          <Link href={generator.route}>
            <a className={styles.generatorLink}>
              <span className={styles.generatorName}>{generator.name}</span>
              <span className={styles.generatorDescription}>
                {generator.description}
              </span>
            </a>
          </Link>
        </li>
      ))}
    </ul>
  </>
);

export const getStaticProps = async () => {
  const generators = await getAllGenerators();
  return { props: { generators } };
};

export default GeneratorsPage;
