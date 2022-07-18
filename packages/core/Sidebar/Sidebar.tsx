import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';

import { useMenu, useAuthContext } from '@packages/config';

import styles from './Sidebar.module.css';

interface SidebarProps {
  isOpen: boolean;
  toggle: () => void;
}

export const Sidebar = ({ isOpen, toggle }: SidebarProps) => {
  const cta = useAuthContext();
  const menuItems = useMenu();

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
      </div>
    </aside>
  );
};
