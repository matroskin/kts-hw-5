import React from 'react';
import styles from './Languages.module.scss';

interface LanguagesProps {
  languages: { [key: string]: number };
}

const Languages: React.FC<LanguagesProps> = ({ languages }) => {
  const totalLines = Object.values(languages).reduce((acc, cur) => acc + cur, 0);

  return (
    <div className={styles.languages}>
      <div className={styles.title}>Languages</div>
      <div className={styles.progress}>
        {Object.entries(languages).map(([language, count]) => (
          <div
            key={language}
            className={`${styles.progressItem} ${language}`}
            style={{ width: `${((count / totalLines) * 100).toFixed(1)}%` }}
          />
        ))}
      </div>

      <ul className={styles.list}>
        {Object.entries(languages).map(([language, count]) => (
          <li key={language} className={styles.item}>
            <span className={`${styles.dot} ${language}`}></span>
            <span className={styles.lang}>{language}</span>{' '}
            <span className={styles.percentage}>{((count / totalLines) * 100).toFixed(1)}%</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default React.memo(Languages);
