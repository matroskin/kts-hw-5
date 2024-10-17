import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import LogoIcon from 'components/icons/LogoIcon';
import ThemeSwitcher from 'components/ThemeSwitcher';
import LangSwitcher from 'components/LangSwitcher';
import styles from './Header.module.scss';

const Header = () => {
  const { t } = useTranslation();

  return (
    <div className={styles.header}>
      <div className={`content ${styles.content}`}>
        <Link to={'/'} className={styles.logo}>
          <LogoIcon />

          <Text view="p-20" weight="bold">
            {t('GitHub Client')}
          </Text>
        </Link>

        <div className={styles.controls}>
          <ThemeSwitcher />
          <LangSwitcher />
        </div>
      </div>
    </div>
  );
};

export default React.memo(Header);
