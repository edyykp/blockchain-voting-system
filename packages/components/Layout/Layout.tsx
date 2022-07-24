import React, { useState } from 'react';
import Head from 'next/head';
import { AuthUser } from 'next-firebase-auth';

import { Navbar, Sidebar } from '@packages/core';
import { useSiteProperties } from '@packages/config';

import { Footer } from '../Footer';

type LayoutProps = {
  user: AuthUser;
  children: React.ReactNode;
};

export const Layout = ({ children, user }: LayoutProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('site_title'),
  };

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Head>
        <title>{text.title}</title>
      </Head>
      <Navbar toggle={toggle} user={user} />
      <Sidebar isOpen={isOpen} toggle={toggle} user={user} />
      {children}
      <Footer />
    </>
  );
};
