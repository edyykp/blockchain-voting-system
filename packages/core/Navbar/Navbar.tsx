import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { Link as LinkS } from 'react-scroll';

import { useMenu, useSiteProperties } from '@packages/config';

import styles from './Navbar.module.css';

export const Navbar = () => {
  const menuItems = useMenu();
  const valueOf = useSiteProperties();

  const text = {
    logo: valueOf('site_title'),
    cta_title: valueOf('navbar_cta_title'),
    cta_link: valueOf('navbar_cta_link'),
  };

  return (
    <nav data-testid="navigation-bar-desktop">
      <div className={styles.navbarContainer} data-testid="navigation-bar-logo">
        <Link href="/">
          <a className={styles.navLogo}>{text.logo}</a>
        </Link>
        <div className={styles.mobileIcon} data-testid="mobile-menu-icon">
          <FaBars className={styles.faBars} />
        </div>
        <ul className={styles.navMenu} data-testid="navigation-bar-menu">
          {menuItems.map((item, key) => {
            return (
              <li className={styles.navItem} key={key}>
                <LinkS to={item.url} className={styles.navLinks}>
                  {item.title}
                </LinkS>
              </li>
            );
          })}
        </ul>
        <div className={styles.navBtn} data-testid="navigation-bar-cta">
          <LinkS to={text.cta_link || ''} className={styles.navBtnLink}>
            {text.cta_title}
          </LinkS>
        </div>
      </div>
    </nav>
  );
};
