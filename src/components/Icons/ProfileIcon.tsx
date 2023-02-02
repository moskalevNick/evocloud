import React from 'react';

type ProfileIconType = {
  width?: string;
  height?: string;
};

export const ProfileIcon: React.FC<ProfileIconType> = ({ height = '18', width = '18' }) => (
  <svg
    width={width}
    height={height}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      opacity="0.5"
      d="M9 8.25C7.34315 8.25 6 6.90685 6 5.25C6 3.59315 7.34315 2.25 9 2.25C10.6569 2.25 12 3.59315 12 5.25C12 6.90685 10.6569 8.25 9 8.25Z"
      fill="#14C1F8"
    />
    <path
      d="M2.25049 15.1496C2.54119 11.5701 5.44643 9.75024 8.98751 9.75024C12.5784 9.75024 15.5287 11.4701 15.7484 15.1502C15.7572 15.2968 15.7484 15.7502 15.185 15.7502C12.4058 15.7502 8.27604 15.7502 2.79563 15.7502C2.60753 15.7502 2.23465 15.3446 2.25049 15.1496Z"
      fill="#14C1F8"
    />
  </svg>
);
