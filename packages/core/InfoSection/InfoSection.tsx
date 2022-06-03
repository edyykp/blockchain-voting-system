import { Button } from '@packages/components';
import styles from './InfoSection.module.css';

type InfoSectionProps = {
  theme: 'primary' | 'secondary';
  svgPath: string;
  subtitle: string;
  heading: string;
  topline: string;
};
export const InfoSection = ({
  theme,
  svgPath,
  subtitle,
  heading,
  topline,
}: InfoSectionProps) => {
  return (
    <div
      className={`${styles.container} ${
        theme === 'primary'
          ? styles.primaryContainer
          : styles.secondaryContainer
      }`}
    >
      <div className={styles.wrapper}>
        <div
          className={`${styles.row} ${
            theme === 'primary' ? styles.primaryRow : styles.secondaryRow
          }`}
        >
          <div className={styles.column1} data-aos="fade-up">
            <div className={styles.textWrapper}>
              <p className={styles.topLine}>{topline}</p>
              <h1
                className={`${styles.heading} ${
                  theme === 'primary'
                    ? styles.primaryHeading
                    : styles.secondaryHeading
                }`}
              >
                {heading}
              </h1>
              <p
                className={`${styles.subtitle} ${
                  theme === 'primary'
                    ? styles.primarySubtitle
                    : styles.secondarySubtitle
                }`}
              >
                {subtitle}
              </p>
              <div className={styles.btnWrap}>
                {theme === 'primary' && <Button theme="primary" size="md" />}
                {theme === 'secondary' && (
                  <Button theme="secondary" size="md" />
                )}
              </div>
            </div>
          </div>
          <div className={styles.column2} data-aos="fade-up">
            <div className={styles.imgWrap}>
              <img
                className={styles.img}
                alt="info-section-img"
                src={svgPath}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
