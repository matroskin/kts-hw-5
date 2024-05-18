import React from 'react';
import { useTranslation } from 'react-i18next';
import { RepoContributorModel } from 'store/models/github';
import styles from './Contributors.module.scss';

interface ContributorsProps {
  contributors: RepoContributorModel[];
}

const Contributors: React.FC<ContributorsProps> = ({ contributors }) => {
  const { t } = useTranslation('item');

  const contributorsCount = contributors.length;

  return (
    <div className={styles.contributors}>
      <div className={styles.title}>
        <span>{t("Contributors")}</span>
        <span className={styles.counts}>{contributorsCount}</span>
      </div>
      {contributors.map((contributor) => (
        <a key={contributor.id} href={contributor.htmlUrl} className={styles.contributor}>
          <img src={contributor.avatarUrl} alt={contributor.login} className={styles.avatar} />
          <div className={styles.name}>{contributor.login}</div>
        </a>
      ))}
    </div>
  );
};

export default React.memo(Contributors);
