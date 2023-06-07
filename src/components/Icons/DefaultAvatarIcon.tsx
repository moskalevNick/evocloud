import React from 'react';

type AvatarType = {
  width?: string;
  height?: string;
};

export const DefaultAvatarIcon: React.FC<AvatarType> = ({ height = '28', width = '28' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="14" cy="14" r="14" fill="#094477" />
    <path
      opacity="0.5"
      d="M14.0008 13.4167C12.7121 13.4167 11.6675 12.372 11.6675 11.0833C11.6675 9.79467 12.7121 8.75 14.0008 8.75C15.2895 8.75 16.3341 9.79467 16.3341 11.0833C16.3341 12.372 15.2895 13.4167 14.0008 13.4167Z"
      fill="#148EF8"
    />
    <path
      d="M8.75038 18.7819C8.97648 15.9979 11.2361 14.5824 13.9903 14.5824C16.7832 14.5824 19.0778 15.9201 19.2488 18.7824C19.2556 18.8964 19.2488 19.2491 18.8106 19.2491C16.649 19.2491 13.4369 19.2491 9.17438 19.2491C9.02808 19.2491 8.73806 18.9336 8.75038 18.7819Z"
      fill="#148EF8"
    />
  </svg>
);
