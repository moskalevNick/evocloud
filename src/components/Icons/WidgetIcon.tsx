import React from 'react';

type IconType = {
  width?: string;
  height?: string;
};

export const WidgetIcon: React.FC<IconType> = ({ height = '20', width = '20' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M1 11H19V14C19 15.1046 18.1046 16 17 16H3C1.89543 16 1 15.1046 1 14V11Z"
      fill="#1D5D93"
    />
    <path
      opacity="0.6"
      d="M1 8C1 6.89543 1.89543 6 3 6H17C18.1046 6 19 6.89543 19 8V11H1V8Z"
      fill="#1D5D93"
    />
    <path d="M15 4C15 3.44772 15.4477 3 16 3C16.5523 3 17 3.44772 17 4V6H15V4Z" fill="#13426A" />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10 13C11.1046 13 12 12.1046 12 11C12 9.89543 11.1046 9 10 9C8.89543 9 8 9.89543 8 11C8 12.1046 8.89543 13 10 13Z"
      fill="#092740"
    />
  </svg>
);
