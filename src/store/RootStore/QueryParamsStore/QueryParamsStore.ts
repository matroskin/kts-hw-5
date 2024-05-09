import { action, makeObservable, observable } from 'mobx';
import * as qs from 'qs';

export type queryParamsType = undefined | string | string[] | qs.ParsedQs | qs.ParsedQs[];

type PrivateFields = '_params';

export default class QueryParamsStore {
  private _params: qs.ParsedQs = {};
  private _search: string = '';

  constructor() {
    makeObservable<QueryParamsStore, PrivateFields>(this, {
      _params: observable.ref,
      setSearch: action,
    });
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
