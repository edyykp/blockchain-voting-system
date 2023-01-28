import { useRef, useState } from 'react';
import { useRouter } from 'next/router';
import ReCAPTCHA from 'react-google-recaptcha';

import { Button, Input } from '@packages/components';
import { useSiteProperties, useAuthContext } from '@packages/config';
import { registerUser } from '@packages/network';

import styles from './Register.module.css';

export const Register = () => {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmationPasswordRef = useRef<HTMLInputElement>(null);
  const [error, setError] = useState<string | undefined>();
  const [captchaValue, setCaptchaValue] = useState<string | null>(null)
  const auth = useAuthContext();
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('register_form_title'),
    subtitle: valueOf('register_form_subtitle'),
    footer: valueOf('register_form_footer'),
    signin: valueOf('signin'),
  };

  const register = async () => {
    if (captchaValue === null) {
      setError('ReCAPTCHA incomplete');
      return;
    }

    if (
      !emailRef.current?.value ||
      !passwordRef.current?.value ||
      !confirmationPasswordRef.current?.value
    ) {
      setError('Please complete all the fields');
      return;
    }

    if (passwordRef.current?.value !== confirmationPasswordRef.current?.value) {
      setError('Passwords do not match');
      return;
    }

    const { error, status } = await registerUser(
      emailRef.current?.value,
      passwordRef.current?.value,
    );

    if (status === 201) {
      router.push('/dashboard');
      return;
    }

    if (status !== 201) {
      setError(error);
    }
  };

  const handleCaptcha = (token: string | null) => {
    setCaptchaValue(token)
  }

  return (
    <form className={styles.container} data-testid="register" id="register">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{text.title}</h1>
        <h2 className={styles.subtitle}>{text.subtitle}</h2>
      </div>
      {error && <div className={styles.errorWrapper}>{error}</div>}
      <div className={styles.wrapper}>
        <Input
          type="text"
          field="email"
          isRequired={true}
          inputRef={emailRef}
        />
        <Input
          type="password"
          field="password"
          isRequired={true}
          inputRef={passwordRef}
        />
        <Input
          type="password"
          field="confirm password"
          isRequired={true}
          inputRef={confirmationPasswordRef}
        />
      </div>
      <ReCAPTCHA sitekey='6LdKjL8ZAAAAAEBwynzk986OTAhiobOdOg6Ynch8' onChange={handleCaptcha} theme='dark' type='image' />
      <Button
        theme="primary"
        size="lg"
        buttonText="Register"
        onClick={(event) => {
          event?.preventDefault();
          register();
        }}
      />
      <p className={styles.text}>
        {text.footer}
        <a className={styles.link} onClick={auth.changeText}>
          {text.signin}
        </a>
      </p>
    </form>
  );
};
