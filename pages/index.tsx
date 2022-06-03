import type { NextPage } from 'next';
import { InfoSection, SignInForm } from '@packages/core';
import { useInfoSectionData } from '@packages/config';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  const sections = useInfoSectionData();

  return (
    <>
      <main>
        <video autoPlay muted loop className={styles.video} preload="auto">
          <source src="/Video.mp4" />
        </video>
        <div className={styles.overlay} />
        <SignInForm />
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
    </>
  );
};

export default Home;
