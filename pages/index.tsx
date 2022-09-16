import classNames from 'classnames';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { getAllGenerators } from '../utils/getAllGenerators';

import buttonStyles from '../components/Button/Button.module.css';
import styles from './homepage.module.css';

const Homepage = ({
  generators,
}: InferGetStaticPropsType<typeof getStaticProps>) => (
  <div>
    <p className={styles.bigText}>hi, im a generator.</p>

    <p>
      I'll help you make memes and apply fancy styles to your images. What can I
      do? Well here's a list of all my generators:
    </p>

    <ul className={styles.generatorList}>
      {generators.map((generator) => (
        <li className={styles.generatorLinkWrapper} key={generator.name}>
          <Link href={generator.route}>
            <a
              className={classNames(buttonStyles.button, styles.generatorLink)}>
              {generator.name}
            </a>
          </Link>
        </li>
      ))}
    </ul>

    <p>
      Visit the{' '}
      <Link href="/generators">
        <a>generators page</a>
      </Link>{' '}
      for a more detailed list.
    </p>

    <h2 className={styles.subheading}>FAQs</h2>

    <h3>What happens to uploaded images?</h3>

    <p>
      Your images never actually get uploaded anywhere, because I work entirely
      within your browser. Once you've loaded a generator, it will even work
      offline, because there's no server involved.
    </p>

    <h3>What's alt text?</h3>

    <p>
      Alt text is used to describe images for people who can't view them
      normally. For example, someone who is partially sighted might use software
      called a screen reader, where the computer reads out what's on the screen.
      Alt text is used by that software since AI isn't good enough to accurately
      describe an image without help.
    </p>
    <p>
      If you're sharing images on places like twitter, please consider adding
      alt text so that they're accessible to everyone. Some of my generators
      offer suggested alt text that you can copy and paste to make it easier.
    </p>

    <h3>Who made you?</h3>

    <p>
      I was made by{' '}
      <a href="https://twitter.com/olivvybee">
        <strong>@olivvybee</strong>
      </a>{' '}
      because she kept coming up with ideas for image generators and needed
      somewhere to put them. If you like them, maybe{' '}
      <a href="https://ko-fi.com/olivvybee">buy her a coffee</a>.
    </p>
  </div>
);

export const getStaticProps = async () => {
  const generators = await getAllGenerators();
  return { props: { generators } };
};

export default Homepage;
