# imagenerator

imagenerator is a set of image generators that run in the browser. No data
leaves your device, and most generators work offline after loading the page.

The site is a React application running on Next.js. The actual image generation
is done by rendering to an html `<canvas>` and then exporting the final result
as a PNG.

## Types of generators

In general, any generator idea is acceptable and will be considered, according
to some simple rules:

- **No images of real people.** There are two reasons for this: one, they almost
  certainly haven't consented to being made into a meme generator. Two, if
  someone turns out to be problematic later on, they can't be removed from all
  the existing memes that were already generated.

- **No bigotry**. Generators will absolutely never make fun of people for their
  appearance, gender, sexuality, religion, background, or anything else.
  Obviously I cannot stop people from generating memes containing bigotry, but
  there will never be a generator on this site which generates memes usually
  associated with problematic content.

- **Nothing that could be interpreted as "real"**. Generators should not produce
  images that could be misinterpreted as a screenshot rather than a meme. For
  example, a generator that creates an image that looks like a tweet would not
  be allowed.

## Contributing

The easiest way to contribute is to
[open an issue](https://github.com/olivvybee/imagenerator/issues) with a
generator idea, feature request, or bug report. Before doing so, have a quick
search to make sure someone hasn't already opened a similar issue.

You can also make pull requests, if you'd like to contribute more directly. Feel
free to open requests with any changes, big or small.

### Running locally

This project uses npm for dependency management.

Once you've cloned the project, install all the dependencies by running
`npm install`.

To run imagenerator locally, run `npm run dev`. The server will start at
`http://localhost:3000`, which you can now open in your browser.

### Creating a new generator

To create a new generator from scratch, run `npm run new`. You'll be asked for a
name and then some other things based on the name. In most cases these can be
left as the default, unless the name of the generator contains punctuation.

The script will create a new folder containing all the code for the generator,
based on a template. The easiest way to understand how to write the code is to
look at how other generators work.

### Testing

Unit testing is done using jest. To run the tests, run `npm test`. All
generators automatically have tests to ensure they have a unique name, a
description, and suggest alt text when generating.

Browser compatibility for this project is tested with
[BrowserStack](https://www.browserstack.com).

### Linting

ESLint is set up on the project but doesn't currently run automatically on PRs.
The ruleset is also not particularly strict. If you'd like to run linting just
to double check, run `npm run lint`.

### PR checks

When you open a PR, your branch will be deployed to a netlify preview branch so
your changes can be verified. A github action will also run unit tests against
the PR.

### Dependencies

I try to limit the number of third party dependencies wherever possible, but if
there's something useful that allows a feature which would otherwise be
extremely useful to implement, it can be added.
