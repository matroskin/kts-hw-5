import React from 'react';
import { useNavigate } from 'react-router-dom';
import Text from 'components/Text';
import ArrowIcon from 'components/icons/ArrowIcon';
import styles from './Title.module.scss';

interface TitleProps {
  avatar: string;
  orgs: string;
  name: string;
}

const Title: React.FC<TitleProps> = ({ avatar, orgs, name }) => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  return (
    <div className={styles.title}>
      <div className={styles.back}>
        <ArrowIcon onClick={() => handleBack()} />
      </div>

      <img src={avatar} className={styles.avatar} alt="avatar" />

      <Text view="title" weight="bold">
        {name}
      </Text>
    </div>
  );
};

export default React.memo(Title);
