import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router';

import { legacyGenerators } from '../../legacyGenerators';

export const MetaTags: React.FC = () => {
  const { pathname } = useLocation();

  const generator = legacyGenerators.find(
    (generator) => generator.route === pathname
  );

  let pageTitle, pageUrl, pageDescription;

  if (generator) {
    const { route, name, description } = generator;

    pageTitle = `${name} - imagenerator`;
    pageUrl = `https://imagenerator.net${route}`;
    pageDescription = description;
  } else {
    pageTitle = 'imagenerator';
    pageUrl = 'https://imagenerator.net';
    pageDescription = 'hi, im a generator';
  }

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />

      <meta name="description" content={pageDescription} />
      <meta property="og:description" content={pageDescription} />
      <meta name="twitter:description" content={pageDescription} />

      <meta name="canonical" content={pageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:url" content={pageUrl} />
    </Helmet>
  );
};
