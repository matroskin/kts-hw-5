import React from 'react';
import styles from './Topics.module.scss';

interface TopicsProps {
  topics: string[];
}

const Topics: React.FC<TopicsProps> = ({ topics }) => {
  return (
    <div className={styles.topics}>
      {topics.map((topic) => (
        <a href={`https://github.com/topics/${topic}`} className={styles.topic} key={topic}>
          {topic}
        </a>
      ))}
    </div>
  );
};

export default React.memo(Topics);
