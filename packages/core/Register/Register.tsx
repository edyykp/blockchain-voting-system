import { Button, Input } from '@packages/components';
import { useSiteProperties, useAuthContext } from '@packages/config';

import styles from './Register.module.css';

export const Register = () => {
  const auth = useAuthContext();
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('register_form_title'),
    subtitle: valueOf('register_form_subtitle'),
    footer: valueOf('register_form_footer'),
    signin: valueOf('signin'),
  };

  return (
    <form className={styles.container} data-testid="register" id="register">
      <div className={styles.wrapper}>
        <h1 className={styles.title}>{text.title}</h1>
        <h2 className={styles.subtitle}>{text.subtitle}</h2>
      </div>
      <div className={styles.wrapper}>
        <Input type="text" field="email" isRequired={true} />
        <Input type="password" field="password" isRequired={true} />
        <Input type="password" field="confirm password" isRequired={true} />
      </div>
      <Button theme="primary" size="lg" buttonText="Register" />
      <p className={styles.text}>
        {text.footer}
        <a className={styles.link} onClick={auth.changeText}>
          {text.signin}
        </a>
      </p>
    </form>
  );
};
