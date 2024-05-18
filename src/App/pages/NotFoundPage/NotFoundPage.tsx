import React from 'react';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import styles from './NotFoundPage.module.scss';

const NotFoundPage = () => {
  const { t } = useTranslation();

  return (
    <div className={`page ${styles.container}`}>
      <Text view="title" weight="bold" color="accent">
        404
      </Text>
      <Text view="title" weight="medium" color="secondary">
        {t('Page Not Found')}
      </Text>
    </div>
  );
};

export default NotFoundPage;
