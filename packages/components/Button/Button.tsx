import { Link } from 'react-scroll';

import { useSiteProperties } from '@packages/config';

import styles from './Button.module.css';

interface ButtonProps {
  theme: 'primary' | 'secondary';
  size: 'sm' | 'md' | 'lg';
  hasPaddingLarge?: boolean;
}

export const Button = ({ hasPaddingLarge, theme, size }: ButtonProps) => {
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
      } ${theme === 'primary' ? `${styles.primary}` : `${styles.secondary}`}
      ${size === 'sm' && styles.smallButton}
      ${size === 'md' && styles.mediumButton}
      ${size === 'lg' && styles.largeButton}
      `}
    >
      {text.title}
    </Link>
  );
};
