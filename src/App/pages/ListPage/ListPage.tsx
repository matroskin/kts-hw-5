import React, { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { observer } from "mobx-react-lite";
import { Meta } from "utils/meta";
import { useLocalStore } from "utils/useLocalStore";
import rootStore from "store/RootStore";
import ReposStore from "store/ReposStore";
import Text from "components/Text";
import Loader from "components/Loader";
import Card from "./components/Card";
import Pagination from "./components/Pagination";
import Input from "./components/Input";
import Button from "./components/Button";
import MultiDropdown, { Option } from "./components/MultiDropdown";
import SearchIcon from "components/icons/SearchIcon";
import styles from "./ListPage.module.scss";

import { OPTIONS } from "./config";

const ListPage: React.FC = () => {
  const navigate = useNavigate();

  const reposStore = useLocalStore(() => new ReposStore());

  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedValues, setSelectedValues] = useState<Option[]>([]);

  useEffect(() => {
    const searchParam = rootStore.query.getParams("search");
    if (!searchParam) {
      return;
    }
    reposStore.getReposList({
      name: rootStore.query.getParams("search"),
      page: rootStore.query.getParams("page"),
      type: rootStore.query.getParams("type"),
    });
  }, [searchParams]);

  useEffect(() => {
    const search = searchParams.get("search");
    const type = searchParams.get("type");
    const page = Number(searchParams.get("page"));

    if (search) {
      reposStore.setOrgsName(search);
    }

    if (type) {
      reposStore.setType(type);
      setSelectedValues(OPTIONS.filter((v) => type.includes(v.value)));
    }

    if (page) {
      reposStore.setCurrentPage(page);
    }
  }, []);

  const handleDropdownChange = useCallback((newValue: Option[]) => {
    setSelectedValues(newValue);
    reposStore.setCurrentPage(1);
  }, []);

  const handleClick = useCallback(
    (orgs: string, name: string) => {
      navigate(`${orgs}/${name}`);
    },
    [navigate],
  );

  const handleSearch = () => {
    setSearchParams({
      search: reposStore.orgsName,
      type: selectedValues.map((v) => v.value).join(",") || "all",
    });
  };

  const handlePageChange = useCallback(
    (pageNumber: number) => {
      reposStore.setCurrentPage(pageNumber);
      if (selectedValues.length) {
        const typeString = selectedValues.map((v) => v.value).join(",");
        reposStore.setType(typeString);
      }
    },
    [selectedValues],
  );

  return (
    <div className={`page ${styles.container}`}>
      <div className={`content `}>
        <Text className="center" view="title" tag="h1">
          List of organization repositories
        </Text>

        <div className={styles.filter}>
          <MultiDropdown
            options={OPTIONS}
            value={selectedValues}
            onChange={handleDropdownChange}
            getTitle={(value) => value.map((v) => v.value).join(", ")}
          />
        </div>

        <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
          <Input
            value={reposStore.orgsName}
            onChange={(e) => reposStore.setOrgsName(e)}
            placeholder="Enter organization name"
          />
          <Button onClick={handleSearch} disabled={!reposStore.orgsName}>
            <SearchIcon />
          </Button>
        </form>

        {reposStore.meta === Meta.loading ? (
          <div className={styles.loading}>
            <Loader color="accent" />
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {reposStore.repos.map((item) => (
                <Card
                  key={item.id}
                  image={item.owner.avatarUrl}
                  stargazers={item.stargazersCount}
                  pushed={item.pushedAt}
                  title={item.name}
                  subtitle={item.description}
                  onClick={() => handleClick(item.owner.login, item.name)}
                />
              ))}
            </div>

            {reposStore.isNoResultsVisible && (
              <Text className="center" view="p-16" tag="p" color="secondary">
                No results
              </Text>
            )}

            {reposStore.isPaginationVisible && (
              <Pagination
                currentPage={reposStore.current}
                totalPages={reposStore.total}
                onPageChange={handlePageChange}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default observer(ListPage);
