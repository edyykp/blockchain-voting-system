import { Link } from 'react-scroll';

import { useSiteProperties } from '@packages/config';

import styles from './Button.module.css';

interface ButtonProps {
  hasPaddingLarge?: boolean;
}

export const Button = ({ hasPaddingLarge }: ButtonProps) => {
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('navbar_cta_title'),
    link: valueOf('navbar_cta_link'),
  };

  return (
    <Link
      to={text.link || ''}
      className={`${styles.button} ${
        hasPaddingLarge ? `${styles.paddingLarge}` : ''
      }`}
    >
      {text.title}
    </Link>
  );
};
