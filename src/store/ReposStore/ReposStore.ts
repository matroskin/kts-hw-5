import { IReactionDisposer, action, computed, makeObservable, observable, reaction, runInAction } from 'mobx';
import { Meta } from 'utils/meta';
import { getReposListParams } from './types';
import { RepoListItemModel, normalizeRepoListItem } from 'store/models/github';
import {
  CollectionModel,
  getInitialCollectionModel,
  linearizeCollection,
  normalizeCollection,
} from 'store/models/shared/collection';
import rootStore from 'store/RootStore';
import { ILocalStore } from 'utils/useLocalStore';
import ApiStore from 'store/ApiStore';
import { OPTIONS } from 'config/github';

type PrivateFields = '_repos' | '_total' | '_per_page' | '_meta';

class ReposStore implements ILocalStore {
  private _repos: CollectionModel<number, RepoListItemModel> = getInitialCollectionModel();
  private _total: number = 0;
  private _per_page: number = 9;
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<ReposStore, PrivateFields>(this, {
      _repos: observable.ref,
      _total: observable,
      _per_page: observable,
      _meta: observable,
      repos: computed,
      total: computed,
      isNoResultsVisible: computed,
      isPaginationVisible: computed,
      meta: computed,
      getReposList: action,
      destroy: action,
    });
  }

  get repos(): RepoListItemModel[] {
    return linearizeCollection(this._repos);
  }

  get total(): number {
    return this._total;
  }

  get isNoResultsVisible(): boolean {
    return this.repos.length === 0;
  }

  get isPaginationVisible(): boolean {
    return this._total > 0 && this._total > this._per_page;
  }

  get meta(): Meta {
    return this._meta;
  }

  getReposList = async (params: getReposListParams): Promise<void> => {
    if (this._meta === Meta.loading) return;

    this._meta = Meta.loading;
    this._repos = getInitialCollectionModel();

    try {
      const response = await ApiStore.get(`/orgs/${params.name}/repos`, {
        type: params.type,
        per_page: this._per_page,
        page: params.page,
      });

      runInAction(() => {
        const headersLink = response.headers.link;
        if (headersLink) {
          const match = headersLink.match(/(?<=[?&])page=(\d+)(?=[^>]*>; rel="last")/);
          if (match && match[1]) {
            this._total = parseInt(match[1]);
          }
        } else {
          this._total = 0;
        }

        const repos: RepoListItemModel[] = [];

        for (const item of response.data) {
          repos.push(normalizeRepoListItem(item));
        }

        this._repos = normalizeCollection(repos, (item) => item.id);
        this._meta = Meta.success;
      });
    } catch (error) {
      console.log(error);
      this._repos = getInitialCollectionModel();
      this._meta = Meta.error;
    }
  };

  fetchReposList = async (searchParams: URLSearchParams): Promise<void> => {
    const search = searchParams.get('orgs');
    const type = searchParams.get('type');
    const page = Number(searchParams.get('page'));

    if (search) {
      rootStore.query.setOrgsName(search);
    }

    if (type) {
      rootStore.query.setTypeRepos(OPTIONS.filter((v) => type.includes(v.value)));
    }

    if (page) {
      rootStore.query.setCurrentPage(page);
    }

    if (!search) {
      rootStore.query.setOrgsName('');
      rootStore.query.setTypeRepos([{ key: 'all', value: 'all' }]);
      rootStore.query.setCurrentPage(1);
      return;
    }

    await this.getReposList({
      name: rootStore.query.getParams('orgs'),
      page: rootStore.query.getParams('page'),
      type: rootStore.query.getParams('type'),
    });
  };

  private readonly _searchReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParams('orgs'),
    (orgs) => {
      if (!orgs) return;

      rootStore.query.setOrgsName(orgs.toString());
      rootStore.query.setCurrentPage(1);
    },
  );

  private readonly _typeReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParams('type'),
    (type) => {
      if (!type) return;

      const selectedOptions = type
        .toString()
        .split(',')
        .map((item) => item.trim());
      const filteredOptions = OPTIONS.filter((option) => selectedOptions.includes(option.key));

      rootStore.query.setTypeRepos(filteredOptions);
      rootStore.query.setCurrentPage(1);
    },
  );

  private readonly _pageReaction: IReactionDisposer = reaction(
    () => rootStore.query.getParams('page'),
    (page) => {
      if (!page) return;

      rootStore.query.setCurrentPage(parseInt(page as string, 10) || 1);
    },
  );

  destroy = () => {
    this._searchReaction();
    this._typeReaction();
    this._pageReaction();
  };
}

export default ReposStore;
