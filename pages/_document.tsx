import { Html, Head, Main, NextScript } from 'next/document';
import { useSiteProperties } from '@packages/config';

export default function Document() {
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('site_title'),
    description: valueOf('site_description'),
  };
  return (
    <Html>
      <Head>
        <meta name="description" content={text.description} />
        <link rel="icon" href="/favicon.ico" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Montagu+Slab:opsz@16..144&family=Sassy+Frass&display=swap"
          rel="stylesheet"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
