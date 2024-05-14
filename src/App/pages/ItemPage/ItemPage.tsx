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
  const { fetchRepoData, meta, repo, contributors, languages, readme } =
    useLocalStore(() => new RepoItemStore());

  const { orgs = "", name = "" } = useParams<{ orgs: string; name: string }>();

  useEffect(() => {
    fetchRepoData(orgs, name);
  }, []);

  return (
    <div className="page">
      <div className="content">
        {meta === Meta.loading ? (
          <div className={styles.loading}>
            <Loader color="accent" />
          </div>
        ) : (
          <div className={styles.container}>
            <Title avatar={repo.owner.avatarUrl} orgs={orgs} name={repo.name} />
            <Info
              data={repo}
              orgs={orgs}
              contributors={contributors}
              languages={languages}
            />
            {readme && <Readme content={readme} />}
          </div>
        )}
      </div>
    </div>
  );
};

export default observer(ItemPage);
