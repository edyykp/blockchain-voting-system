import { Link } from 'react-scroll';
import Image from 'next/image';

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
  iconLink?: string;
}

export const Button = ({
  hasPaddingLarge,
  theme,
  size,
  href,
  targetHref,
  buttonText,
  onClick,
  iconLink,
}: ButtonProps) => {
  const valueOf = useSiteProperties();

  const text = {
    title: valueOf('navbar_cta_title'),
    link: valueOf('navbar_cta_link'),
  };

  const iconSize = {
    sm: 15,
    md: 20,
    lg: 30,
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
      <span>{buttonText ?? text.title}</span>
      {iconLink && (
        <Image
          src={iconLink}
          alt={iconLink}
          width={iconSize[size]}
          height={iconSize[size]}
          className={styles.icon}
        />
      )}
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
      <span>{buttonText ?? text.title}</span>{' '}
      {iconLink && (
        <Image
          src={iconLink}
          alt={iconLink}
          width={iconSize[size]}
          height={iconSize[size]}
          className={styles.icon}
        />
      )}
    </Link>
  );
};
