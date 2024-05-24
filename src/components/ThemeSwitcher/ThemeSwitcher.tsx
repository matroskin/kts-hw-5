import React from 'react';
import { observer } from 'mobx-react-lite';
import rootStore from 'store/RootStore';
import Button from 'components/Button';
import SunIcon from 'components/icons/SunIcon';
import MoonIcon from 'components/icons/MoonIcon';

const ThemeSwitcher: React.FC = () => {
  const { theme } = rootStore;

  return <Button onClick={theme.toggleTheme}>{theme.theme === 'light' ? <SunIcon /> : <MoonIcon />}</Button>;
};

export default observer(ThemeSwitcher);
