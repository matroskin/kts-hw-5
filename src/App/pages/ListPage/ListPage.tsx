import React, { useCallback, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Meta } from 'utils/meta';
import { useLocalStore } from 'utils/useLocalStore';
import rootStore from 'store/RootStore';
import ReposStore from 'store/ReposStore';
import Text from 'components/Text';
import Loader from 'components/Loader';
import Card from './components/Card';
import Pagination from './components/Pagination';
import Input from './components/Input';
import Button from './components/Button';
import MultiDropdown, { Option } from './components/MultiDropdown';
import SearchIcon from 'components/icons/SearchIcon';
import styles from './ListPage.module.scss';

import { OPTIONS } from './config';

const ListPage: React.FC = () => {
  const navigate = useNavigate();

  const { query } = rootStore;
  const { fetchReposList, meta, repos, isNoResultsVisible, isPaginationVisible, total } = useLocalStore(
    () => new ReposStore(),
  );

  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    fetchReposList(searchParams);
  }, [searchParams]);

  const handleDropdownChange = useCallback((newValue: Option[]) => {
    query.setTypeRepos(newValue);
    query.setCurrentPage(1);
  }, []);

  const handleOpenCard = useCallback(
    (name: string) => {
      navigate(`${query.orgsName}/${name}`);
    },
    [navigate],
  );

  const handleSearch = () => {
    query.setCurrentPage(1);

    setSearchParams({
      orgs: query.orgsName,
      type: query.typeRepos.map((v) => v.value).join(','),
    });
  };

  const handlePageChange = useCallback((pageNumber: number) => {
    query.setCurrentPage(pageNumber);
  }, []);

  return (
    <div className={`page ${styles.container}`}>
      <div className={`content `}>
        <Text className="center" view="title" tag="h1">
          List of organization repositories
        </Text>

        <div className={styles.filter}>
          <MultiDropdown
            options={OPTIONS}
            value={query.typeRepos}
            onChange={handleDropdownChange}
            getTitle={(value) => value.map((v) => v.value).join(', ')}
          />
        </div>

        <form className={styles.search} onSubmit={(e) => e.preventDefault()}>
          <Input value={query.orgsName} onChange={(e) => query.setOrgsName(e)} placeholder="Enter organization name" />
          <Button onClick={handleSearch} disabled={!query.orgsName}>
            <SearchIcon />
          </Button>
        </form>

        {meta === Meta.loading ? (
          <div className={styles.loading}>
            <Loader color="accent" />
          </div>
        ) : (
          <>
            <div className={styles.list}>
              {repos.map((item) => (
                <Card
                  key={item.id}
                  image={item.owner.avatarUrl}
                  stargazers={item.stargazersCount}
                  pushed={item.pushedAt}
                  title={item.name}
                  subtitle={item.description}
                  onClick={() => handleOpenCard(item.name)}
                />
              ))}
            </div>

            {isNoResultsVisible && (
              <Text className="center" view="p-16" tag="p" color="secondary">
                No results
              </Text>
            )}

            {isPaginationVisible && (
              <Pagination currentPage={query.currentPage} totalPages={total} onPageChange={handlePageChange} />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default observer(ListPage);
