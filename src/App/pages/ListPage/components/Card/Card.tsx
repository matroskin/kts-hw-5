import React from 'react';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import Text from 'components/Text';
import StarIcon from 'components/icons/StarIcon';
import { formatDate } from 'utils/formatDate';
import styles from './Card.module.scss';

export type CardProps = {
  /** Дополнительный classname */
  className?: string;
  /** URL изображения */
  image: string;
  /** Слот над заголовком */
  stargazers: number;
  /** Слот над заголовком */
  pushed: Date;
  /** Заголовок карточки */
  title: React.ReactNode;
  /** Описание карточки */
  subtitle: React.ReactNode;
  /** Клик на карточку */
  onClick?: React.MouseEventHandler;
};

const Card: React.FC<CardProps> = ({ className, image, stargazers, pushed, title, subtitle, onClick }) => {
  const { t } = useTranslation('list');

  const cardClassName = classnames(styles.card, className);

  return (
    <div className={cardClassName} onClick={onClick}>
      <img className={styles.image} src={image} alt="" />
      <div className={styles.content}>
        <div className={styles.text}>
          <div className={styles.top}>
            <div className={styles.star}>
              <StarIcon width={14} height={13} color="gold" />
              <Text view="p-14" tag="p" weight="medium" color="secondary">
                {stargazers}
              </Text>
            </div>

            <Text view="p-14" tag="p" weight="medium" color="secondary">
              {`${t('Updated')} ${formatDate(pushed)}`}
            </Text>
          </div>
          <div className={styles.bottom}>
            <Text view="p-20" tag="p" weight="medium" color="primary">
              {title}
            </Text>
            <Text view="p-16" tag="p" weight="normal" color="secondary">
              {subtitle}
            </Text>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(Card);
