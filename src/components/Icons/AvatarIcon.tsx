import React from 'react';

type AvatarType = {
  width?: string;
  height?: string;
};

export const AvatarIcon: React.FC<AvatarType> = ({ height = '64', width = '64' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="32" cy="32" r="32" fill="#0C416C" />
    <path
      opacity="0.5"
      d="M32.0023 29.6667C29.0568 29.6667 26.6689 27.2789 26.6689 24.3333C26.6689 21.3878 29.0568 19 32.0023 19C34.9478 19 37.3356 21.3878 37.3356 24.3333C37.3356 27.2789 34.9478 29.6667 32.0023 29.6667Z"
      fill="#148EF8"
    />
    <path
      d="M20.0009 41.93C20.5177 35.5664 25.6825 32.3311 31.9778 32.3311C38.3616 32.3311 43.6065 35.3886 43.9972 41.9311C44.0128 42.1917 43.9972 42.9977 42.9956 42.9977C38.0548 42.9977 30.713 42.9977 20.97 42.9977C20.6356 42.9977 19.9727 42.2766 20.0009 41.93Z"
      fill="#148EF8"
    />
  </svg>
);
