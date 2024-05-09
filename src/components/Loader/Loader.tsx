import React from 'react';
import cn from 'classnames';
import LoaderSizeLIcon from 'components/icons/LoaderSizeLIcon';
import LoaderSizeMIcon from 'components/icons/LoaderSizeMIcon';
import LoaderSizeSIcon from 'components/icons/LoaderSizeSIcon';
import styles from './Loader.module.scss';

export type LoaderProps = {
  /** Размер */
  size?: 's' | 'm' | 'l';
  /** Дополнительный класс */
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
};

const Loader: React.FC<LoaderProps> = ({ size = 'l', className, color }) => {
  let svgContent;

  const props = React.useMemo(
    () => ({
      color,
      className: cn(styles.loader, className),
    }),
    [color, className],
  );

  switch (size) {
    case 's':
      svgContent = <LoaderSizeSIcon {...props} />;
      break;
    case 'm':
      svgContent = <LoaderSizeMIcon {...props} />;
      break;
    case 'l':
      svgContent = <LoaderSizeLIcon {...props} />;
      break;
  }

  return svgContent;
};

export default Loader;
