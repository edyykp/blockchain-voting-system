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
            <Link
              to={item.url}
              className={styles.link}
              onClick={toggle}
              key={key}
            >
              {item.title}
            </Link>
          ))}
        </ul>
      </div>
      <div className={styles.ctaWrapper}>
        <button className={styles.cta} onClick={cta.changeText}>
          {cta.ctaText}
        </button>
      </div>
    </aside>
  );
};
