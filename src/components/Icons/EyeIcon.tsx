import React from 'react';

type EyeIconType = {
  width?: string;
  height?: string;
  fill?: string;
};

export const EyeIcon: React.FC<EyeIconType> = ({
  height = '18',
  width = '18',
  fill = '#5183B1',
}) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.4"
      d="M2.25 9C2.25 9 4.09091 4.5 9 4.5C12.6818 4.5 15.75 9 15.75 9C15.75 9 12.6818 13.5 9 13.5C4.09091 13.5 2.25 9 2.25 9Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M9 11.25C7.75736 11.25 6.75 10.2426 6.75 9C6.75 7.75736 7.75736 6.75 9 6.75C10.2426 6.75 11.25 7.75736 11.25 9C11.25 10.2426 10.2426 11.25 9 11.25Z"
      fill={fill}
    />
  </svg>
);
