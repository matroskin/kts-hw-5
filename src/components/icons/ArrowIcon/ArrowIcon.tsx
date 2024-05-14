import React from 'react';

export type ArrowIconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  direction?: 'left' | 'right';
};

const ArrowIcon: React.FC<ArrowIconProps> = ({ width = 32, height = 32, direction = 'right', ...props }) => {
  const transform = direction === 'left' ? 'rotateY(180deg)' : '';

  return (
    <svg
      width={width}
      height={height}
      style={{ transform }}
      {...props}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M20.1201 26.56L11.4268 17.8667C10.4001 16.84 10.4001 15.16 11.4268 14.1333L20.1201 5.44"
        strokeWidth="1.5"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
        stroke="currentColor"
      />
    </svg>
  );
};

export default React.memo(ArrowIcon);
