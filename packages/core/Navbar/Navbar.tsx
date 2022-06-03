import { useEffect, useState } from 'react';
import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { Link as LinkS } from 'react-scroll';

import { useMenu, useSiteProperties, useAuthContext } from '@packages/config';

import styles from './Navbar.module.css';

interface NavbarProps {
  toggle: () => void;
}

export const Navbar = ({ toggle }: NavbarProps) => {
  const cta = useAuthContext();
  const menuItems = useMenu();
  const valueOf = useSiteProperties();

  const [scrollNav, setScrollNav] = useState(false);

  const changeNav = () => {
    if (window.scrollY >= 80) {
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeNav);
  }, []);

  const text = {
    logo: valueOf('site_title'),
  };

  return (
    <nav
      data-testid="navigation-bar"
      className={`${scrollNav ? styles.backgroundColor : ''}`}
    >
      <div className={styles.container} data-testid="navigation-bar-logo">
        <Link href="/">
          <a className={`${styles.logo} ${scrollNav ? styles.logoColor : ''}`}>
            {text.logo}
          </a>
        </Link>
        <div className={styles.mobileMenuIcon} data-testid="mobile-menu-icon">
          <FaBars className={styles.faBars} onClick={toggle} />
        </div>
        <ul className={styles.menu} data-testid="navigation-bar-menu">
          {menuItems.map((item, key) => (
            <li className={styles.menuItem} key={key}>
              <LinkS
                to={item.url}
                className={`${styles.menuUrls} ${
                  scrollNav ? styles.urlColor : ''
                }`}
                smooth={true}
                duration={500}
                spy={true}
                offset={-80}
                activeClass={styles.active}
              >
                {item.title}
              </LinkS>
            </li>
          ))}
        </ul>
        <div className={styles.ctaContainer} data-testid="navigation-bar-cta">
          <button
            className={`${styles.cta} ${
              scrollNav ? styles.secondary : styles.primary
            }`}
            onClick={cta.changeText}
          >
            {cta.ctaText}
          </button>
        </div>
      </div>
    </nav>
  );
};
