import classNames from 'classnames';
import { InferGetStaticPropsType } from 'next';
import Link from 'next/link';

import { getAllGenerators } from '../utils/getAllGenerators';

import buttonStyles from '../components/Button/Button.module.css';
import styles from './homepage.module.css';
import { AltTextExplanation } from '../components/AltTextExplanation';

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

    <AltTextExplanation />

    <h3>What font do you use?</h3>

    <p>
      Text on the page and most of the generators use{' '}
      <a href="https://brailleinstitute.org/freefont">Atkinson Hyperlegible</a>,
      a font designed for maximum legibility and developed by the Braille
      Institute of America.
    </p>

    <p>
      Some generators use fonts specific to the image, like the Noun Verbed
      generator which uses the Dark Souls font.
    </p>

    <h3>How can I report a bug or suggest a new feature?</h3>

    <p>
      If something's not working right, or you have an idea for an improvement
      or a new generator, please create an issue on{' '}
      <a href="https://github.com/olivvybee/imagenerator">github</a>.
    </p>

    <h3>Who made you?</h3>

    <p>
      I was made by{' '}
      <a href="https://fedi.beehive.gay/@olivvybee" rel="me">
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
