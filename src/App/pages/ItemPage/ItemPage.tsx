import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import RepoItemStore from 'store/RepoItemStore';
import Skeleton from 'components/Skeleton';
import Title from './components/Title';
import Info from './components/Info';
import Readme from './components/Readme';
import styles from './ItemPage.module.scss';

const ItemPage = () => {
  const { fetchRepoData, meta, repo, contributors, languages, readme } = useLocalStore(() => new RepoItemStore());

  const { orgs = '', name = '' } = useParams<{ orgs: string; name: string }>();

  useEffect(() => {
    fetchRepoData(orgs, name);
  }, []);

  return (
    <div className="page">
      <div className="content">
        {meta === Meta.loading ? (
          <div className={styles.loading}>
            <Skeleton width="65%" height="48px" radius="6px" />
            <Skeleton width="35%" height="22px" radius="6px" />
            <Skeleton width="20%" height="70px" radius="6px" />
            <Skeleton width="50%" height="150px" radius="6px" />
          </div>
        ) : (
          repo && (
            <div className={styles.container}>
              <Title avatar={repo.owner.avatarUrl} orgs={orgs} name={repo.name} />
              <Info data={repo} orgs={orgs} contributors={contributors} languages={languages} />
              {readme && <Readme content={readme} />}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default observer(ItemPage);
