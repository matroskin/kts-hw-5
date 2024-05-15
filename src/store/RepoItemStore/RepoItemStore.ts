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
      clearData: action,
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
    await this.getRepoItem({ orgs, name });
    await this.getRepoItemContributors({ orgs, name });
    await this.getRepoItemLanguages({ orgs, name });
    await this.getRepoItemReadme({ orgs, name });
  };

  clearData = () => {
    this._repo = null;
    this._contributors = [];
    this._languages = {};
    this._readme = '';
  };

  getRepoItem = async (params: getRepoItemParams): Promise<void> => {
    if (this._meta === Meta.loading) return;

    this._meta = Meta.loading;
    this.clearData();

    const response = await ApiStore.get(`/repos/${params.orgs}/${params.name}`);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      try {
        this._repo = normalizeRepoItem(response.data);
        this._meta = Meta.success;
      } catch (error) {
        console.log(error);
        this.clearData();
        this._meta = Meta.error;
      }
    });
  };

  getRepoItemContributors = async (params: getRepoItemParams): Promise<void> => {
    if (this._meta === Meta.loading) return;

    this._meta = Meta.loading;
    this._contributors = [];

    const response = await ApiStore.get(`/repos/${params.orgs}/${params.name}/contributors`);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      try {
        const contributors = [];

        for (const item of response.data) {
          contributors.push(normalizeRepoContributor(item));
        }

        this._contributors = contributors;
        this._meta = Meta.success;
      } catch (error) {
        console.log(error);
        this._contributors = [];
        this._meta = Meta.error;
      }
    });
  };

  getRepoItemLanguages = async (params: getRepoItemParams): Promise<void> => {
    if (this._meta === Meta.loading) return;

    this._meta = Meta.loading;
    this._languages = {};

    const response = await ApiStore.get(`/repos/${params.orgs}/${params.name}/languages`);

    runInAction(() => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      try {
        this._languages = response.data;
        this._meta = Meta.success;
      } catch (error) {
        console.log(error);
        this._languages = {};
        this._meta = Meta.error;
      }
    });
  };

  getRepoItemReadme = async (params: getRepoItemParams): Promise<void> => {
    if (this._meta === Meta.loading) return;

    this._meta = Meta.loading;
    this._readme = '';

    const response = await ApiStore.get(`/repos/${params.orgs}/${params.name}/readme`, {
      access: 'application/vnd.github+json',
    });

    runInAction(async () => {
      if (response.status !== 200) {
        this._meta = Meta.error;
      }

      try {
        const decodedText = atob(response.data.content);
        const unicodeText = decodeURIComponent(escape(decodedText));
        const htmlContent = await marked(unicodeText);

        this._readme = htmlContent;
        this._meta = Meta.success;
      } catch (error) {
        console.log(error);
        this._readme = '';
        this._meta = Meta.error;
      }
    });
  };

  destroy(): void {}
}

export default RepoItemStore;
