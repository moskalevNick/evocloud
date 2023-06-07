import React from 'react';

type IconType = {
  width?: string;
  height?: string;
};

export const LayoutIcon: React.FC<IconType> = ({ height = '20', width = '20' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M2.6665 3.33337C2.11422 3.33337 1.6665 3.78109 1.6665 4.33337V5.66671C1.6665 6.21899 2.11422 6.66671 2.6665 6.66671H16.4998C17.0521 6.66671 17.4998 6.21899 17.4998 5.66671V4.33337C17.4998 3.78109 17.0521 3.33337 16.4998 3.33337H2.6665ZM8.5 8.33337C7.94772 8.33337 7.5 8.78109 7.5 9.33338V16.5C7.5 17.0523 7.94772 17.5 8.5 17.5H16.5C17.0523 17.5 17.5 17.0523 17.5 16.5V9.33337C17.5 8.78109 17.0523 8.33337 16.5 8.33337H8.5Z"
      fill="#1D5D93"
    />
    <rect
      opacity="0.5"
      x="1.6665"
      y="8.33337"
      width="4.16667"
      height="9.16667"
      rx="1"
      fill="#1D5D93"
    />
  </svg>
);
