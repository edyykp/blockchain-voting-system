import Head from 'next/head';
import Image from 'next/image';
import React from 'react';

import { Navbar } from '@packages/core';

import styles from './Layout.module.css';
import { useSiteProperties } from '@packages/config';
import { Sidebar } from '@packages/core/Sidebar/Sidebar';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('site_title'),
    description: valueOf('site_description'),
  };
  return (
    <>
      <Head>
        <title>{text.title}</title>
        <meta name="description" content={text.description} />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Sidebar />
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
