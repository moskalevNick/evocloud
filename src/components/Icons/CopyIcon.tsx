import React from 'react';

type CopyType = {
  width?: string;
  height?: string;
};

export const CopyIcon: React.FC<CopyType> = ({ height = '20', width = '20' }) => (
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
      d="M5 7.5H4.31818C3.13959 7.5 2.5 8.13959 2.5 9.31818V15.6818C2.5 16.8604 3.13959 17.5 4.31818 17.5H10.6818C11.8604 17.5 12.5 16.8604 12.5 15.6818V15H8C6.34315 15 5 13.6569 5 12V7.5Z"
      fill="#148EF8"
    />
    <path
      opacity="0.5"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8.48469 3.33337H14.8483C16.0269 3.33337 16.6665 3.97297 16.6665 5.15156V11.5152C16.6665 12.6938 16.0269 13.3334 14.8483 13.3334H8.48469C7.3061 13.3334 6.6665 12.6938 6.6665 11.5152V5.15156C6.6665 3.97297 7.3061 3.33337 8.48469 3.33337Z"
      fill="#148EF8"
    />
  </svg>
);
