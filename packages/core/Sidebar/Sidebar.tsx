import { FaTimes } from 'react-icons/fa';
import { Link } from 'react-scroll';
import { useMenu } from '@packages/config';

import styles from './Sidebar.module.css';

export const Sidebar = () => {
  const menuItems = useMenu();

  return (
    <aside className={`${styles.container} ${styles.isOpen}`}>
      <div className={styles.iconContainer}>
        <FaTimes className={styles.icon} />
      </div>
      <div className={styles.menuWrapper}>
        <div className={styles.menu}>
          {menuItems.map((item) => (
            <Link to={item.url} className={styles.link}>
              {item.title}
            </Link>
          ))}
        </div>
      </div>
      <div className={styles.ctaWrapper}></div>
    </aside>
  );
};
