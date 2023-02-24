import React from 'react';

type TemperatureIconType = {
  width?: string;
  height?: string;
};

export const TemperatureIcon: React.FC<TemperatureIconType> = ({ height = '28', width = '16' }) => (
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
      d="M8 27.3346C12.4183 27.3346 16 23.7529 16 19.3346C16 16.3735 14.3912 13.7881 12 12.4049V4.66797C12 2.45883 10.2091 0.667969 8 0.667969C5.79086 0.667969 4 2.45883 4 4.66797V12.4049C1.60879 13.7881 0 16.3735 0 19.3346C0 23.7529 3.58172 27.3346 8 27.3346ZM7.66602 3.33594C7.11373 3.33594 6.66602 3.78365 6.66602 4.33594V11.6693C6.66602 12.2216 7.11373 12.6693 7.66602 12.6693H8.33268C8.88497 12.6693 9.33268 12.2216 9.33268 11.6693V4.33594C9.33268 3.78365 8.88497 3.33594 8.33268 3.33594H7.66602Z"
      fill="#569EFF"
    />
  </svg>
);
