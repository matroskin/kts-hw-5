import * as qs from 'qs';
import { action, computed, makeObservable, observable } from 'mobx';

export type Option = {
  key: string;
  value: string;
};

export type queryParamsType = undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[];

type PrivateFields = '_params' | '_typeRepos' | '_orgsName' | '_currentPage';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';
  private _typeRepos: Option[] = [{ key: 'all', value: 'all' }];
  private _orgsName: string = '';
  private _currentPage: number = 1;

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      _orgsName: observable,
      _typeRepos: observable,
      _currentPage: observable,
      orgsName: computed,
      typeRepos: computed,
      currentPage: computed,
      setSearch: action,
      setOrgsName: action,
      setTypeRepos: action,
      setCurrentPage: action,
    });
  }

  get orgsName(): string {
    return this._orgsName;
  }

  get typeRepos(): Option[] {
    return this._typeRepos;
  }

  get currentPage(): number {
    return this._currentPage;
  }

  setOrgsName(orgsName: string) {
    this._orgsName = orgsName;
  }

  setTypeRepos(typeRepos: Option[]) {
    this._typeRepos = typeRepos;
  }

  setCurrentPage(currentPage: number) {
    this._currentPage = currentPage;
  }

  getParams(key: string): queryParamsType {
    return this._params[key];
  }

  setSearch(search: string) {
    search = search.startsWith('?') ? search.slice(1) : search;

    if (search !== this._search) {
      this._search = search;
      this._params = qs.parse(search);
    }
  }
}
