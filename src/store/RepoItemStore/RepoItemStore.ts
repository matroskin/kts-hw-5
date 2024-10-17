import { marked } from 'marked';
import { action, computed, makeObservable, observable, runInAction } from 'mobx';
import { Meta } from 'utils/meta';
import { getRepoItemParams } from './types';
import { RepoItemModel, normalizeRepoItem, RepoContributorModel, normalizeRepoContributor } from 'store/models/github';
import { ILocalStore } from 'utils/useLocalStore';
import ApiStore from 'store/ApiStore';

type PrivateFields = '_repo' | '_contributors' | '_languages' | '_readme' | '_meta';

class RepoItemStore implements ILocalStore {
  private _repo: RepoItemModel | null = null;
  private _contributors: RepoContributorModel[] = [];
  private _languages: { [key: string]: number } = {};
  private _readme: string = '';
  private _meta: Meta = Meta.initial;

  constructor() {
    makeObservable<RepoItemStore, PrivateFields>(this, {
      _repo: observable.ref,
      _contributors: observable,
      _languages: observable.ref,
      _readme: observable,
      _meta: observable,
      repo: computed,
      contributors: computed,
      languages: computed,
      readme: computed,
      meta: computed,
      getRepoItem: action,
      getRepoItemContributors: action,
      getRepoItemLanguages: action,
      getRepoItemReadme: action,
    });
  }

  get repo(): RepoItemModel | null {
    return this._repo;
  }

  get contributors(): RepoContributorModel[] {
    return this._contributors;
  }

  get readme(): string {
    return this._readme;
  }

  get languages(): { [key: string]: number } {
    return this._languages;
  }

  get meta(): Meta {
    return this._meta;
  }

  fetchRepoData = async (orgs: string, name: string): Promise<void> => {
    if (this._meta === Meta.loading) return;

    this._meta = Meta.loading;

    try {
      const promises = [
        this.getRepoItem({ orgs, name }),
        this.getRepoItemContributors({ orgs, name }),
        this.getRepoItemLanguages({ orgs, name }),
        this.getRepoItemReadme({ orgs, name }),
      ];
      await Promise.all(promises);

      this._meta = Meta.success;
    } catch (error) {
      console.log(error);
      this._meta = Meta.error;
    }
  };

  getRepoItem = async (params: getRepoItemParams): Promise<void> => {
    this._repo = null;
    this._contributors = [];
    this._languages = {};
    this._readme = '';

    const response = await ApiStore.get(`/repos/${params.orgs}/${params.name}`);

    runInAction(() => {
      this._repo = normalizeRepoItem(response.data);
    });
  };

  getRepoItemContributors = async (params: getRepoItemParams): Promise<void> => {
    this._contributors = [];

    const response = await ApiStore.get(`/repos/${params.orgs}/${params.name}/contributors`);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      const contributors = [];

      for (const item of response.data) {
        contributors.push(normalizeRepoContributor(item));
      }

      this._contributors = contributors;
    });
  };

  getRepoItemLanguages = async (params: getRepoItemParams): Promise<void> => {
    this._languages = {};

    const response = await ApiStore.get(`/repos/${params.orgs}/${params.name}/languages`);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      this._languages = response.data;
    });
  };

  getRepoItemReadme = async (params: getRepoItemParams): Promise<void> => {
    this._readme = '';

    const response = await ApiStore.get(`/repos/${params.orgs}/${params.name}/readme`, {
      access: 'application/vnd.github+json',
    });

    runInAction(async () => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      const decodedText = atob(response.data.content);
      const unicodeText = decodeURIComponent(escape(decodedText));
      const htmlContent = await marked(unicodeText);

      this._readme = htmlContent;
    });
  };

  destroy(): void {}
}

export default RepoItemStore;
