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
      </Head>
      <Navbar toggle={toggle} />
      <Sidebar isOpen={isOpen} toggle={toggle} />
      {children}
      <Footer />
    </>
  );
};
