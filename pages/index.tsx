import type { NextPage } from 'next';
import { SignInForm } from '@packages/core';

import styles from '../styles/Home.module.css';

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <video autoPlay muted loop className={styles.video} preload="auto">
        <source src="/Video.mp4" />
      </video>
      <div className={styles.overlay} />
      <SignInForm />
    </div>
  );
};

export default Home;
