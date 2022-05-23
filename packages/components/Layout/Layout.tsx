import Head from 'next/head';
import Image from 'next/image';
import React from 'react';
import { ThemeProvider } from 'styled-components';

import { Navbar } from '@packages/core';

import { GlobalStyle, LogoWrapper, theme } from './styles';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <React.Fragment>
      <GlobalStyle />
      <ThemeProvider theme={theme}>
        <Head>
          <title>BVS</title>
          <meta name="description" content="Blockchain voting system" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main>{children}</main>
        <footer>
          <a
            href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Powered by{' '}
            <LogoWrapper>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </LogoWrapper>
          </a>
        </footer>
      </ThemeProvider>
    </React.Fragment>
  );
};
