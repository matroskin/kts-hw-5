import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";
import RepoItemStore from "store/RepoItemStore";
import Loader from "components/Loader";
import Title from "./components/Title";
import Info from "./components/Info";
import Readme from "./components/Readme";
import styles from "./ItemPage.module.scss";

const ItemPage = () => {
  const repoItemStore = useLocalStore(() => new RepoItemStore());

  const { orgs = "", name } = useParams<{ orgs: string; name: string }>();

  useEffect(() => {
    const fetchData = async () => {
      await repoItemStore.getRepoItem({ orgs: orgs, name: name });
      await repoItemStore.getRepoItemContributors({ orgs: orgs, name: name });
      await repoItemStore.getRepoItemLanguages({ orgs: orgs, name: name });
      await repoItemStore.getRepoItemReadme({ orgs: orgs, name: name });
    };

    fetchData();
  }, [name, orgs]);

  return (
    <div className="page">
      <div className="content">
        {repoItemStore.meta === Meta.loading ? (
          <div className={styles.loading}>
            <Loader color="accent" />
          </div>
        ) : (
          <div className={styles.container}>
            <Title
              avatar={repoItemStore.repo.owner.avatarUrl}
              orgs={orgs}
              name={repoItemStore.repo.name}
            />
            <Info
              data={repoItemStore.repo}
              orgs={orgs}
              contributors={repoItemStore.contributors}
              languages={repoItemStore.languages}
            />
            {repoItemStore.readme && <Readme content={repoItemStore.readme} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(ItemPage);
