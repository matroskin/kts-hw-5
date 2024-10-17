import React from 'react';
import classnames from 'classnames';
import Loader from 'components/Loader';
import styles from './Button.module.scss';

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  /** Состояние загрузки */
  loading?: boolean;
  /** Текст кнопки */
  children: React.ReactNode;
};

const Button: React.FC<ButtonProps> = ({ loading, children, className, onMouseOver, ...props }) => {
  const buttonClassName = classnames(styles.button, className, {
    loading: loading,
  });

  return (
    <button disabled={loading} {...props} className={buttonClassName} onMouseOver={onMouseOver}>
      {loading && <Loader color="primary" size="s" />}
      {children}
    </button>
  );
};
export default React.memo(Button);
