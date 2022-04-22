import { Link } from 'react-router-dom';
import _sortBy from 'lodash/sortBy';

import { generators } from '../../generators';

import styles from './Homepage.module.css';

export const Homepage = () => (
  <div>
    <p className={styles.bigText}>hi, im a generator.</p>

    <p>I'll help you make memes and apply fancy styles to your images.</p>

    <p>
      What can I do? Well here are all my generators! Click one to try it out.
      Some of them use a preset image, and some of them let you choose your own
      image to edit.
    </p>

    <ul className={styles.generatorList}>
      {_sortBy(generators, 'name').map((generator) => (
        <li className={styles.generatorLinkWrapper} key={generator.route}>
          <Link className={styles.generatorLink} to={generator.route}>
            <span className={styles.generatorName}>{generator.name}</span>
            <span className={styles.generatorDescription}>
              {generator.description}
            </span>
          </Link>
        </li>
      ))}
    </ul>

    <h2>FAQs</h2>

    <h3>Where do images go when I upload them?</h3>

    <p>
      Simple answer: absolutely nowhere. When you choose an image, it isn't
      being uploaded anywhere, because I work entirely in your browser. There is
      no server involved. You can verify this by disconnecting from the internet
      after loading the page, because everything will still work.
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
      offer suggested alt text that you can copy and paste instead of having to
      describe the image yourself.
    </p>

    <h3>Who made you?</h3>

    <p>
      I was made by{' '}
      <a className={styles.twitterLink} href="https://twitter.com/olivvybee">
        @olivvybee
      </a>{' '}
      because she kept coming up with ideas for image generators and needed
      somewhere to put them. If you like them, maybe{' '}
      <a href="https://ko-fi.com/olivvybee">buy her a coffee</a>.
    </p>
  </div>
);
