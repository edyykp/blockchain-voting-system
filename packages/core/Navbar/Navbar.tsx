import Link from 'next/link';
import { FaBars } from 'react-icons/fa';
import { Link as LinkS } from 'react-scroll';

import styles from './Navbar.module.css';

export const Navbar = () => {
  return (
    <nav>
      <div className={styles.navbarContainer}>
        <Link href="/">
          <a className={styles.navLogo}>BVS</a>
        </Link>
        <div className={styles.mobileIcon}>
          <FaBars className={styles.faBars} />
        </div>
        <ul className={styles.navMenu}>
          <li className={styles.navItem}>
            <LinkS to="about" className={styles.navLinks}>
              About
            </LinkS>
          </li>
          <li className={styles.navItem}>
            <LinkS to="data-protection" className={styles.navLinks}>
              Data Protection
            </LinkS>
          </li>
        </ul>
        <div className={styles.navBtn}>
          <LinkS to="signin" className={styles.navBtnLink}>
            Sign in
          </LinkS>
        </div>
      </div>
    </nav>
  );
};
