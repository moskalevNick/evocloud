import React from 'react';

type AvatarType = {
  width?: string;
  height?: string;
};

export const AvatarProfileIcon: React.FC<AvatarType> = ({ height = '40', width = '40' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <mask id="mask0_6251_85129" maskUnits="userSpaceOnUse" x="0" y="0" width="40" height="40">
      <rect width="40" height="40" rx="8" fill="#F3F7F9" />
    </mask>
    <g mask="url(#mask0_6251_85129)">
      <rect width="40" height="40" fill="#094477" />
      <path
        opacity="0.5"
        d="M20.0012 19.25C18.3443 19.25 17.0012 17.9069 17.0012 16.25C17.0012 14.5931 18.3443 13.25 20.0012 13.25C21.658 13.25 23.0012 14.5931 23.0012 16.25C23.0012 17.9069 21.658 19.25 20.0012 19.25Z"
        fill="#148EF8"
      />
      <path
        d="M13.2505 26.1482C13.5412 22.5687 16.4464 20.7488 19.9875 20.7488C23.5784 20.7488 26.5287 22.4687 26.7484 26.1488C26.7572 26.2954 26.7484 26.7488 26.185 26.7488C23.4058 26.7488 19.276 26.7488 13.7956 26.7488C13.6075 26.7488 13.2347 26.3432 13.2505 26.1482Z"
        fill="#148EF8"
      />
    </g>
  </svg>
);
