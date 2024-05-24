import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import Button from 'components/Button';
import styles from './LangSwitcher.module.scss';

const LangSwitcher: React.FC = () => {
  const { t, i18n } = useTranslation();

  const toggle = () => {
    i18n.changeLanguage(i18n.language === 'en' ? 'ru' : 'en');
  };

  return (
    <Button className={styles.lang} onClick={toggle}>
      <Text view="p-16" weight="normal">
        {t('Language')}
      </Text>
    </Button>
  );
};

export default LangSwitcher;
