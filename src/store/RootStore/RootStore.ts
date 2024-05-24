import QueryParamsStore from './QueryParamsStore';
import ThemeStore from './ThemeStore';

export default class RootStore {
  readonly query = new QueryParamsStore();
  readonly theme = new ThemeStore();
}
