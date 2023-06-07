import React from 'react';

type CrossEyeIconType = {
  width?: string;
  height?: string;
  fill?: string;
};

export const CrossEyeIcon: React.FC<CrossEyeIconType> = ({
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
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.31982 13.4699C8.53971 13.4893 8.76641 13.4995 9.00006 13.4995C12.6819 13.4995 15.7501 8.99953 15.7501 8.99953C15.7501 8.99953 15.2475 8.26237 14.405 7.38477L8.31982 13.4699Z"
      fill={fill}
    />
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M10.8789 4.87114C10.2807 4.64021 9.64991 4.5 9 4.5C4.09091 4.5 2.25 9 2.25 9C2.25 9 2.81255 10.3751 4.14496 11.605L6.75 9C6.75 7.75736 7.75736 6.75 9 6.75L10.8789 4.87114Z"
      fill={fill}
    />
    <rect
      opacity="0.4"
      x="3.82422"
      y="13.8281"
      width="14.25"
      height="1.5"
      transform="rotate(-45 3.82422 13.8281)"
      fill={fill}
    />
  </svg>
);
