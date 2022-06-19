import { Link } from 'react-scroll';

import { useSiteProperties } from '@packages/config';

import styles from './Button.module.css';

interface ButtonProps {
  theme: 'primary' | 'secondary' | 'ternary';
  size: 'sm' | 'md' | 'lg';
  href?: string;
  targetHref?: string;
  buttonText?: string;
  hasPaddingLarge?: boolean;
  onClick?: () => void;
}

export const Button = ({
  hasPaddingLarge,
  theme,
  size,
  href,
  targetHref,
  buttonText,
  onClick,
}: ButtonProps) => {
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('navbar_cta_title'),
    link: valueOf('navbar_cta_link'),
  };

  return href ? (
    <a
      href={href}
      className={`${styles.button} ${
        hasPaddingLarge ? styles.paddingLarge : ''
      } ${
        theme === 'primary'
          ? styles.primary
          : theme === 'secondary'
          ? styles.secondary
          : styles.ternary
      }
    ${size === 'sm' && styles.smallButton}
    ${size === 'md' && styles.mediumButton}
    ${size === 'lg' && styles.largeButton}
    `}
      target={targetHref}
    >
      {buttonText ?? text.title}
    </a>
  ) : (
    <Link
      to={text.link || ''}
      className={`${styles.button} ${
        hasPaddingLarge ? styles.paddingLarge : ''
      } ${
        theme === 'primary'
          ? styles.primary
          : theme === 'secondary'
          ? styles.secondary
          : styles.ternary
      }
      ${size === 'sm' && styles.smallButton}
      ${size === 'md' && styles.mediumButton}
      ${size === 'lg' && styles.largeButton}
      `}
      onClick={onClick}
    >
      {buttonText ?? text.title}
    </Link>
  );
};
