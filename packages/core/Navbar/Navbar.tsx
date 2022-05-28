import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { Link as LinkS } from 'react-scroll';

import { useMenu, useSiteProperties } from '@packages/config';
import { Button } from '@packages/components';

import styles from './Navbar.module.css';

interface NavbarProps {
  toggle: () => void;
}

export const Navbar = ({ toggle }: NavbarProps) => {
  const menuItems = useMenu();
  const valueOf = useSiteProperties();

  const text = {
    logo: valueOf('site_title'),
  };

  return (
    <nav data-testid="navigation-bar">
      <div className={styles.container} data-testid="navigation-bar-logo">
        <Link href="/">
          <a className={styles.logo}>{text.logo}</a>
        </Link>
        <div className={styles.mobileMenuIcon} data-testid="mobile-menu-icon">
          <FaBars className={styles.faBars} onClick={toggle} />
        </div>
        <ul className={styles.menu} data-testid="navigation-bar-menu">
          {menuItems.map((item, key) => (
            <li className={styles.menuItem} key={key}>
              <LinkS to={item.url} className={styles.menuUrls}>
                {item.title}
              </LinkS>
            </li>
          ))}
        </ul>
        <div className={styles.ctaContainer} data-testid="navigation-bar-cta">
          <Button />
        </div>
      </div>
    </nav>
  );
};
