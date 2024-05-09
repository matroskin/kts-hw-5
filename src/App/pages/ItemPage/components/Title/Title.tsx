import React from 'react';
import { Link } from 'react-router-dom';
import Text from 'components/Text';
import ArrowIcon from 'components/icons/ArrowIcon';
import styles from './Title.module.scss';

interface TitleProps {
  avatar: string;
  orgs: string;
  name: string;
}

const Title: React.FC<TitleProps> = ({ avatar, orgs, name }) => {
  return (
    <div className={styles.title}>
      <Link to={`/?search=${orgs}`} className={styles.link}>
        <ArrowIcon />
      </Link>

      <img src={avatar} className={styles.avatar} alt="avatar" />

      <Text view="title" weight="bold">
        {name}
      </Text>
    </div>
  );
};

export default React.memo(Title);
