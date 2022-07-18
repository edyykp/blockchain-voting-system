import type { NextPage } from 'next';
import {
  AuthAction,
  withAuthUser,
  withAuthUserTokenSSR,
} from 'next-firebase-auth';

import { InfoSection, Register, SignInForm } from '@packages/core';
import { useInfoSectionData } from '@packages/config';
import { Layout } from '@packages/components';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const sections = useInfoSectionData();

  return (
    <Layout>
      <main id="home">
        <video autoPlay muted loop className={styles.video} preload="auto">
          <source src="/Video.mp4" />
        </video>
        <div className={styles.overlay} />
        <div id="authContainer">
          <SignInForm />
          <Register />
        </div>
      </main>
      <div className={styles.container}>
        {sections.map((section, key) => (
          <InfoSection
            theme={section.theme}
            svgPath={section.svgPath}
            heading={section.heading}
            subtitle={section.subtitle}
            topline={section.topline}
            id={section.id}
            href={section.href}
            buttonText={section.buttonText}
            key={key}
          />
        ))}
      </div>
    </Layout>
  );
};

export const getServerSideProps = withAuthUserTokenSSR({
  whenAuthed: AuthAction.REDIRECT_TO_APP,
  appPageURL: '/dashboard',
})();

export default withAuthUser({
  appPageURL: '/dashboard',
  whenAuthed: AuthAction.REDIRECT_TO_APP,
})(Home);
