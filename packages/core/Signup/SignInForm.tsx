import { Button, Input } from '@packages/components';
import { useSiteProperties } from '@packages/config';
import { Link } from 'react-scroll';

import styles from './SignInForm.module.css';

export const SignInForm = () => {
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('sign_in_form_title'),
    subtitle: valueOf('sign_in_form_subtitle'),
    footer: valueOf('sign_in_form_footer'),
    signup: valueOf('sign_up'),
  };
  return (
    <form className={styles.container} data-testid="signinform">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{text.title}</h1>
        <h2 className={styles.subtitle}>{text.subtitle}</h2>
      </div>
      <div className={styles.wrapper}>
        <Input type="text" field="email" isRequired={true} />
        <Input type="password" field="password" isRequired={true} />
      </div>
      <Button theme="primary" size="lg" />
      <p className={styles.text}>
        {text.footer}
        <Link to="register" className={styles.link}>
          {text.signup}
        </Link>
      </p>
    </form>
  );
};
