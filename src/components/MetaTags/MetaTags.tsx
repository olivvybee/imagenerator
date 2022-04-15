import { Helmet } from 'react-helmet';

import { GeneratorMetadata } from '../../generators/types';

interface MetaTagsProps {
  generator: GeneratorMetadata;
}

export const MetaTags: React.FC<MetaTagsProps> = ({ generator }) => {
  const { route, name, description } = generator;

  const pageTitle = `${name} - imagenerator`;
  const pageUrl = `https://imagenerator.net${route}`;

  return (
    <Helmet>
      <title>{pageTitle}</title>
      <meta property="og:title" content={pageTitle} />
      <meta name="twitter:title" content={pageTitle} />

      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta name="twitter:description" content={description} />

      <meta name="canonical" content={pageUrl} />
      <meta property="og:url" content={pageUrl} />
      <meta name="twitter:url" content={pageUrl} />
    </Helmet>
  );
};
