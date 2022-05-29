import { Link } from 'react-scroll';

import { useMenu, useSiteProperties } from '@packages/config';

import styles from './Footer.module.css';

export const Footer = () => {
  const menu = useMenu();
  const valueOf = useSiteProperties();

  const text = {
    author: valueOf('site_author'),
  };

  return (
    <footer className={styles.footer} data-testid="footer">
      <ul className={styles.menu}>
        {menu.map((item, key) => (
          <Link to={item.url} className={styles.link} key={key}>
            {item.title}
          </Link>
        ))}
      </ul>
      <div className={styles.copyright}>
        © 2022, Proudly Coded by {text.author}
      </div>
    </footer>
  );
};
