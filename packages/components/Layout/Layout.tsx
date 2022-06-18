import React, { useState } from 'react';
import Head from 'next/head';

import { Navbar, Sidebar } from '@packages/core';
import { useSiteProperties } from '@packages/config';

import { Footer } from '../Footer';

type LayoutProps = {
  children: React.ReactNode;
};

export const Layout = ({ children }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const valueOf = useSiteProperties();

  const toggle = () => {
    setIsOpen(!isOpen);
  };

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
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      {children}
      <Footer />
    </>
  );
};
