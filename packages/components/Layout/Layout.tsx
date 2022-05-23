import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { Navbar } from '@packages/core';

import styles from './Layout.module.css';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
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
          <div className={styles.logoWrapper}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </div>
        </a>
      </footer>
    </>
  );
};
