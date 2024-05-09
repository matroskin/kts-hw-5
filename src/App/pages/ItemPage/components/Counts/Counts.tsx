import React from 'react';
import StarIcon from 'components/icons/StarIcon';
import WatchIcon from 'components/icons/WatchIcon';
import ForkIcon from 'components/icons/ForkIcon';
import { RepoItemModel } from 'store/models/github';
import styles from './Counts.module.scss';

interface CountsProps {
  data: RepoItemModel;
  orgs: string;
}

const Counts: React.FC<CountsProps> = ({ data, orgs }) => {
  const githubUrl = `https://github.com/${orgs}/${data.name}`;

  return (
    <div className={styles.counts}>
      <a href={`${githubUrl}/stargazers`} className={styles.count}>
        <StarIcon color="secondary" />
        <div className={styles.text}>{data.stargazersCount} stars</div>
      </a>

      <a href={`${githubUrl}/watchers`} className={styles.count}>
        <WatchIcon color="secondary" />
        <div className={styles.text}>{data.subscribersCount} watching</div>
      </a>

      <a href={`${githubUrl}/forks`} className={styles.count}>
        <ForkIcon color="secondary" />
        <div className={styles.text}>{data.forksCount} forks</div>
      </a>
    </div>
  );
};

export default React.memo(Counts);
