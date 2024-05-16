import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import LogoIcon from 'components/icons/LogoIcon';
import styles from './Header.module.scss';

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={`content ${styles.content}`}>
        <Link to={'/'} className={styles.logo}>
          <LogoIcon />

          <Text view="p-20" weight="bold">
            GitHub Client
          </Text>
        </Link>

        <img className={styles.avatar} src={'/avatar.jpg'} alt="avatar" />
      </div>
    </div>
  );
};

export default React.memo(Header);
