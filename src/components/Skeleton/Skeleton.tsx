import React, { CSSProperties, memo } from 'react';
import styles from './Skeleton.module.scss';

interface SkeletonProps {
  width?: string;
  height?: string;
  radius?: string;
}

const Skeleton = (props: SkeletonProps) => {
  const { width, height, radius } = props;

  const skeletonStyles: CSSProperties = {
    width,
    height,
    borderRadius: radius,
  };

  return <div className={styles.skeleton} style={skeletonStyles}></div>;
};

export default memo(Skeleton);
