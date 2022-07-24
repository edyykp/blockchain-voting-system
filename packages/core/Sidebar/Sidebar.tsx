import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { AuthUser } from 'next-firebase-auth';

import { useMenu, useAuthContext, useSiteProperties } from '@packages/config';
import { Button } from '@packages/components';

import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
  user: AuthUser;
}

export const Sidebar = ({ isOpen, toggle, user }: SidebarProps) => {
  const cta = useAuthContext();
  const valueOf = useSiteProperties();
  const menuItems = useMenu();

  const text = {
    logoutButton: valueOf('logout_button_text'),
  };

  return (
    <aside
      className={`${styles.container} ${isOpen ? `${styles.isOpen}` : ''}`}
      data-testid="sidebar"
    >
      <div className={styles.iconContainer}>
        <FaTimes className={styles.icon} onClick={toggle} />
      </div>
      <div className={styles.menuWrapper}>
        <ul className={styles.menu}>
          {menuItems.map((item, key) => (
            <li key={key}>
              <Link to={item.url} className={styles.link} onClick={toggle}>
                {item.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.ctaWrapper}>
        {user && user.email ? (
          <Button
            theme="secondary"
            size="md"
            buttonText={text.logoutButton}
            onClick={() => user.signOut()}
          />
        ) : (
          <Link
            to="home"
            smooth={true}
            duration={500}
            spy={true}
            offset={-80}
            className={styles.cta}
            onClick={() => {
              cta.changeText();
              toggle();
            }}
          >
            {cta.ctaText}
          </Link>
        )}
      </div>
    </aside>
  );
};
