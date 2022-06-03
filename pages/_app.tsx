import '../styles/globals.css';
import type { AppProps } from 'next/app';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { Layout } from '@packages/components';
import { useEffect } from 'react';

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
