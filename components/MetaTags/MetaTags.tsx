import Head from 'next/head';
import { useRouter } from 'next/router';

interface MetaTagsProps {
  title?: string;
  description?: string;
}

const fullUrl = (path: string) => `https://imagenerator.net${path}`;

export const MetaTags = (props: MetaTagsProps) => {
  const { pathname } = useRouter();

  const title = props.title ? `${props.title} - imagenerator` : 'imagenerator';
  const description =
    props.description ||
    "hi, im a generator.  i'll help you make memes and apply fancy styles to your images.";
  const url = fullUrl(pathname);
  const image = fullUrl('/apple-touch-icon.png');

  return (
    <Head>
      <title key="title">{title}</title>
      <meta property="og:title" content={title} key="og:title" />
      <meta name="twitter:title" content={title} key="twitter:title" />

      <meta name="description" content={description} key="description" />
      <meta
        property="og:description"
        content={description}
        key="og:description"
      />
      <meta
        name="twitter:description"
        content={description}
        key="twitter:description"
      />

      <meta name="canonical" content={url} key="canonical" />
      <meta property="og:url" content={url} key="og:url" />
      <meta name="twitter:url" content={url} key="twitter:url" />

      <meta name="og:image" content={image} key="og:image" />
      <meta name="twitter:image" content={image} key="twitter:image" />

      <link rel="icon" href={fullUrl('/favicon.ico')} key="icon" />
      <meta name="twitter:card" content="summary" />
    </Head>
  );
};
