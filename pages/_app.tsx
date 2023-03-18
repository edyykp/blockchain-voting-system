import { useEffect } from 'react';
import type { AppProps } from 'next/app';
import AOS from 'aos';
import 'aos/dist/aos.css';

import { AuthWrapper, initAuth, EmailModalWrapper } from '@packages/config';

import '../styles/globals.css';
import { ToastWrapper } from '@packages/config/ToastContext/state';

initAuth();

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    AOS.init({ duration: 800 });
  }, []);

  return (
    <EmailModalWrapper>
      <AuthWrapper>
        <ToastWrapper>
          <Component {...pageProps} />
        </ToastWrapper>
      </AuthWrapper>
    </EmailModalWrapper>
  );
}

export default MyApp;
