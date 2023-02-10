import React from 'react';

type CircleIconType = {
  width?: string;
  height?: string;
  fill?: string;
};

export const CircleIcon: React.FC<CircleIconType> = ({
  height = '6',
  width = '6',
  fill = '#F83068',
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="3" cy="3" r="3" fill={fill} />
  </svg>
);
//#13DA92
