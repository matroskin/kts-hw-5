import React from 'react';
import styles from './Readme.module.scss';

interface ReadmeProps {
  content: string;
}

const Readme: React.FC<ReadmeProps> = ({ content }) => {
  return (
    <div className={styles.readme}>
      <div className={styles.title}>README.md</div>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: content }} />
    </div>
  );
};

export default React.memo(Readme);
