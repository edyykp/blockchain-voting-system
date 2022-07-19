import { useState } from 'react';

import { Button, Input } from '@packages/components';
import {
  useSiteProperties,
  useAuthContext,
  isMobileDevice,
} from '@packages/config';
import { useEmailModalContext } from '@packages/config';
import { connect } from '@packages/network';

import styles from './SignInForm.module.css';
import { useRouter } from 'next/router';

export const SignInForm = () => {
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();
  const auth = useAuthContext();
  const { setShow } = useEmailModalContext();
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('sign_in_form_title'),
    subtitle: valueOf('sign_in_form_subtitle'),
    footer: valueOf('sign_in_form_footer'),
    signup: valueOf('sign_up'),
    metamaskLogin: valueOf('metamask_button_text'),
  };
  console.log(process.env.NEXT_PUBLIC_HOSTNAME);

  const socialLogin = async () => {
    if (isMobileDevice()) {
      window.location.assign(
        `${process.env.NEXT_PUBLIC_METAMASK_APP_DEEP_LINK}${process.env.NEXT_PUBLIC_HOSTNAME}`,
      );
    } else {
      connect(async (userAddress) => {
        const data = await fetch('/api/loginMetamask', {
          body: JSON.stringify({
            userAddress,
          }),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          credentials: 'include',
        });
        const res = await data.json();

        if (data.status === 401) {
          setShow(true);
        }

        if (data.status !== 200) {
          setError(res.error);
        }

        if (data.status === 200) {
          router.push('/dashboard');
        }
      }).catch((error) => {
        setError(error.message);
      });
    }
  };

  return (
    <form
      className={styles.container}
      data-testid="signinform"
      data-aos="zoom-in-up"
      id="signin"
    >
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{text.title}</h1>
        <h2 className={styles.subtitle}>{text.subtitle}</h2>
      </div>
      {error && <div className={styles.errorWrapper}>{error}</div>}
      <div className={styles.wrapper}>
        <Input type="text" field="email" isRequired />
        <Input type="password" field="password" isRequired />
      </div>
      <div className={styles.buttonsWrapper}>
        <Button theme="primary" size="lg" buttonType="submit" />
        <Button
          theme="secondary"
          size="lg"
          buttonText={text.metamaskLogin}
          iconLink="/metamask.svg"
          onClick={socialLogin}
          buttonType="button"
        />
      </div>
      <p className={styles.text}>
        {text.footer}
        <a className={styles.link} onClick={auth.changeText}>
          {text.signup}
        </a>
      </p>
    </form>
  );
};
