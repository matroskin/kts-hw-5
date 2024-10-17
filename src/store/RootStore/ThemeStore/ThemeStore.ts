import { action, computed, makeObservable, observable } from 'mobx';

type Theme = 'light' | 'dark';

type PrivateFields = '_theme';

export default class ThemeStore {
  private _theme: Theme = 'light';

  constructor() {
    makeObservable<ThemeStore, PrivateFields>(this, {
      _theme: observable,
      theme: computed,
      toggleTheme: action,
    });

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      this._theme = savedTheme as Theme;
    }
  }

  get theme(): Theme {
    return this._theme;
  }

  toggleTheme = () => {
    this._theme = this._theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', this._theme);
  };
}
