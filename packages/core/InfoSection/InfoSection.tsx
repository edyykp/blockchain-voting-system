import { Button } from '@packages/components';
import styles from './InfoSection.module.css';

type InfoSectionProps = {
  theme: 'primary' | 'secondary';
  svgPath: string;
  subtitle: string;
  heading: string;
  topline: string;
  id: string;
  href: string;
  buttonText: string;
};
export const InfoSection = ({
  theme,
  svgPath,
  subtitle,
  heading,
  topline,
  id,
  href,
  buttonText,
}: InfoSectionProps) => {
  return (
    <div
      className={`${styles.container} ${
        theme === 'primary'
          ? styles.primaryContainer
          : styles.secondaryContainer
      }`}
      data-testid="info-section"
      id={id}
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
              <div className={styles.btnWrap} data-testid="btn-wrap">
                {theme === 'primary' && (
                  <Button
                    theme="primary"
                    size="md"
                    href={href}
                    targetHref="_blank"
                    buttonText={buttonText}
                  />
                )}
                {theme === 'secondary' && (
                  <Button
                    theme="secondary"
                    size="md"
                    href={href}
                    targetHref="_blank"
                    buttonText={buttonText}
                  />
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
                loading="lazy"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
