import React from 'react';
import Contributors from '../Contributors';
import Counts from '../Counts';
import Homepage from '../Homepage';
import Languages from '../Languages';
import Topics from '../Topics';
import styles from './Info.module.scss';
import { RepoContributorModel, RepoItemModel } from 'store/models/github';

interface InfoProps {
  data: RepoItemModel;
  orgs: string;
  contributors: RepoContributorModel[];
  languages: { [key: string]: number };
}

const Info: React.FC<InfoProps> = ({ data, orgs, contributors, languages }) => {
  return (
    <div className={styles.info}>
      {data.homepage && <Homepage homepage={data.homepage} />}

      <Topics topics={data.topics} />

      <Counts data={data} orgs={orgs} />

      <div className={styles.content}>
        <Contributors contributors={contributors} />

        <Languages languages={languages} />
      </div>
    </div>
  );
};

export default React.memo(Info);
